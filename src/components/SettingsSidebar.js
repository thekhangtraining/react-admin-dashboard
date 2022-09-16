import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { ThemeSelect } from "./";

const classnames = require("classnames");

const SettingsSidebar = () => {
  const {
    settingsSidebarOpen,
    setSettingsSidebarOpen,
    settingsSidebarBackdropRef,
  } = useStateContext();

  return (
    <div>
      {/* Backdrop */}
      <div
        ref={settingsSidebarBackdropRef}
        className={classnames(
          "inset-0 fixed bg-slate-800 bg-opacity-20 transition-opacity duration-200 z-20",
          (settingsSidebarOpen && "opacity-100") ||
            "opacity-0 pointer-events-none"
        )}
      ></div>
      <div
        className={classnames(
          "flex flex-col bg-skin-fill border-l border-border-base fixed px-2 py-1 gap-2 right-0 h-screen transition-all duration-200 w-56 z-20",
          (!settingsSidebarOpen && "translate-x-60") || "translate-x-0"
        )}
      >
        <div className="flex items-center h-8">
          <button onClick={() => setSettingsSidebarOpen(false)}>
            <ChevronDoubleRightIcon className="h-5 w-5 hover:text-skin-primary" />
          </button>
          <p className="text-sm w-full text-center">Settings</p>
        </div>
        <div className="px-4">
          <div className="flex items-center justify-between">
            <p>Theme</p>
            <ThemeSelect />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
