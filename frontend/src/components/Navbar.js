import React from "react";
import {
  BsFillBellFill,
  BsFillChatRightTextFill,
  BsFillMenuButtonWideFill,
} from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { Avatar } from "./";

const NavButton = ({ icon, color, dotColor, onClickFunc }) => (
  <button
    type="button"
    style={{ color }}
    className="relative text-xl rounded p-2.5 hover:bg-gray-100 bg-gray-200 duration-200"
    onClick={onClickFunc}
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 animate-ping"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const { setSidebarOpen } = useStateContext();

  return (
    <div className="flex justify-end gap-x-1 items-center">
      <NavButton
        title="Sidebar"
        color="#047857"
        icon={<BsFillMenuButtonWideFill />}
        onClickFunc={() => setSidebarOpen((sidebarOpen) => !sidebarOpen)}
      />
      <NavButton
        title="Chat"
        dotColor="#ef4444"
        color="#047857"
        icon={<BsFillChatRightTextFill />}
      />
      <NavButton
        title="Notification"
        dotColor="#ef4444"
        color="#047857"
        icon={<BsFillBellFill />}
      />{" "}
      <Avatar isRound />
      <p className="text-sm">
        Hi, <span className="font-bold">The-Khang Nguyen</span>
      </p>
    </div>
  );
};

export default Navbar;
