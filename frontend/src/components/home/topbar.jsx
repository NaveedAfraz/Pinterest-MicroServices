import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


import UserDropdown from "../dropdown";
import useCurrentUser from "@/hooks/user-defined/useCurrentuser";
import { useNavigate } from "react-router";
function Topbar() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState("");

  const [DropDown, setDropDown] = useState(false);
  const user = useCurrentUser();
  console.log(user.data)



  return (
    <div className=" h-20 flex sticky top-0 z-50 justify-center bg-white items-center px-4">
      <div className="relative w-full">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search"
          className="p-6 pl-12 rounded-2xl hover:bg-gray-200"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <X
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={() => setInputValue("")}
        />
      </div>
      {user?.data ? (
        <>
          <Badge className="rounded-2xl h-9 w-9 ml-3 text-xl bg-blue-500">
            {user.data.username.slice(0, 1).toUpperCase()}
          </Badge>
          <ChevronDown
            size={16}
            className="text-gray-700 ml-3 cursor-pointer"
            onClick={() => setDropDown(true)}
          />
          <div className="relative z-200">{DropDown && <UserDropdown setDropDown={setDropDown} user={user.data} />}</div>
        </>
      ) : (
        <>
          <Button className="bg-red-600 text-white rounded-3xl h-13 w-19 font-bold" onClick={() => navigate("/auth/login")}>
            Log in
          </Button>
          <Button className="bg-gray-300 text-black ml-3 rounded-3xl h-13 w-19 font-bold" onClick={() => navigate("/auth/register")}>
            Sign Up
          </Button>
        </>
      )
      }
    </div >
  )
}

export default Topbar;
