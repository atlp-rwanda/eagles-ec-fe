import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RxMixerHorizontal } from "react-icons/rx";
import { useSelector } from "react-redux";
import { HiMiniUserGroup } from "react-icons/hi2";

import { useAppDispatch } from "../redux/hooks";
import Spinner from "../components/dashboard/Spinner";
import { fetchChats, fetchUsers } from "../redux/reducers/chatSlice";
import { socket } from "../config/socket";

interface UserListProps {
  onUserSelect: (chat: any | null, user: any) => void;
  onPublicChatSelect: () => void;
  messages: any;
}

const UserList: React.FC<UserListProps> = ({
  onUserSelect,
  onPublicChatSelect,
  messages,
}) => {
  const dispatch = useAppDispatch();
  const chats = useSelector((state: any) => state.chats.chats.data);
  const loadingChats = useSelector((state: any) => state.chats.chats.loading);
  const loadingUsers = useSelector((state: any) => state.chats.users.loading);
  const users = useSelector((state: any) => state.chats.users.data);
  const chatsError = useSelector((state: any) => state.chats.chats.error);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredChats, setFilteredChats] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const profile = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const loggedInUserId = profile?.id;
  const [sortedChats, setSortedChats] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchChats());
    dispatch(fetchUsers());

    const handlePrivateMessage = () => {
      dispatch(fetchChats());
      dispatch(fetchUsers());
    };

    socket.on("private message recieved", handlePrivateMessage);

    return () => {
      socket.off("private message recieved", handlePrivateMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    setFilteredChats(
      chats.filter(
        (chat) =>
          chat.messages.length > 0
          && chat.messages[0].sender
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
          && chat.userId !== chat.receiverId,
      ),
    );

    const chatUserIds = new Set(
      chats.flatMap((chat) => [chat.sender?.id, chat.receiver?.id]),
    );

    const filtered = users.filter(
      (user) =>
        !chatUserIds.has(user.id)
        && (user.username?.toLowerCase().includes(searchTerm.toLowerCase())
          || user.email?.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    if (searchTerm === "") {
      setFilteredUsers(filtered.slice(0, 10));
    } else {
      setFilteredUsers(filtered);
    }
  }, [searchTerm, chats, users, loggedInUserId]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRetry = () => {
    dispatch(fetchChats());
    dispatch(fetchUsers());
  };

  const getOtherUser = (chat): any | undefined =>
    (chat.sender?.id === loggedInUserId ? chat.receiver : chat.sender);

  useEffect(() => {
    const sorted = [...filteredChats].sort((a, b) => {
      const aLastMessageTime = a.messages.length
        ? new Date(a.messages[a.messages.length - 1].createdAt).getTime()
        : 0;
      const bLastMessageTime = b.messages.length
        ? new Date(b.messages[b.messages.length - 1].createdAt).getTime()
        : 0;
      return bLastMessageTime - aLastMessageTime;
    });
    setSortedChats(sorted);
  }, [filteredChats]);

  const handleUserSelect = (chat: any | null, user: any) => {
    setSelectedChatId(chat?.id || null);
    onUserSelect(chat, user);
  };

  const handlePublicChatSelect = () => {
    setSelectedChatId("public");
    onPublicChatSelect();
  };

  return (
    <div className="w-full px-2 gap-3 rounded-[16px] bg-white flex flex-col py-6 h-full">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="text-dark-gray" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="px-10 py-2 rounded-md border-[1px] text-gray-500 w-full outline-none bg-bg-gray bg-transparent border-dark-gray focus:outline-none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500">
          <RxMixerHorizontal />
        </span>
      </div>
      {loadingChats || loadingUsers ? (
        <div className="flex justify-center flex-col gap-3 items-center h-full">
          <p>Loading chats...</p>
          <Spinner />
        </div>
      ) : chatsError ? (
        <div className="flex justify-center flex-col gap-3 items-center h-full">
          <p className="text-red-500 text-center">
            An error occurred while getting chats
          </p>
          <button
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            onClick={handleRetry}
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="flex flex-col overflow-y-auto">
          <div className="rounded-[8px] py-2">
            <h2 className="text-md pl-4 font-semibold">Groups</h2>
            <div
              className={`mb p-4 flex gap-2 py-3 relative px-2 rounded-lg cursor-pointer ${
                selectedChatId === "public"
                  ? "bg-slate-100"
                  : "hover:bg-slate-100 bg-white"
              }`}
              onClick={handlePublicChatSelect}
            >
              <div className="flex relative">
                <div className="flex items-center justify-center border-2 border-dark-gray rounded-full h-12 w-12">
                  <HiMiniUserGroup className="text-3xl text-dark-gray" />
                </div>
                <p className="bg-green absolute right-0 bottom-0 rounded-full h-3 w-3" />
              </div>
              <div>
                <p>Public Chat</p>
                <p className="text-gray-400">public discussion...</p>
              </div>
            </div>
          </div>
          <div className="rounded-[8px] py-2">
            <h2 className="text-md pl-4 pt-2 font-semibold mb-2">
              Recent Chats
            </h2>
            {sortedChats.map((chat) => {
              const otherUser = getOtherUser(chat);
              return (
                <div
                  key={chat.id}
                  className={`mb p-4 flex gap-2 py-3 relative px-2 rounded-lg cursor-pointer ${selectedChatId === chat.id ? "bg-slate-100" : ""}`}
                  onClick={() => handleUserSelect(chat, otherUser)}
                >
                  <div className="flex relative">
                    {otherUser?.profile?.profileImage ? (
                      <img
                        src={otherUser.profile.profileImage}
                        alt=""
                        className="h-12 w-12 object-cover rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="text-5xl text-dark-gray" />
                    )}
                    <p className="bg-green absolute right-0 bottom-0 rounded-full h-3 w-3" />
                  </div>
                  <div>
                    <p>{otherUser?.name}</p>
                    <p className="text-gray-400">
                      {chat.messages.length > 0
                        ? chat.messages[
                          chat.messages.length - 1
                        ].message.substring(0, 15)
                        : "No messages yet"}
                      ...
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h2 className="text-md pl-4 pt-2 font-semibold mb-2">
              Start New Chat
            </h2>
            {filteredUsers.map((user) => (
              <div
                className="mb p-4 flex gap-2 py-3 rounded-lg relative px-2 hover:bg-slate-100 bg-white cursor-pointer"
                key={user.id}
                onClick={() => onUserSelect(user, null)}
              >
                <div className="flex relative">
                  {user.profile?.profileImage ? (
                    <img
                      src={user.profile.profileImage}
                      alt=""
                      className="h-12 w-12 object-cover rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="text-5xl text-dark-gray" />
                  )}
                  <p className="bg-green absolute right-0 bottom-0 rounded-full h-3 w-3" />
                </div>
                <div>
                  <p>{user.username}</p>
                  <p className="text-gray-400">
                    {`${user.email.slice(0, 16)}...`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
