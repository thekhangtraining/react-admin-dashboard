import React from "react";
import { BsBoxArrowInLeft, BsGraphUp } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdLocalMovies } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Footer } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const {
    currentColorGradient,
    sidebarOpen,
    setSidebarOpen,
    sidebar,
    sidebarTrigger,
  } = useStateContext();

  const activeLink =
    "flex text-sm items-center py-1 px-2 my-0.5 rounded-sm drop-shadow-xl animate-slideIn";
  const normalLink =
    "flex text-sm items-center py-1 px-2 my-0.5 rounded-sm hover:bg-gradient-to-r from-[#047857]";

  return (
    <div>
      {/* Sidebar backdrop */}
      <div
        className={`fixed inset-0 bg-zinc-900 bg-opacity-50 z-20 transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>
      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col fixed bg-zinc-900 text-slate-50 z-20 left-0 top-0 h-screen overflow-y-auto w-56 p-1 shrink-0 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between gap-x-2 items-center p-2 pb-0">
          <Footer />

          {/* Close button */}
          <button
            ref={sidebarTrigger}
            className="hover:text-emerald-500"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <BsBoxArrowInLeft className="h-6 w-6" />
          </button>
        </div>
        {/* NavLinks */}
        <div className="grow p-2 py-1">
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
              title: "Dashboards",
              baseAddress: "/dashboards",
              links: [
                {
                  name: "Analytics",
                  icon: <BsGraphUp />,
                  address: "/analytics",
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
                  name: "TravelBuddy",
                  icon: <FaGlobeAmericas />,
                  address: "/TravelBuddy",
                },
              ],
            },
          ].map((item) => (
            <div key={item.title}>
              <p className="uppercase truncate mt-2 text-sm text-emerald-500">
                {item.title}
              </p>
              {item.links.map((link) => (
                <NavLink
                  onClick={() => setSidebarOpen(false)}
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
