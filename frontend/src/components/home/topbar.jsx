import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  ChevronDown,
  Search,
  SearchCheck,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


import UserDropdown from "../dropdown";
import useCurrentUser from "@/hooks/auth/useCurrentuser";
import { useNavigate, Link } from "react-router";
import { useEffect } from "react";
import useSearch from "@/hooks/search/useSearch";

function Topbar() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState("");

  const [DropDown, setDropDown] = useState(false);
  const user = useCurrentUser();
  console.log(inputValue);
  const { data = [], isLoading, isError, error } = useSearch(inputValue)

  console.log(data);


  return (
    <div className="h-20 flex sticky top-1 z-20 justify-center bg-white items-center px-4">
      <div className="relative w-full z-50">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search"
          className="p-6 pl-12 rounded-2xl bg-amber-50 hover:bg-gray-200"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <X
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
          onClick={() => setInputValue("")}
        />
      </div>


      {inputValue && data?.success && (
        <>

          {data?.searchResults.length > 0 && (
            <div className="fixed inset-0 bg-black opacity-80 z-40"></div>
          )}


          <div className="flex flex-col gap-2 absolute w-[97%] max-h-[300px] overflow-y-auto rounded-2xl bg-white top-20 z-50 shadow-lg border">
            {isLoading && (
              <div className="text-center text-gray-500 p-4">Loading...</div>
            )}

            {isError && (
              <div className="text-center text-red-600 p-4">
                {error?.response?.data?.message || error?.message || "Something went wrong"}
              </div>
            )}

            {!isLoading && !isError && data.length === 0 && (
              <div className="text-center text-gray-600 p-4">No results found</div>
            )}

            {!isLoading && !isError && data.success == false && (
              <div className="text-center text-gray-600 p-4">No results found</div>
            )}

            {!isLoading && !isError && data.success == true && data.searchResults.map((post) => (
              <Link
                key={post.postId}
                to={`/pin/${post.postId}`}
                onClick={() => {
                  setInputValue("");
                  setDropDown(false);
                }}
                className="flex items-center gap-2 p-3 hover:bg-gray-100 transition-colors"
              >
                <Search size={18} className="text-gray-600" />
                <span className="text-base font-medium text-gray-800">{post.title}</span>
              </Link>
            ))}
          </div>
        </>
      )}


      {/* AUTH & USER DISPLAY */}
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
          <div className="relative z-6666">
            {DropDown && <UserDropdown setDropDown={setDropDown} user={user.data} />}
          </div>
        </>
      ) : (
        <>
          <Button
            className="bg-red-600 text-white rounded-3xl h-13 w-19 font-bold"
            onClick={() => navigate("/auth/login")}
          >
            Log in
          </Button>
          <Button
            className="bg-gray-300 text-black ml-3 rounded-3xl h-13 w-19 font-bold"
            onClick={() => navigate("/auth/register")}
          >
            Sign Up
          </Button>
        </>
      )}
    </div>

  )
}

export default Topbar;
