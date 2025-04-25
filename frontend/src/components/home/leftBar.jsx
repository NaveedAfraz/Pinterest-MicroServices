import { HomeIcon } from "lucide-react";
import React from "react";

function LeftBar() {
  const sidebarIcons = [
    { name: "Home", icon: "fa-solid fa-house" },
    { name: "Explore", icon: "fa-solid fa-compass" },
    { name: "Create", icon: "fa-solid fa-square-plus" },
    { name: "Notifications", icon: "fa-regular fa-bell" },
    { name: "Messages", icon: "fa-regular fa-comment-dots" },
  ];

  return (
    <div className="w-20 h-[100vh] border border-r-1 border-gray-400 ">
      <div className="w-full h-20 flex items-center justify-center">
        <i className="fa-brands fa-pinterest text-3xl text-red-600"></i>
      </div>
      <div className="w-full flex items-center flex-col h-full relative">
        {sidebarIcons.map((icon) => (
          <>
            <div
              key={icon.id}
              className="w-[70%] rounded-lg h-14 mt-4 hover:bg-blue-100 flex cursor-pointer items-center justify-center"
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
  );
}

export default LeftBar;
