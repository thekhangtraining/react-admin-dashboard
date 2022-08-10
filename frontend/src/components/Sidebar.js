import React from "react";
import { NavLink } from "react-router-dom";
// import { useStateContext } from "../contexts/ContextProvider";
import { Avatar as MtAvatar } from "@mantine/core";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { GrMonitor } from "react-icons/gr";
import { navLinks } from "../data/data";
import { Avatar } from "./";

const Sidebar = () => {
  const activeLink =
    "flex items-center p-2 m-0.5 ml-5 rounded-md text-slate-100 drop-shadow-xl animate-slideIn";
  const normalLink =
    "flex items-center p-2 m-0.5 ml-1 rounded-sm hover:bg-gradient-to-r from-[#047857] hover:text-slate-100";

  return (
    <div className="flex flex-col h-full gap-y-2">
      {/* Header */}
      <div className="flex justify-center gap-x-1 items-center p-2.5 bg-gradient-to-r from-[#047857] to-[#38bdf8] text-slate-100 font-bold text-sm">
        <MtAvatar radius="xl">
          <GrMonitor />
        </MtAvatar>
        <p>TN Admin Dashboard</p>
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
                  background: isActive
                    ? "linear-gradient(to right, #047857, #38bdf8)"
                    : "",
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
      {/* Footer */}
      <div className="flex flex-col items-center gap-y-1 bg-gradient-to-r from-[#047857] to-[#38bdf8] p-2 text-slate-100 font-bold text-sm">
        <Avatar />
        <div>TN Enterprise © {new Date().getFullYear()}</div>
        <div className="flex justify-center text-xl gap-x-2">
          <a
            href="https://www.linkedin.com/in/thekhangnguyen/"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://github.com/thekhangcloud/"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub />
          </a>
          <a
            href="https://www.facebook.com/nguyenthekhang94/"
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook />
          </a>
          <a
            href="https://www.instagram.com/thekhangnguyen_/"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
