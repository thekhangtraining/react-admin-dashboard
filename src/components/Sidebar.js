import {
  CreditCardIcon,
  PresentationChartLineIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";
import { Footer } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const classnames = require("classnames");

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, sidebarBackdropRef } = useStateContext();
  const iconClassname = "h-6 w-6";

  return (
    <div className="text-sm text-skin-base">
      {/* Sidebar backdrop */}
      <div
        ref={sidebarBackdropRef}
        className={`fixed inset-0 bg-slate-800 bg-opacity-20 z-20 transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>
      {/* Sidebar */}
      <div
        className={`flex flex-col fixed gap-2 bg-skin-fill border-r border-border-base -x-bright z-20 left-0 top-0 h-screen overflow-y-auto w-56 shrink-0 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        {/* NavLinks */}
        <div className="grow flex flex-col gap-2">
          {[
            {
              title: "Apps",
              baseAddress: "/apps",
              links: [
                {
                  name: "MoviesDB",
                  icon: <VideoCameraIcon className={iconClassname} />,
                  address: "/MoviesDB",
                },
                {
                  name: "OpenDota",
                  icon: <CreditCardIcon className={iconClassname} />,
                  address: "/OpenDota",
                },
                {
                  name: "Stocks",
                  icon: <PresentationChartLineIcon className={iconClassname} />,
                  address: "/Stocks",
                },
              ],
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col font-bold">
              {item.links.map((link) => (
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to={item.baseAddress + link.address}
                  key={link.name}
                  className={({ isActive }) =>
                    classnames(
                      "flex items-center hover:bg-skin-fill-1",
                      isActive &&
                        "animate-slideIn bg-skin-fill text-skin-primary"
                    )
                  }
                >
                  <div className="flex items-center space-x-2 py-1 px-1 ">
                    <div>{link.icon}</div>
                    <span className="truncate capitalize">{link.name}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        {/* Sidebar header */}
        <div className="flex justify-center items-center border-t border-border-base py-3">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
