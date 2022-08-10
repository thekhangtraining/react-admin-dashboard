import React from "react";
import { NavLink } from "react-router-dom";
// import { useStateContext } from "../contexts/ContextProvider";
import { navLinks } from "../data/data";

const Sidebar = () => {
  const activeLink =
    "flex items-center p-2 m-0.5 ml-8 rounded-md text-slate-100 drop-shadow-xl animate-slideIn";
  const normalLink =
    "flex items-center p-2 m-0.5 ml-4 rounded-sm hover:bg-gradient-to-r from-[#1e3a8a] hover:text-slate-100";

  return (
    <div>
      {navLinks.map((item) => (
        <div key={item.title}>
          <div className="p-2 m-0.5 uppercase">{item.title}</div>
          {item.links.map((link) => (
            <NavLink
              to={item.baseAddress + link.address}
              key={link.name}
              style={({ isActive }) => ({
                background: isActive
                  ? "linear-gradient(to right, #1e3a8a, #38bdf8)"
                  : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <div className="px-2">{link.icon}</div>
              <span className="capitalize font-medium text-base">
                {link.name.replace("-", " ")}
              </span>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
