import { useState } from "react";
import {
  X,
  MessageSquarePlus,
  Users,
  MoreHorizontal,
  ArrowLeft,
  Search,
  ChevronUp,
} from "lucide-react";
import { Button } from "../ui/button";
import Messages from "./Messages";
export default function MessagesSideBar({ setMessagesOpen }) {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const demoUser = {
    id: 1,
    name: "Nnnn",
    profilePic: "/api/placeholder/40/40",
  };

  if (activeChat) {
    return <Messages setActiveChat={setActiveChat} activeChatUser={demoUser} />;
  }

  return (
    <div className="flex flex-col    max-w-xs border-r w-full z-50 border-gray-200">
      {!searchOpen ? (
        <div className="w-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setMessagesOpen(false)}
            >
              <X className="w-5 h-5 mr-2" />
              <span className="font-medium">Messages</span>
            </div>
            <div className="flex items-center">
              <button className="p-1">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <button
              className="flex items-center mb-4 cursor-pointer"
              onClick={() => setSearchOpen(true)}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full text-white cursor-pointer">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <span className="ml-3 font-medium">New message</span>
            </button>

            <button
              className="flex items-center w-full hover:bg-gray-50 p-2 rounded-lg"
              onClick={() => setActiveChat(demoUser.id)}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full overflow-hidden">
                <img
                  src="/api/placeholder/40/40"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3 text-left">
                <div className="font-medium">{demoUser.name}</div>
                <div className="text-sm text-gray-500">Click to open chat</div>
              </div>
            </button>

            <button className="flex items-center mt-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                <Users className="w-5 h-5" />
              </div>
              <div className="ml-3">
                <div className="font-medium">Invite your friends</div>
                <div className="text-sm text-gray-500">
                  Connect to start chatting
                </div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <button
                className="mr-3 cursor-pointer"
                onClick={() => setSearchOpen(false)}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="font-medium">New message</span>
            </div>
            <Button
              variant="ghost"
              className="bg-gray-100 rounded-full px-4 py-1 text-sm"
            >
              Next
            </Button>
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-between">
            <div className="p-4">
              <button
                className="flex items-center w-full hover:bg-gray-50 p-2 rounded-lg"
                onClick={() => {
                  setActiveChat(demoUser.id);
                  setSearchOpen(false);
                }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full overflow-hidden">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3 text-left">
                  <div className="font-medium">{demoUser.name}</div>
                  <div className="text-sm text-gray-500">
                    Click to open chat
                  </div>
                </div>
              </button>
            </div>
            <div className="flex justify-center p-2 border-t border-gray-200">
              <ChevronUp className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
