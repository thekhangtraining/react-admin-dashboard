import React from "react";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { Select } from "./";

const classnames = require("classnames");

const SettingsSidebar = () => {
  const {
    settingsSidebarOpen,
    setSettingsSidebarOpen,
    setTheme,
    settingsSidebarBackdropRef,
  } = useStateContext();

  const options = [
    { value: "Nord", label: "Nord" },
    { value: "Emerald", label: "Emerald" },
  ];
  return (
    <div>
      {/* Backdrop */}
      <div
        ref={settingsSidebarBackdropRef}
        className={classnames(
          "inset-0 fixed bg-skin-fill bg-opacity-50 transition-opacity duration-200 z-20",
          (settingsSidebarOpen && "opacity-100") ||
            "opacity-0 pointer-events-none"
        )}
      ></div>
      <div
        className={classnames(
          "flex flex-col text-skin-strong bg-skin-fill border-l border-border-base fixed px-2 py-1 gap-2 right-0 h-screen transition-all duration-200 w-56 z-20",
          (!settingsSidebarOpen && "translate-x-60") || "translate-x-0"
        )}
      >
        <div className="flex items-center h-8">
          <button onClick={() => setSettingsSidebarOpen(false)}>
            <BsBoxArrowInRight className="h-6 w-6 hover:" />
          </button>
          <p className="text-sm w-full text-center">Settings</p>
        </div>
        <div className="px-4">
          <div className="flex items-center justify-between">
            <p>Theme</p>
            <Select
              setState={setTheme}
              options={options}
              isThemeSelect={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
