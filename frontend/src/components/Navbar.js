import React from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { Avatar } from "./";

const Navbar = () => {
  const { sidebarOpen, setSidebarOpen, sidebarTrigger } = useStateContext();

  return (
    <div className="flex justify-between lg:justify-end items-center">
      {/* Hamburger button */}
      <button
        className="lg:hidden"
        ref={sidebarTrigger}
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
          console.log(sidebarOpen)
        }}
      >
        <BsFillMenuButtonWideFill className="text-emerald-700 text-xl" />
      </button>
      <div className="flex items-center">
        <Avatar isRound />
        <p className="text-sm">
          Hi, <span className="font-bold">The-Khang Nguyen</span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
