import React from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";

const Navbar = () => {
  const { sidebarOpen, setSidebarOpen, sidebarTrigger } = useStateContext();

  return (
    <div className="flex p-4 justify-between lg:justify-end items-center">
      {/* Hamburger button */}
      <button
        className="lg:hidden"
        ref={sidebarTrigger}
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
        }}
      >
        <BsFillMenuButtonWideFill className="text-emerald-500 text-xl" />
      </button>
    </div>
  );
};

export default Navbar;
