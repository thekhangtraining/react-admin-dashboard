import React from "react";
import { BsFillBellFill, BsFillChatRightTextFill } from "react-icons/bs";
import { Avatar } from "./";

const NavButton = ({ icon, color, dotColor }) => (
  <button
    type="button"
    style={{ color }}
    className="relative text-xl rounded-full p-2.5 hover:bg-slate-200 bg-slate-50"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  return (
    <div className="flex justify-end gap-x-1 items-center">
      <NavButton
        title="Chat"
        dotColor="#ef4444"
        color="linear-gradient(to right, #047857, #38bdf8)"
        icon={<BsFillChatRightTextFill />}
      />
      <NavButton
        title="Notification"
        dotColor="#ef4444"
        color="linear-gradient(to right, #047857, #38bdf8)"
        icon={<BsFillBellFill />}
      />{" "}
      <Avatar />
      <p className="text-sm">Hi, <span className="font-bold">The-Khang Nguyen</span></p>
    </div>
  );
};

export default Navbar;
