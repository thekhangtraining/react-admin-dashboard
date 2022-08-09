import React from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { navLinks } from "../data/data";

const Sidebar = () => {
  const { currentColor } = useStateContext();
  const activeLink = "flex items-center p-2 m-0.5";
  const normalLink = "flex items-center p-2 m-0.5 hover:bg-blue-200";

  return (
    <div style={{fontFamily: "Open Sans"}}>
      {navLinks.map((item) => (
        <NavLink
          to={`/${item.name}`}
          key={item.name}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
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
