"use client";

import { useState, useRef, useEffect } from "react";
import MapGL, { MapRef, Source, Layer } from "react-map-gl";
import * as H3 from "h3-js";

interface MapProps {
  onHexSelect?: (hexes: string[]) => void; // Callback for selected hexagons
  mapStyle: string; // Map style dynamically passed
  resolution: number; // Hexagon resolution
}

export default function Map({ onHexSelect, mapStyle, resolution }: MapProps) {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 3,
    pitch: 0, // Lock pitch to 0 (flat plane)
    bearing: 0, // Lock bearing to 0 (no rotation)
  });
  const [selectedHexes, setSelectedHexes] = useState<string[]>([]);
  const mapRef = useRef<MapRef | null>(null);

  // Sync selected hexagons with parent
  useEffect(() => {
    if (onHexSelect) {
      onHexSelect(selectedHexes);
    }
  }, [selectedHexes, onHexSelect]);

  // Handle hexagon selection
  const handleMapClick = (event: mapboxgl.MapMouseEvent) => {
    const { lng, lat } = event.lngLat;
    const hex = H3.latLngToCell(lat, lng, resolution);

    setSelectedHexes((prev) =>
      prev.includes(hex) ? prev.filter((h) => h !== hex) : [...prev, hex]
    );
  };

  // Generate GeoJSON for selected hexagons
  const hexagonGeoJson = {
    type: "FeatureCollection",
    features: selectedHexes.map((hex) => ({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [H3.cellToBoundary(hex, true)],
      },
      properties: {},
    })),
  };

  return (
    <div className="relative w-full h-full">
      <MapGL
        {...viewport}
        ref={mapRef}
        onMove={(evt) => setViewport(evt.viewState)}
        onClick={handleMapClick}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        attributionControl={false}
        dragRotate={false} // Disable map rotation
        minPitch={0} // Lock tilt
        maxPitch={0} // Lock tilt
      >
        {/* Hexagon Layers */}
        <Source id="selected-hexagons" type="geojson" data={hexagonGeoJson}>
          <Layer
            id="selected-hexagon-layer"
            type="fill"
            paint={{
              "fill-color": mapStyle.includes("satellite")
                ? "rgba(255, 255, 255, 0.4)"
                : "#B0AFAF",
              "fill-opacity": 0.6,
            }}
          />
          <Layer
            id="selected-hexagon-border"
            type="line"
            paint={{
              "line-color": mapStyle.includes("satellite") ? "white" : "#1C1E21",
              "line-width": 2,
            }}
          />
        </Source>
      </MapGL>

      {/* Custom Watermark */}
      <div className="absolute bottom-2 left-2 bg-white/80 text-xs p-2 rounded shadow">
        Map data ©{" "}
        <a
          href="https://www.mapbox.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mapbox
        </a>
        , ©{" "}
        <a
          href="https://www.openstreetmap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenStreetMap
        </a>
      </div>
    </div>
  );
}
