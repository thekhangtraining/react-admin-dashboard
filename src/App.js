import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { Navbar, SettingsSidebar, Sidebar, Tooltip } from "./components";
import { useStateContext } from "./contexts/ContextProvider";
import { MoviesDB, OpenDota, Stocks } from "./pages";

let classnames = require("classnames");

const App = () => {
  const {
    theme,
    settingsSidebarTrigger,
    setSettingsSidebarOpen,
    settingsSidebarOpen,
  } = useStateContext();
  return (
    <div
      className={classnames(
        "flex text-xs text-skin-base",
        theme === "Nord" && "theme-nord",
        theme === "Emerald" && "theme-emerald",
        theme === "Maroon" && "theme-maroon"
      )}
    >
      <BrowserRouter>
        <Sidebar />
        <SettingsSidebar />
        <div className="w-full">
          <div className="w-full">
            <Navbar />
          </div>
          <main className="w-full">
            <Routes>
              <Route
                path="/"
                key="home"
                element={<Navigate to="/apps/Stocks" />}
              />

              {/* Apps of many popular apps */}
              <Route
                path="/apps/MoviesDB"
                key="MoviesDB"
                element={<MoviesDB />}
              />
              <Route
                path="/apps/OpenDota"
                key="OpenDota"
                element={<OpenDota />}
              />
              <Route path="/apps/Stocks" key="Stocks" element={<Stocks />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <Tooltip label="Settings" placement="left">
        <button
          className="p-2 fixed right-0 bottom-20 bg-skin-primary text-skin-muted rounded-l-md"
          ref={settingsSidebarTrigger}
          aria-controls="sidebar"
          aria-expanded={settingsSidebarOpen}
          onClick={() => {
            setSettingsSidebarOpen(!settingsSidebarOpen);
          }}
        >
          <Cog6ToothIcon className="h-7 w-7" />
        </button>
      </Tooltip>
      <ToastContainer
        position="bottom-right"
        newestOnTop
        pauseOnHover
        autoClose={3000}
        transition={Zoom}
        pauseOnFocusLoss={false}
        toastClassName="rounded-sm m-2"
        bodyClassName="p-0"
      />
    </div>
  );
};

export default App;
