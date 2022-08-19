import React from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { BiChevronRight } from "react-icons/bi";

const Navbar = () => {
  const { sidebarOpen, setSidebarOpen, sidebarTrigger } = useStateContext();
  let location = useLocation();
  let path = location.pathname.split("/").slice(1);

  return (
    <div className="flex p-4 justify-start items-center space-x-6">
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
      <div className="flex items-center">
        {path.map((item, index) =>
          index === path.length - 1 ? (
            <div
              key={item}
              className="text-sm uppercase text-emerald-500 font-bold"
            >
              {item}
            </div>
          ) : (
            <div
              key={item}
              className="flex items-center text-slate-100 capitalize text-sm"
            >
              {item}
              <span className="mx-2">
                <BiChevronRight />
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;
