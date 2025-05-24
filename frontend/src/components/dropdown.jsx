import React, { useEffect, useRef } from "react";
import { ChevronDown, User } from "lucide-react";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/auth/useAuth";

const UserDropdown = ({ setDropDown, user }) => {
  const refVal = useRef();
  const navigate = useNavigate()
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (refVal.current && !refVal.current.contains(e.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
  }, []);
  const { logout } = useAuth()
  const handleLogout = () => {
    logout.mutate()
    
    setTimeout(() => {
      navigate("/auth/login");
    }, 2000);
    setDropDown(false);
  };

  return (
    <div
      className="absolute bg-white z-auto top-13 right-5 rounded-lg"
      ref={refVal}
    >
      <div className="p-4 border rounded-md shadow-sm">
        <div className="text-sm text-gray-600 mb-2">Currently in</div>

        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
          <div className="bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-semibold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="font-semibold">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</div>
            <div className="text-sm text-gray-500">Personal</div>
            <div className="text-sm text-gray-500">
              {user.email}
            </div>
          </div>
          <div className="flex justify-end">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <button className="w-full text-left py-2 hover:bg-gray-100 transition-colors">
            Convert to business
          </button>

          <div className="border-t pt-4">
            <div className="font-medium mb-3">Your accounts</div>
            <button className="w-full text-left py-2 hover:bg-gray-100 transition-colors">
              Add Pinterest account
            </button>
          </div>

          <div className="border-t pt-4">
            <button className="w-full text-left py-2 hover:bg-gray-100 transition-colors" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
