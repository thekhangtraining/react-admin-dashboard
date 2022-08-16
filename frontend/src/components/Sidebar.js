import React from "react";
import { FaEllipsisH } from "react-icons/fa";
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
    "flex items-center sidebar-expanded:justify-start py-2 px-2 mt-1 m-0.5 ml-1 rounded drop-shadow-xl sidebar-expanded:py-1";
  const normalLink =
    "flex items-center sidebar-expanded:justify-start py-2 px-2 mt-1 m-0.5 ml-1 rounded hover:bg-gradient-to-r from-[#047857] sidebar-expanded:py-1";

  return (
    <div>
      {/* Sidebar backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>
      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute text-slate-50 z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-56 lg:w-20 lg:sidebar-expanded:!w-56 shrink-0 bg-slate-800 transition-all duration-75 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between lg:justify-center gap-x-2 items-center p-2.5 font-bold text-sm">
          <NavLink to="/" key="logo">
            <div className="flex justify-start lg:justify-center items-center space-x-2">
              <div className="rounded-full p-0.5 bg-slate-50">
                <SiReactivex size="25px" color="#047857" />
              </div>
              <p className="hidden uppercase truncate sidebar-expanded:inline-flex hover:text-sky-200">
                My Résumé
              </p>
            </div>
          </NavLink>

          {/* Close button */}
          <button
            ref={sidebarTrigger}
            className="lg:hidden hover:text-slate-400"
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
        <div className="grow p-2 m-0.5">
          {navLinks.map((item) => (
            <div key={item.title.replace("-", " ")}>
              <p className="uppercase truncate lg:sidebar-expanded:inline-flex">
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
                  <div className="flex items-center space-x-2">
                    <div>{link.icon}</div>
                    <span className="truncate lg:hidden lg:sidebar-expanded:inline-flex duration-20 capitalize">
                      {link.name.replace("-", " ")}
                    </span>
                  </div>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        {/* Expand/Collapse button */}
        <div className="pt-3 hidden lg:inline-flex justify-end mt-auto hover:text-emerald-700">
          <div className="px-3 py-2">
            <button
              className=""
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
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Sidebar;
