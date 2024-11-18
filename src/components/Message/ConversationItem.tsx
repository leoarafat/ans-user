import { FaUserCircle } from "react-icons/fa";

const ConversationItem = ({ conversation, onClick, isActive }: any) => {
  return (
    <button
      onClick={() => onClick(conversation.id)}
      className={`w-full flex items-center p-4 hover:bg-purple-100 transition-colors ${
        isActive ? "bg-purple-200" : ""
      }`}
    >
      <div className="flex-shrink-0">
        {conversation.avatarUrl ? (
          <img
            src={conversation.avatarUrl}
            alt={conversation.name}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <FaUserCircle className="w-12 h-12 text-purple-500" />
        )}
      </div>
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-medium text-gray-800">
            {conversation.name}
          </h3>
          <span className="text-xs text-gray-500">
            {conversation.timestamp}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate">
          {conversation.lastMessage}
        </p>
      </div>
    </button>
  );
};

export default ConversationItem;
