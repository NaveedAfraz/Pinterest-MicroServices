import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";
import { SquareDashedBottomCode, X } from "lucide-react";
import MessagingSideBar from "../messages/messagesSidebar";
function LeftBar() {
  const sidebarIcons = [
    { name: "", icon: "fa-solid fa-house" },
    { name: "Explore", icon: "fa-solid fa-compass" },
    { name: "Create", icon: "fa-solid fa-square-plus" },
    { name: "Notifications", icon: "fa-regular fa-bell" },
    { name: "Messages", icon: "fa-regular fa-comment-dots" },
  ];
  const [messagesOpen, setMessagesOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="w-20 border  border-r-1 h-[100%] border-gray-400 ">
        <div className="w-full h-20 flex items-center justify-center">
          <i className="fa-brands fa-pinterest text-3xl text-red-600"></i>
        </div>
        <div className="w-full flex items-center flex-col h-full relative">
          {sidebarIcons.map((icon) => (
            <>
              <div
                key={icon.name}
                className="w-[70%] rounded-lg h-14 mt-4 hover:bg-blue-100 flex cursor-pointer items-center justify-center"
                onClick={() => {
                  if (icon.name === "Messages") {
                    setMessagesOpen((prev) => !prev);
                  } else {
                    navigate(icon.name);
                  }
                }}
              >
                <i className={icon.icon + " text-xl"}></i>
              </div>
            </>
          ))}

          <div className="flex items-center justify-center w-full cursor-pointer h-10 absolute bottom-25">
            <i className="fa-solid fa-gear text-2xl" />
          </div>
        </div>
      </div>
      {messagesOpen && (
        <div className="ml-20 absolute top-0 bg-amber-50 z-40 ">
          <MessagingSideBar setMessagesOpen={setMessagesOpen} />
        </div>
      )}
    </>
  );
}

export default LeftBar;
