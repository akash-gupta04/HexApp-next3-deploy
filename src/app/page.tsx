"use client";

import dynamic from "next/dynamic";
import { useState, useContext } from "react";
import { MapStyleContext } from "./layout";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

export default function Page() {
  const { mapStyle } = useContext(MapStyleContext);
  const [selectedHexes, setSelectedHexes] = useState<string[]>([]);
  const [resolution, setResolution] = useState(5);

  const hexagonAreaPerResolution = [
    4357449, // km² at resolution 0
    1538395,
    219017,
    31359,
    4479,
    639,
    91,
    13,
    2,
    0.3,
    0.04, // km² at resolution 10
  ];

  const totalSelectedArea = selectedHexes.length * hexagonAreaPerResolution[resolution];

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
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={i}>
                Resolution {i}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Approx. Area per Hex:</strong>{" "}
          <span className="mt-2 text-gray-700">
            {hexagonAreaPerResolution[resolution].toLocaleString()} km²
          </span>
        </p>
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
        <p className="mt-2 text-gray-700">
          <strong>Total Approx. Area:</strong>{" "}
          <span className="">{totalSelectedArea.toLocaleString()} km²</span>
        </p>
      </div>
    </main>
  );
}
