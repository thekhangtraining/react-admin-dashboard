import React from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../data/dummy";

const Sidebar = () => {
  const activeLink = "flex items-center";
  const normalLink = "flex hover:bg-slate-300 items-center";

  return (
    <div>
      {navLinks.map((item) => (
        <NavLink
          to={`/${item.name}`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#cbd5e1" : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="px-2">{item.icon}</div>
          <span className="capitalize font-medium">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
