import React, { useContext, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AppContext } from "./AppContext";
import { customIcon } from "./Icon";

const centerPosition = [18.5204, 73.8567];

const FlyToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 16);
    }
  }, [position, map]);
  return null;
};

export default function Map() {
  const { setSelectedLocation } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [flyToPosition, setFlyToPosition] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        console.time('Time taken to fetch data: ')
        const res = await fetch("https://pastpins.onrender.com/");
        console.timeEnd('Time taken to fetch data: ')
        const data = await res.json();
        setLocations(data.locations);
        console.log("Locations set");
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0) {
      const results = locations.filter((pos) =>
        pos.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const handleSelectLocation = (posi) => {
    setSelectedLocation(posi);
    setFlyToPosition([posi.coordinates.lat, posi.coordinates.lng]);
    setFilteredResults([]);
    setSearchTerm("");
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
        background: "white",
        padding: "10px",
        borderRadius: "8px",
        width: "250px",
        boxShadow: "0 0 8px rgba(0,0,0,0.15)"
      }}>
        <input
          className="text-black"
          type="text"
          placeholder="Search location..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "100%", padding: "6px 8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        {filteredResults.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, marginTop: "8px", maxHeight: "150px", overflowY: "auto" }}>
            {filteredResults.map((pos) => (
              <li
                className="text-black"
                key={pos.serial}
                onClick={() => handleSelectLocation(pos)}
                style={{
                  padding: "6px 8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {pos.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <MapContainer
        center={centerPosition}
        zoom={13}
        style={{ height: "100vh", width: "70vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {flyToPosition && <FlyToLocation position={flyToPosition} />}

        {locations.map((posi) => (
          <Marker
            key={posi.serial}
            icon={ customIcon }
            position={[posi.coordinates.lat, posi.coordinates.lng]}
            eventHandlers={{
              click: () => {
                setSelectedLocation(posi);
              },
            }}
          >
            <Popup>
              <br />
              {posi.image ? (
                <div>
                  <img
                    src={posi.image}
                    alt={posi.name}
                    className="block mx-auto border-3 border-[#7d7265] max-h-[200px] max-w-[800px]"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                  <br />
                  <h2 className="text-center text-[20px] -mb-5 -mt-2">{posi.name}</h2>
                </div>
              ) : (
                <h4 className="text-[20px] text-center -mb-5 -mt-5">{posi.name}</h4>
              )}
              <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}