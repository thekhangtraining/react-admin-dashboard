import React from "react";
import { NavLink } from "react-router-dom";
// import { useStateContext } from "../contexts/ContextProvider";
import { navLinks } from "../data/data";

const Sidebar = () => {
  const activeLink = "flex items-center p-2 m-0.5 rounded-sm text-slate-100";
  const normalLink =
    "flex items-center p-2 m-0.5 rounded-sm hover:bg-gradient-to-r from-[#1e3a8a] hover:text-slate-100";

  return (
    <div>
      {navLinks.map((item) => (
        <NavLink
          to={`/${item.name}`}
          key={item.name}
          style={({ isActive }) => ({
            background: isActive
              ? "linear-gradient(to right, #1e3a8a, #38bdf8)"
              : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="px-2">{item.icon}</div>
          <span className="capitalize font-medium text-base">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
