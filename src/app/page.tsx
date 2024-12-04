"use client";

import dynamic from "next/dynamic";
import { useState, useContext } from "react";
import { MapStyleContext } from "./components/MapStyle";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

export default function Page() {
  const { mapStyle } = useContext(MapStyleContext);
  const [selectedHexes, setSelectedHexes] = useState<string[]>([]);
  const [resolution, setResolution] = useState(5);

  const hexagonEdgeLengthPerResolution = [
    1107712.591, // km at resolution 0
    418676.0055,
    158244.6558,
    59810.85794,
    22625.43656,
    8556.27732,
    3237.663461,
    1224.837918,
    463.304065,
    175.6618745,
    66.51154506,
    25.16993739,
    9.519281662,
    3.599244768,
    1.361999115, // km at resolution 14
  ];

  return (
    <main className="p-4">
      {/* Resolution Selector */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <label htmlFor="resolution" className="mr-2 font-medium">
            Hexagon Size:
          </label>
          <select
            id="resolution"
            value={resolution}
            onChange={(e) => setResolution(Number(e.target.value))}
            className="p-2 border rounded"
          >
            {Array.from({ length: 15 }, (_, i) => (
              <option key={i} value={i}>
                Resolution {i}
              </option>
            ))}
          </select>
          
        </div>
      
      </div>

      {/* Map Section */}
      <div className="w-full h-[500px] shadow-md rounded-md overflow-hidden">
        <Map
          onHexSelect={(hexes) => {
            setSelectedHexes(hexes);
          }}
          mapStyle={mapStyle}
          resolution={resolution}
        />
      </div>

      {/* Selected Hexagons and Approximate Area */}
      <div className="mt-4 p-4 bg-gray-100 rounded shadow">
        <h2 className="text-lg font-bold">Selected Hexagons:</h2>
        <textarea
          value={selectedHexes.join(", ")}
          onChange={(e) => {
            const updatedHexes = e.target.value
              .split(",")
              .map((hex) => hex.trim())
              .filter((hex) => hex !== ""); // Remove empty entries
            setSelectedHexes(updatedHexes);
          }}
          className="w-full p-2 border rounded font-mono text-sm h-28 resize-none overflow-y-auto"
        />
        <p className="text-sm text-gray-600">
          <strong>Selected Hexagon Edge Size :</strong>{" "}
          <span className="mt-2 text-gray-700">
          {hexagonEdgeLengthPerResolution[resolution].toLocaleString()} meters</span>
        </p>
      </div>
    </main>
  );
}
