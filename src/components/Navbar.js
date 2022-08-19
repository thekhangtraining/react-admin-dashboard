import React from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";

const Navbar = () => {
  const { sidebarOpen, setSidebarOpen, sidebarTrigger } = useStateContext();

  return (
    <div className="flex p-4 justify-start items-center">
      {/* Hamburger button */}
      <button
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
