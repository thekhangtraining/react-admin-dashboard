import React from "react";
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
    "flex items-center py-1 px-2 pr-2 m-1 mb-0.5 rounded drop-shadow-xl";
  const normalLink =
    "flex items-center py-1 px-2 pr-0 m-1 mb-0.5 rounded hover:bg-gradient-to-r from-[#047857]";

  return (
    <div>
      {/* Sidebar backdrop */}
      <div
        className={`fixed inset-0 bg-zinc-900 bg-opacity-40 lg:hidden z-20 lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>
      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex p-2 flex-col absolute bg-zinc-900 text-slate-50 z-20 left-0 top-0 lg:sticky lg:translate-x-0 h-screen overflow-hidden w-56 lg:w-20 lg:sidebar-expanded:!w-56 shrink-0 transition-all duration-75 ease-in-out ${
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
              <p className="capitalize truncate lg:hidden lg:sidebar-expanded:inline-flex">
                My Résumé
              </p>
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
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>
        {/* NavLinks */}
        <div className="grow p-2">
          {navLinks.map((item) => (
            <div key={item.title.replace("-", " ")}>
              <p className="capitalize truncate mt-3 lg:sidebar-expanded:inline-flex">
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
        <div className="flex justify-end mb-2">
          <button
            className="hidden p-2.5 text-slate-50 hover:text-emerald-500 lg:inline-flex"
            onClick={() => {
              setSidebarExpanded(!sidebarExpanded);
            }}
          >
            <span className="sr-only">Expand/Collapse sidebar</span>
            <svg
              className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
              viewBox="0 0 24 24"
            >
              <path
                className=""
                d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
              />
              <path className="" d="M3 23H1V1h2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
