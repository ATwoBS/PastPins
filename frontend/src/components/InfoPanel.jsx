import React, { useContext } from "react";
import { AppContext } from "./AppContext";

export default function InfoPanel() {
  const { selectedLocation } = useContext(AppContext);

  return (
    <div className="w-[30vw] p-4 bg-fffff4 shadow-lg h-screen overflow-y-auto">
      {selectedLocation ? (
        <>
          <h2 className="text-xl text-center text-[#564947] font-bold">{selectedLocation.name}</h2>
          <p className="mt-4">{selectedLocation.description}</p>
          <p className="mt-2 text-sm text-gray-500">
            Coordinates: {selectedLocation.coordinates.lat}, {selectedLocation.coordinates.lng}
          </p>
        </>
      ) : (
        <p className="text-center mt-10 text-gray-500">Click on a marker to view details.</p>
      )}
    </div>
  );
}