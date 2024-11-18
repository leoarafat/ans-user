import { useState } from "react";
import { IoMdChatbubbles } from "react-icons/io";
import ConversationItem from "./ConversationItem";

const conversations = [
  {
    id: 1,
    name: "John Doe",
    avatarUrl: "",
    lastMessage: "Hey, how are you?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatarUrl: "",
    lastMessage: "Let's catch up tomorrow.",
    timestamp: "Yesterday",
  },
  {
    id: 3,
    name: "Jane Smith",
    avatarUrl: "",
    lastMessage: "Let's catch up tomorrow.",
    timestamp: "Yesterday",
  },
  {
    id: 4,
    name: "Jane Smith",
    avatarUrl: "",
    lastMessage: "Let's catch up tomorrow.",
    timestamp: "Yesterday",
  },
  {
    id: 5,
    name: "Jane Smith",
    avatarUrl: "",
    lastMessage: "Let's catch up tomorrow.",
    timestamp: "Yesterday",
  },
  {
    id: 6,
    name: "Jane Smith",
    avatarUrl: "",
    lastMessage: "Let's catch up tomorrow.",
    timestamp: "Yesterday",
  },
  {
    id: 7,
    name: "Jane Smith",
    avatarUrl: "",
    lastMessage: "Let's catch up tomorrow.",
    timestamp: "Yesterday",
  },
  {
    id: 8,
    name: "Jane Smith",
    avatarUrl: "",
    lastMessage: "Let's catch up tomorrow.",
    timestamp: "Yesterday",
  },
  {
    id: 9,
    name: "Jane Smith",
    avatarUrl: "",
    lastMessage: "Let's catch up tomorrow.",
    timestamp: "Yesterday",
  },
];

const ConversationList = () => {
  const [activeId, setActiveId] = useState(null);

  const handleConversationClick = (id: any) => {
    setActiveId(id);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <IoMdChatbubbles className="text-2xl mr-2" />
        <h2 className="text-lg font-semibold">Chats</h2>
      </div>

      {/* Conversation Items */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onClick={handleConversationClick}
            isActive={conversation.id === activeId}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
