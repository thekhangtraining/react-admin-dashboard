import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Tooltip } from "./";

const Navbar = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
    sidebarTrigger,
    settingsSidebarTrigger,
    setSettingsSidebarOpen,
    settingsSidebarOpen,
  } = useStateContext();
  let location = useLocation();
  let path = location.pathname.split("/").slice(1);

  return (
    <div className="flex p-0.5 justify-between items-center border-b border-border-base text-skin-strong">
      <div className="flex gap-3 items-center">
        {/* Hamburger button */}
        <Tooltip label="Menu">
          <button
            className="p-2"
            ref={sidebarTrigger}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <GiHamburgerMenu className="text-xl hover:text-skin-primary" />
          </button>
        </Tooltip>
        {/* Breadcrumbs */}
        <div className="flex items-center">
          {path.map((item, index) =>
            index === path.length - 1 ? (
              <div
                key={item}
                className="text-sm capitalize text-skin-primary font-bold"
              >
                {item}
              </div>
            ) : (
              <div key={item} className="flex items-center capitalize text-sm">
                {item}
                <span className="mx-1">
                  <BiChevronRight />
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <Tooltip label="Settings">
        <button
          className="p-2"
          ref={settingsSidebarTrigger}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={() => {
            setSettingsSidebarOpen(!settingsSidebarOpen);
          }}
        >
          <IoMdSettings className="text-xl" />
        </button>
      </Tooltip>
    </div>
  );
};

export default Navbar;
