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
    "linear-gradient(to right, #075985, #7e22ce)"
  );
  const [currentColor, setCurrentColor] = useState("#075985");
  const settingsSidebarBackdropRef = useRef(null);
  const sidebarBackdropRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsSidebarOpen, setSettingsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("Nord");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== undefined) setTheme(storedTheme);
  }, []);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !sidebarBackdropRef.current.contains(target) &&
        !settingsSidebarBackdropRef.current.contains(target)
      )
        return;

      setSidebarOpen(false);
      setSettingsSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if ((!sidebarOpen && !settingsSidebarOpen) || keyCode !== 27) return;
      setSidebarOpen(false);
      setSettingsSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <StateContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        currentColorGradient,
        setCurrentColorGradient,
        sidebarOpen,
        setSidebarOpen,
        setSettingsSidebarOpen,
        settingsSidebarOpen,
        theme,
        setTheme,
        sidebarBackdropRef,
        settingsSidebarBackdropRef,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
