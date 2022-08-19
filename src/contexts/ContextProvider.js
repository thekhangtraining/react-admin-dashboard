import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColorGradient, setCurrentColorGradient] = useState(
    "linear-gradient(to right, #047857, #7e22ce)"
  );
  const [currentColor, setCurrentColor] = useState("#047857");
  const sidebarTrigger = useRef(null);
  const sidebar = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !sidebarTrigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        sidebarTrigger.current.contains(target)
      )
        return;

      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <StateContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        currentColorGradient,
        setCurrentColorGradient,
        sidebarOpen,
        setSidebarOpen,
        sidebar,
        sidebarTrigger,
        sidebarExpanded,
        setSidebarExpanded,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
