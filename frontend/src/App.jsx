import React, { useEffect, useState } from "react";
import Map from "./components/Map.jsx";
import InfoPanel from "./components/InfoPanel.jsx"
import { AppProvider } from "./components/AppContext.jsx";
import "./App.css";

export default function App() {
    return (
        <div>
          <AppProvider>
          <div className="flex">
            <div className="flex-1">
              <Map/>
            </div>
            <InfoPanel />
          </div>
          </AppProvider>
        </div>
    );
}