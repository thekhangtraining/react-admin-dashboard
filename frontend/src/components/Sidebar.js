import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { navLinks } from "../data/navLinks";
import { Footer } from "./";

const Sidebar = () => {
  const { currentColorGradient, sidebarOpen } = useStateContext();

  const activeLink =
    "flex items-center p-1 m-0.5 ml-5 rounded drop-shadow-xl animate-slideIn";
  const normalLink =
    "flex items-center p-1 m-0.5 ml-1 rounded hover:bg-gradient-to-r from-[#047857]";

  return (
    <div
      className={`flex flex-col h-screen gap-y-2 text-slate-100 bg-slate-800 overflow-x-hidden overflow-y-auto transition-all duration-75 ease-in-out ${
        sidebarOpen ? "w-72" : "w-0"
      }`}
    >
      {/* Header */}
      <div className="flex justify-center gap-x-2 items-center p-2.5 bg-gradient-to-r from-[#047857] to-[#7e22ce] font-bold text-sm">
        <div className="rounded-full p-0.5 bg-slate-50">
          <MdAdminPanelSettings size="25px" color="#047857" />
        </div>
        <p className="uppercase">Admin Dashboard</p>
      </div>
      {/* NavLinks */}
      <div className="grow p-2 m-0.5">
        {navLinks.map((item) => (
          <div key={item.title}>
            <div className="uppercase">{item.title}</div>
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
                <div className="px-2">{link.icon}</div>
                <span className="capitalize">
                  {link.name.replace("-", " ")}
                </span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Sidebar;
