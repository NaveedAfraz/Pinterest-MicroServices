import React from "react";
import Topbar from "../components/home/topbar";
import LeftBar from "../components/home/leftBar";
import MainPage from "../components/home/Gallery";
import { Outlet } from "react-router";
function Home() {
  return (
    <div className="flex">
      <div className="overflow-hidden">
        <LeftBar />
      </div>
      <div className="w-[100vw]">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
