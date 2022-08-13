import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import { Footer } from "./";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const { currentColorGradient } = useStateContext();
  const activeLink =
    "flex items-center p-1 m-0.5 ml-5 rounded-sm text-slate-100 drop-shadow-xl animate-slideIn";
  const normalLink =
    "flex items-center p-1 m-0.5 ml-1 rounded-sm hover:bg-gradient-to-r from-[#047857] hover:text-slate-100";

  return (
    <div className="flex flex-col h-full gap-y-2 bg-gray-200">
      {/* Header */}
      <div className="flex justify-center gap-x-2 items-center p-2.5 bg-gradient-to-r from-[#047857] to-[#7e22ce] text-slate-100 font-bold text-sm">
        <div className="rounded-full p-0.5 bg-slate-100">
          <MdAdminPanelSettings size="30px" color="#047857" />
          {/* <GrMonitor size="20px" /> */}
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
