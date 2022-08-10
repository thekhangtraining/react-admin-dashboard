import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState("#0891b2");

  return (
    <StateContext.Provider value={{ currentColor, setCurrentColor }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
