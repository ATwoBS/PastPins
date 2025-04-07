import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <AppContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </AppContext.Provider>
  );
};