import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserList from "../page-sections/UserList";
import ChatWindow from "../page-sections/ChatWindow";
import { fetchChats, sendMessage } from "../redux/reducers/chatSlice";
import { useAppDispatch } from "../redux/hooks";
import { fetchUser } from "../redux/reducers/authSlice";
import Header from "../components/common/header/Header";
import Navbar from "../components/common/header/Navbar";
import { socket } from "../config/socket";

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [newChatUser, setNewChatUser] = useState<any>(null);
  const [messages, setMessages] = useState<{ [key: number]: any[] }>({});
  const [publicMessages, setPublicMessages] = useState<any[]>([]);
  const [isPublicChat, setIsPublicChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const profile = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const loggedInUser = profile?.id;
  const [refetch, setRefetch] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const processedMessageIds = useRef<Set<number>>(new Set());
  const publicMessageIds = useRef<Set<number>>(new Set());

  const handleRefect = () => {
    setRefetch(true);
  };

  const handlePastMessages = (pastMessages: any[]) => {
    setPublicMessages(
      pastMessages.map((msg) => ({
        isOwner: msg.sender === profile?.name,
        message: msg.message,
        sender: msg.sender,
        createdAt: msg.createdAt,
      })),
    );
  };

  useEffect(() => {
    dispatch(fetchUser());
    socket.on("past messages", handlePastMessages);
  }, [dispatch]);

  useEffect(() => {
    const savedUser = localStorage.getItem("selectedUser");
    if (savedUser) {
      setSelectedChat(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    socket.on("past messages", handlePastMessages);
  }, [isPublicChat]);

  useEffect(() => {
    const handleChatMessage = (msg: any) => {
      if (!publicMessageIds.current.has(msg.id)) {
        setPublicMessages((prevMessages) => [...prevMessages, msg]);
        publicMessageIds.current.add(msg.id);
      }
    };
    socket.on("chat message", handleChatMessage);
    socket.on("past messages", handlePastMessages);

    return () => {
      socket.off("chat message", handleChatMessage);
      socket.off("past messages", handlePastMessages);
    };
  }, [publicMessageIds, selectedChat]);

  useEffect(() => {
    const handleConnect = () => {
      socket.emit("private chats");
    };
    socket.on("connect", handleConnect);
  }, [selectedChat]);

  useEffect(() => {
    const handlePrivateMessage = (message: any) => {
      if (!processedMessageIds.current.has(message.id)) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [message.privateChatId]: [
            ...(prevMessages[message.privateChatId] || []),
            message,
          ],
        }));
        processedMessageIds.current.add(message.id);
      }
    };

    socket.on("private message recieved", handlePrivateMessage);

    return () => {
      socket.off("private message recieved", handlePrivateMessage);
    };
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat && selectedChat.id) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat.id]: selectedChat?.messages,
      }));
    }
  }, [selectedChat]);

  const joinRoom = (chatId: number) => {
    socket.emit("join private room", JSON.stringify(chatId));
  };

  const handleUserSelect = (chatOrUser, otherUser) => {
    if (otherUser && chatOrUser?.messages) {
      setSelectedChat(chatOrUser);
      joinRoom(chatOrUser.id);
      setOtherUser(otherUser);
      setNewChatUser(null);
      setIsPublicChat(false);
      localStorage.setItem("selectedUser", JSON.stringify(chatOrUser));
    } else {
      setNewChatUser(chatOrUser);
      setOtherUser(chatOrUser);
      localStorage.setItem("selectedUser", JSON.stringify(chatOrUser));
      setSelectedChat(null);
      setIsPublicChat(false);
    }
  };

  useEffect(
    () => () => {
      localStorage.removeItem("selectedUser");
    },
    [],
  );

  const handlePublicChatSelect = () => {
    setSelectedChat(null);
    setNewChatUser(null);
    setIsPublicChat(true);
  };

  const handleSendMessage = async (text: string) => {
    if (selectedChat !== null) {
      const newMessage = {
        id: Date.now(),
        message: text,
        createdAt: new Date().toISOString(),
        isSender: true,
        userId: loggedInUser,
        chatId: selectedChat.id,
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat.id]: [
          ...(prevMessages[selectedChat.id] || []),
          newMessage,
        ],
      }));

      try {
        socket.emit("private chat message", {
          sender: profile?.username,
          userId: profile?.id,
          receiverId:
            selectedChat.receiverId === profile?.id
              ? selectedChat.userId
              : selectedChat.receiverId,
          message: text,
        });
        // const response = await dispatch(
        //   sendMessage({ message: text, id: selectedChat.receiverId }),
        // ).unwrap();
        // processedMessageIds.current.add(response.id);
        dispatch(fetchChats());
      } catch (error) {
        console.error("Message failed to send:", error);
      }
    } else if (newChatUser !== null) {
      const newMessage = {
        id: Date.now(),
        userId: profile?.id,
        sender: profile?.username,
        message: text,
        createdAt: new Date().toISOString(),
        isSender: true,
        chatId: `new-${newChatUser.id}`,
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [`new-${newChatUser.id}`]: [
          ...(prevMessages[`new-${newChatUser.id}`] || []),
          newMessage,
        ],
      }));

      try {
        socket.emit("private chat message", {
          sender: profile?.username,
          userId: profile?.id,
          receiverId: newChatUser.id,
          message: text,
        });
        await dispatch(
          sendMessage({ message: text, id: newChatUser.id }),
        ).unwrap();
        dispatch(fetchChats());
      } catch (error) {
        console.error("Message failed to send:", error);
      }
    } else if (isPublicChat) {
      const message = text;
      socket.emit("chat message", {
        sender: profile?.name,
        userId: profile?.id,
        isOwner: true,
        message,
      });
    }
  };

  const token = localStorage.getItem("accessToken");

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded text-center">
          <h2 className="text-2xl font-semibold mb-4">You are not logged in</h2>
          <p className="text-gray-700 mb-4">Please log in to use the chat.</p>
          <div className="flex items-center gap-4 flex-col md:flex-row">
            <Link to="/" className="text-blue-500 hover:underline">
              Back to Home
            </Link>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login to continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F8FA] h-screen">
      <div className="soleil">
        <div className="lg:mx-auto w-full">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setRefetch={setRefetch}
          />
        </div>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="flex flex-col h-[80vh] w-[90%] mx-auto">
        <div className="flex flex-1 gap-4 py-2 overflow-hidden">
          <div
            className={`w-full md:w-1/3 ${selectedChat !== null || newChatUser !== null || isPublicChat ? "hidden md:block" : ""}`}
          >
            <UserList
              onUserSelect={handleUserSelect}
              onPublicChatSelect={handlePublicChatSelect}
              messages={messages}
            />
          </div>
          <div
            className={`w-full md:w-4/5 ${selectedChat === null && newChatUser === null && !isPublicChat ? "hidden md:block" : ""}`}
          >
            {selectedChat === null && newChatUser === null && !isPublicChat ? (
              <div className="flex items-center justify-center bg-white rounded-[16px] h-full text-gray-500">
                Select a user or join the public chat to start a conversation
              </div>
            ) : (
              <ChatWindow
                loggedInUserId={loggedInUser}
                messages={
                  isPublicChat
                    ? publicMessages || []
                    : selectedChat
                      ? messages[selectedChat.id] || []
                      : messages[`new-${newChatUser.id}`] || []
                }
                chat={selectedChat || { messages: [], user: newChatUser }}
                onSendMessage={handleSendMessage}
                onBack={() => {
                  setSelectedChat(null);
                  setNewChatUser(null);
                  setIsPublicChat(false);
                  localStorage.removeItem("selectedUser");
                }}
                otherUser={otherUser}
                isPublicChat={isPublicChat}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
