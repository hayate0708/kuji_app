import React from "react";

export const GlobalContext = React.createContext();

export const useGlobalContext = () => React.useContext(GlobalContext);
