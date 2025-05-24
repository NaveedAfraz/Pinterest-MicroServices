import { useState } from "react";
import {
  X,
  MessageSquarePlus,
  Users,
  MoreHorizontal,
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  ArrowUp,
} from "lucide-react";
import { Button } from "../ui/button";

function Messages({ setActiveChat, activeChatUser }) {
  const [message, setMessage] = useState("");
  return (
    <div className="flex flex-col h-screen max-w-xs border-r w-full z-50  border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <button
            className="mr-3 cursor-pointer"
            onClick={() => setActiveChat(null)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <img
                src="/api/placeholder/40/40"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium">{activeChatUser.name}</span>
          </div>
        </div>
        <button className="p-1">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-grow flex flex-col justify-end p-4 overflow-y-auto">
        <div className="mt-auto">
          <div className="flex items-end mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
              <img
                src="/api/placeholder/40/40"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center ml-2">
              <div className="p-2 text-xs text-gray-500">...</div>
            </div>
          </div>

          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-2">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                N
              </div>
              <div className="absolute top-0 right-0 bg-yellow-200 p-1 rounded-full">
                👋
              </div>
            </div>

            <h3 className="font-medium text-center">{activeChatUser.name}</h3>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              This could be the beginning of something good
            </p>
          </div>
        </div>
      </div>

      <div className="p-2 border-t border-gray-200">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <button className="p-1 mr-2">
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow bg-transparent outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="p-1 ml-2">
            <ArrowUp className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
