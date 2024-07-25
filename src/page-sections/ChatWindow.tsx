import React, { useEffect, useRef } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import moment from "moment";
import { HiMiniUserGroup } from "react-icons/hi2";

const ChatWindow = ({
  messages,
  chat,
  otherUser,
  onSendMessage,
  onBack,
  loggedInUserId,
  isPublicChat,
}) => {
  const [newMessage, setNewMessage] = React.useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div
      className="w-full py-4 px-2 bg-white flex rounded-[16px] flex-col h-full"
      data-testid="chat-window"
    >
      <div className="border-b pb-2 mb-4 flex items-center">
        <button
          data-testid="back-button"
          className="md:hidden text-primary"
          onClick={onBack}
        >
          <BsArrowLeftShort className="text-4xl" />
        </button>
        <div className="flex">
          {isPublicChat ? (
            <div className="flex">
              <div className="flex items-center justify-center border-2 border-dark-gray rounded-full h-12 w-12">
                <HiMiniUserGroup className="text-3xl text-dark-gray" />
              </div>
              <div>
                <h2 className="text-lg font-semibold ml-4">Public Chat</h2>
                <p className="text-sm text-gray-500 ml-4">
                  public discussions...
                </p>
              </div>
            </div>
          ) : (
            <>
              {otherUser?.profile?.profileImage ? (
                <img
                  src={otherUser?.profile?.profileImage}
                  alt=""
                  className="h-12 w-12 object-cover rounded-full"
                />
              ) : (
                <FaUserCircle className="text-5xl text-dark-gray" />
              )}
              <div>
                <h2 className="text-lg font-semibold ml-4">
                  {otherUser?.username || chat?.messages[0]?.sender}
                </h2>
                <p className="text-sm text-gray-500 ml-4">{otherUser?.email}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll mt-4 w-full">
        {sortedMessages?.map((message, index) => (
          <div
            key={index}
            className={`mb-2 max-w-[100%] ${message.userId === loggedInUserId || message.isOwner ? "flex justify-end pr-2" : "flex justify-start pl-2"}`}
          >
            <div
              className={`flex max-w-[80%] ${message.userId === loggedInUserId || message.isOwner ? "flex-col items-end" : "flex-col items-start"} gap-2`}
            >
              <div
                className={`inline-block p-2  rounded-[12px] ${message.userId === loggedInUserId || message.isOwner ? "bg-red-500 text-white " : "bg-gray-100"}`}
              >
                {isPublicChat && (
                  <span className="font-bold">{message.sender}</span>
                )}
                <p>{message.message}</p>
              </div>
              <p className="text-xs text-gray-500">
                {moment(message.createdAt).fromNow()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="px-2 flex items-center gap-2">
        <textarea
          className="w-full focus:outline-none resize-none text-gray-500 p-2 border rounded"
          value={newMessage}
          placeholder="Start typing..."
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          data-testid="send-message-btn"
          className="bg-red-500 text-white py-4 px-4 rounded"
          onClick={handleSendMessage}
        >
          <IoSendSharp />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
