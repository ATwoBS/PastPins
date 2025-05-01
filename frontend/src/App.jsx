import React, { useEffect, useState } from "react";
import Map from "./components/Map.jsx";
import InfoPanel from "./components/InfoPanel.jsx"
import { AppProvider } from "./components/AppContext.jsx";
import "./App.css";

export default function App() {
  return (
    <div>
      <AppProvider>
        <div className="flex flex-col md:flex-row h-screen w-screen">
          <div className="w-full md:w-[70vw] h-[60vh] md:h-screen">
            <Map />
          </div>
          <div className="h-[40vh]">
            <InfoPanel />
          </div>
        </div>
      </AppProvider>
    </div>

  );
}