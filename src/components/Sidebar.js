import React from "react";
import { BsBoxArrowInLeft, BsBoxArrowInRight } from "react-icons/bs";
import { SiReactivex } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { navLinks } from "../data/navLinks";

const Sidebar = () => {
  const {
    currentColorGradient,
    sidebarOpen,
    setSidebarOpen,
    sidebar,
    sidebarTrigger,
    sidebarExpanded,
    setSidebarExpanded,
  } = useStateContext();

  const activeLink =
    "flex items-center lg:justify-center py-1 px-2 m-1 mb-0.5 rounded drop-shadow-xl lg:sidebar-expanded:justify-start";
  const normalLink =
    "flex items-center lg:justify-center py-1 px-2 m-1 mb-0.5 rounded hover:bg-gradient-to-r from-[#047857] lg:sidebar-expanded:justify-start";

  return (
    <div>
      {/* Sidebar backdrop */}
      <div
        className={`fixed inset-0 bg-zinc-900 bg-opacity-50 lg:hidden z-20 lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>
      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex p-2 flex-col absolute bg-zinc-900 text-slate-50 z-20 left-0 top-0 lg:sticky lg:translate-x-0 h-screen overflow-y-auto w-56 lg:w-20 lg:sidebar-expanded:!w-56 shrink-0 transition-all duration-75 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between lg:justify-center gap-x-2 items-center p-2 pb-0 font-bold">
          <NavLink to="/" key="logo">
            <div className="flex justify-start lg:justify-center items-center space-x-2">
              <div className="rounded-full p-0.5 bg-slate-50">
                <SiReactivex size="25px" color="#047857" />
              </div>
              <p className="capitalize truncate lg:hidden lg:sidebar-expanded:inline-flex"></p>
            </div>
          </NavLink>

          {/* Close button */}
          <button
            ref={sidebarTrigger}
            className="lg:hidden hover:text-emerald-500"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <BsBoxArrowInLeft className="h-6 w-6" />
          </button>
        </div>
        {/* NavLinks */}
        <div className="grow p-2">
          {navLinks.map((item) => (
            <div key={item.title.replace("-", " ")}>
              <p className="uppercase truncate mt-3 text-emerald-500 lg:sidebar-expanded:inline-flex">
                {item.title.replace("-", " ")}
              </p>
              {item.links.map((link) => (
                <NavLink
                  to={item.baseAddress + link.address}
                  key={link.name}
                  style={({ isActive }) => ({
                    background: isActive ? currentColorGradient : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <div className="flex items-center space-x-2 h-[1.25rem]">
                    <div>{link.icon}</div>
                    <span className="truncate lg:hidden lg:sidebar-expanded:inline-flex capitalize">
                      {link.name.replace("-", " ")}
                    </span>
                  </div>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        {/* Expand/Collapse button */}
        <div className="flex lg:justify-center lg:sidebar-expanded:justify-end m-2">
          <button
            className="hidden text-slate-50 hover:text-emerald-500 lg:inline-flex"
            onClick={() => {
              setSidebarExpanded(!sidebarExpanded);
            }}
          >
            <span className="sr-only">Expand/Collapse sidebar</span>
            <BsBoxArrowInRight className="sidebar-expanded:rotate-180 h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
