import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColorGradient, setCurrentColorGradient] = useState(
    "linear-gradient(to right, #047857, #7e22ce)"
  );
  const [currentColor, setCurrentColor] = useState("#047857");

  // Get sidebar status from cookies
  const storedSidebarOpen = localStorage.getItem("sidebar-open");

  const [sidebarOpen, setSidebarOpen] = useState(
    storedSidebarOpen === null ? true : storedSidebarOpen === true
  );

  // const sidebar = useRef(null);
  // const trigger = useRef(null);

  // // Close sidebar on clicking outside
  // useEffect(() => {
  //   const clickHandler = ({ target }) => {
  //     if (!sidebar.current || !trigger.current) return;
  //     if (
  //       !sidebarOpen ||
  //       sidebar.current.contains(target) ||
  //       trigger.current.contains(target)
  //     )
  //       return;
  //     setSidebarOpen(false);
  //   };
  //   document.addEventListener("click", clickHandler);
  //   return () => document.removeEventListener("click", clickHandler);
  // });

  return (
    <StateContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        currentColorGradient,
        setCurrentColorGradient,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
