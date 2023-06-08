import React from "react";

export const HomeContext = React.createContext();

export const useHomeContext = () => React.useContext(HomeContext);
