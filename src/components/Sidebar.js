import React from "react";
import { BsBoxArrowInLeft, BsGraphUp } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { IoLogoGameControllerB } from "react-icons/io";
import { MdLocalMovies } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Footer } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const classnames = require("classnames");

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, sidebarBackdropRef } = useStateContext();

  return (
    <div className="text-sm text-skin-strong">
      {/* Sidebar backdrop */}
      <div
        ref={sidebarBackdropRef}
        className={`fixed inset-0 bg-skin-fill bg-opacity-50 z-20 transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>
      {/* Sidebar */}
      <div
        className={`flex flex-col fixed px-2 py-1 gap-2 bg-skin-fill border-r border-border-base -x-bright z-20 left-0 top-0 h-screen overflow-y-auto w-56 shrink-0 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between gap-x-2 items-center pb-0">
          <Footer />

          {/* Close button */}
          <button
            className="hover:"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <BsBoxArrowInLeft className="h-6 w-6" />
          </button>
        </div>
        {/* NavLinks */}
        <div className="grow flex flex-col gap-2">
          {[
            {
              title: "Landing Pages",
              baseAddress: "/landing",
              links: [
                {
                  name: "Restaurant",
                  icon: <GiMeal />,
                  address: "/restaurant",
                },
              ],
            },
            {
              title: "Apps",
              baseAddress: "/apps",
              links: [
                {
                  name: "MoviesDB",
                  icon: <MdLocalMovies />,
                  address: "/MoviesDB",
                },
                {
                  name: "OpenDota",
                  icon: <IoLogoGameControllerB />,
                  address: "/OpenDota",
                },
                {
                  name: "Stocks",
                  icon: <BsGraphUp />,
                  address: "/Stocks",
                },
              ],
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col">
              <p className="uppercase truncate text-sm text-skin-primary">
                {item.title}
              </p>
              {item.links.map((link) => (
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to={item.baseAddress + link.address}
                  key={link.name}
                  className={({ isActive }) =>
                    classnames(
                      "flex items-center my-0.5 rounded-sm py-0.5 px-2 mx-2",
                      (isActive && "animate-slideIn bg-skin-secondary") ||
                        "hover:bg-skin-secondary"
                    )
                  }
                >
                  <div className="flex items-center space-x-2">
                    <div>{link.icon}</div>
                    <span className="truncate capitalize">{link.name}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
