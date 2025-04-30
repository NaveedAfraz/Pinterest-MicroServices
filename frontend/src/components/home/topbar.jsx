import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  ArrowBigDown,
  Braces,
  Brackets,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserDropdown from "../dropdown";
function Topbar() {
  const [inputValue, setInputValue] = useState("");
  const [user, setuser] = useState(true);
  const [DropDown, setDropDown] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
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
      {user ? (
        <>
          <Badge className="rounded-2xl h-9 w-9 ml-3 text-xl bg-blue-500">
            N
          </Badge>
          <ChevronDown
            size={16}
            className="text-gray-700 ml-3 cursor-pointer"
            onClick={() => setDropDown(true)}
          />
          <div className="relative z-200">{DropDown && <UserDropdown setDropDown={setDropDown} />}</div>
        </>
      ) : (
        <>
          <Button className="bg-red-600 text-white rounded-3xl h-13 w-19 font-bold">
            Log in
          </Button>
          <Button className="bg-gray-300 text-black ml-3 rounded-3xl h-13 w-19 font-bold">
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
}

export default Topbar;
