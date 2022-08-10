import React from "react";
import { NavLink } from "react-router-dom";
// import { useStateContext } from "../contexts/ContextProvider";
import { navLinks } from "../data/data";
import { BsLinkedin, BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

const Sidebar = () => {
  const activeLink =
    "flex items-center p-2 m-0.5 ml-5 rounded-md text-slate-100 drop-shadow-xl animate-slideIn";
  const normalLink =
    "flex items-center p-2 m-0.5 ml-1 rounded-sm hover:bg-gradient-to-r from-[#1e3a8a] hover:text-slate-100";

  return (
    <div className="flex flex-col h-full">
      <div className="grow p-2 m-0.5">
        {navLinks.map((item) => (
          <div key={item.title}>
            <div className="uppercase">{item.title}</div>
            {item.links.map((link) => (
              <NavLink
                to={item.baseAddress + link.address}
                key={link.name}
                style={({ isActive }) => ({
                  background: isActive
                    ? "linear-gradient(to right, #1e3a8a, #38bdf8)"
                    : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
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
      {/* Footer */}
      <div className="flex flex-col rounded-sm bg-gradient-to-r from-[#1e3a8a] to-[#38bdf8] p-2 text-slate-100 text-center font-bold text-sm">
        <div>The-Khang Nguyen © {new Date().getFullYear()}</div>

        <div className="flex justify-center mt-1 text-xl gap-x-2">
          <button>
            <BsLinkedin />
          </button>
          <button>
            <BsGithub />
          </button>
          <button>
            <BsFacebook />
          </button>
          <button>
            <BsInstagram />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
