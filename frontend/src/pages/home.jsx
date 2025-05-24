import React, { useEffect, useState } from "react";
import Topbar from "../components/home/topbar";
import LeftBar from "../components/home/leftBar";
import MainPage from "../components/home/Gallery";
import { Outlet, useLocation } from "react-router";
function Home() {
  const location = useLocation();
  console.log(location.pathname.split("/"));
  // const [showSideBar, setshowSidebar] = useState(true)
  // useEffect(() => {
  //   if (location.pathname.split('/').includes("auth")) {
  //     setshowSidebar(false)
  //   }
  // }, [])
  return (
    <div className="flex w-full">
      <div className="overflow-hidden ">
        <LeftBar />
      </div>
      <div className="w-full h-[100vh] overflow-y-scroll">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;