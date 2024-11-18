/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
interface Message {
  id: number;
  sender: string;
  avatarUrl: string;
  text: string;
  image?: string;
  timestamp: string;
  isOwn: boolean;
}

const initialMessages: Message[] = [
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
    id: 3,
    sender: "You",
    avatarUrl: "",
    text: "I'm good, thanks! How about you?",
    timestamp: "10:32 AM",
    isOwn: true,
  },
];

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSend = async () => {
    if (input.trim() === "" && !selectedImage) return;

    let imageUrl: string | undefined = undefined;

    if (selectedImage) {
      // Convert image to base64
      imageUrl = await convertToBase64(selectedImage);
      // Reset the selected image
      setSelectedImage(null);
    }

    const newMessage: Message = {
      id: messages.length + 1, // Ensure unique ID
      sender: "You",
      avatarUrl: "",
      text: input,
      image: imageUrl, // Include image URL if available
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  // Helper function to convert image file to base64 string
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("Failed to convert image.");
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Toggle the emoji picker modal
  const toggleEmojiModal = () => {
    setIsEmojiModalOpen(!isEmojiModalOpen);
  };

  const onEmojiClick = (emojiData: any, event: MouseEvent) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        alert("File size exceeds 5MB. Please choose a smaller image.");
        return;
      }

      setSelectedImage(file);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
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

      {/* Messages */}
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
                {msg.text && <p>{msg.text}</p>}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Sent Image"
                    className="mt-2 max-w-full h-auto rounded"
                  />
                )}
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

      {/* Input Area */}
      <div className="flex items-center p-4 bg-white shadow-inner relative">
        {/* Emoji Picker Button */}
        <button
          className="text-2xl text-gray-400 hover:text-purple-500 transition-colors"
          onClick={toggleEmojiModal}
          aria-label="Open emoji picker"
        >
          <BsEmojiSmile />
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageUpload"
          onChange={handleImageChange}
        />

        {/* Image Upload Button */}
        <label
          htmlFor="imageUpload"
          className="cursor-pointer text-2xl text-gray-400 hover:text-purple-500 transition-colors ml-2"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              document.getElementById("imageUpload")?.click();
            }
          }}
          aria-label="Upload image"
        >
          <AddPhotoAlternateIcon />
        </label>

        {/* Message Input */}
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

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          aria-label="Send message"
        >
          <FaPaperPlane />
        </button>

        {/* Emoji Picker Modal */}
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

        {/* Image Preview */}
        {selectedImage && (
          <div className="absolute bottom-20 left-4 bg-white p-2 rounded shadow-md flex items-center">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-16 h-16 object-cover rounded"
            />
            <button
              className="ml-2 text-red-500"
              onClick={() => setSelectedImage(null)}
              aria-label="Remove selected image"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
