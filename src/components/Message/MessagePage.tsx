import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

const MessagePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 bg-white shadow-lg">
          <ConversationList />
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
          onClick={handleDrawerToggle}
        >
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <ConversationList />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
          <button
            onClick={handleDrawerToggle}
            className="text-2xl text-purple-600"
          >
            <IoMdMenu />
          </button>
          <h1 className="text-xl font-semibold text-purple-600">Chats</h1>
          <div></div> {/* Placeholder for alignment */}
        </div>

        {/* Chat Window */}
        <ChatWindow />
      </div>
    </div>
  );
};

export default MessagePage;
