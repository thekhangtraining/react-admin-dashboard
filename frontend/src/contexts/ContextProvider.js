import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColorGradient, setCurrentColorGradient] = useState(
    "linear-gradient(to right, #047857, #7e22ce)"
  );
  const [currentColor, setCurrentColor] = useState("#047857");

  return (
    <StateContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        currentColorGradient,
        setCurrentColorGradient,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
