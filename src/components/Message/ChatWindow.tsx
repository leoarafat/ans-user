/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

const initialMessages = [
  {
    id: 1,
    sender: "John Doe",
    avatarUrl: "",
    text: "Hello! How are you?",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    avatarUrl: "",
    text: "I'm good, thanks! How about you?",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: 3, // Changed from id:2 to id:3 to ensure uniqueness
    sender: "You",
    avatarUrl: "",
    text: "I'm good, thanks! How about you?",
    timestamp: "10:32 AM",
    isOwn: true,
  },
];

const ChatWindow = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: messages.length + 1, // Ensure unique ID
      sender: "You",
      avatarUrl: "",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  // Toggle the emoji picker modal
  const toggleEmojiModal = () => {
    setIsEmojiModalOpen(!isEmojiModalOpen);
  };

  const onEmojiClick = (emojiObject: any) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape" && isEmojiModalOpen) {
        setIsEmojiModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEmojiModalOpen]);

  useEffect(() => {
    if (isEmojiModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isEmojiModalOpen]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md">
        <div className="flex items-center">
          <div className="relative">
            <FaUserCircle className="w-12 h-12 text-yellow-300" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
          </div>

          <div className="ml-4">
            <h2 className="text-lg font-semibold">John Doe</h2>
            <span className="text-sm">Online</span>
          </div>
        </div>

        <button
          className="text-xl hover:text-gray-200 transition-colors"
          aria-label="More options"
        >
          <FaEllipsisV />
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-purple-50 to-blue-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-6 ${
              msg.isOwn ? "justify-end" : "justify-start"
            }`}
          >
            {!msg.isOwn && (
              <div className="mr-3">
                {msg.avatarUrl ? (
                  <img
                    src={msg.avatarUrl}
                    alt={msg.sender}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-purple-500" />
                )}
              </div>
            )}

            <div className="max-w-xs">
              <div
                className={`px-4 py-2 rounded-lg shadow ${
                  msg.isOwn
                    ? "bg-purple-600 text-white rounded-tr-lg"
                    : "bg-white text-gray-800 rounded-tl-lg"
                } transition-transform transform hover:scale-105`}
              >
                {msg.text}
              </div>
              <span className="block text-xs text-gray-500 mt-1">
                {msg.timestamp}
              </span>
            </div>

            {msg.isOwn && (
              <div className="ml-3">
                {msg.avatarUrl ? (
                  <img
                    src={msg.avatarUrl}
                    alt={msg.sender}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-purple-500" />
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-4 bg-white shadow-inner relative">
        <button
          className="text-2xl text-gray-400 hover:text-purple-500 transition-colors"
          onClick={toggleEmojiModal}
          aria-label="Open emoji picker"
        >
          <BsEmojiSmile />
        </button>

        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 mx-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          aria-label="Send message"
        >
          <FaPaperPlane />
        </button>

        {isEmojiModalOpen && (
          <div className="fixed inset-0 flex items-end justify-center z-50 sm:items-center sm:justify-center">
            <div
              className="fixed inset-0 bg-black opacity-30"
              onClick={toggleEmojiModal}
            ></div>

            <div className="bg-white rounded-lg shadow-lg p-2 sm:w-96 w-full mx-4">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
