"use client";

import { createContext } from "react";

export const MapStyleContext = createContext({
    mapStyle: "mapbox://styles/mapbox/light-v11",
    toggleMapStyle: () => {},
  });
  
