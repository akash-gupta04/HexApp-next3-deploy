"use client";

import "./globals.css";
import React, { useState, createContext, useEffect } from "react";

// Create a context to share map style globally
export const MapStyleContext = createContext({
  mapStyle: "mapbox://styles/mapbox/light-v11",
  toggleMapStyle: () => {},
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/light-v11");
  const [showScroll, setShowScroll] = useState(false);

  // Toggle map styles between light and satellite
  const toggleMapStyle = () => {
    setMapStyle((prevStyle) =>
      prevStyle === "mapbox://styles/mapbox/light-v11"
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/light-v11"
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.3; // 30% of viewport height
      setShowScroll(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <MapStyleContext.Provider value={{ mapStyle, toggleMapStyle }}>
          <header className="fixed top-0 left-0 w-full bg-black text-white p-4 shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Hex Map</h1>
              <button
                className="flex items-center px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 text-white transition-all"
                onClick={toggleMapStyle}
                aria-label="Toggle map style"
              >
                <i className={`bi ${mapStyle === "mapbox://styles/mapbox/light-v11" ? "bi-moon" : "bi-sun"} mr-2`}></i>
                {mapStyle === "mapbox://styles/mapbox/light-v11" ? "Satellite Mode" : "Light Mode"}
              </button>
            </div>
          </header>

          <main className="flex-grow container mx-auto p-4 mt-20">{children}</main>

          <footer className="bg-black text-gray-400 p-4 text-center mt-auto border-t border-gray-600">
            <div className="container mx-auto">
              <p>&copy; {new Date().getFullYear()} Hex Map</p>
              <p>
                Built using{" "}
                <a href="https://reactjs.org/" className="text-gray-300 hover:underline">
                  React
                </a>{" "}
                and{" "}
                <a
                  href="https://www.mapbox.com/"
                  className="text-gray-300 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mapbox
                </a>.
              </p>
            </div>
          </footer>

          {showScroll && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none"
              aria-label="Scroll to top"
            >
              <i className="bi bi-arrow-up"></i>
            </button>
          )}
        </MapStyleContext.Provider>
      </body>
    </html>
  );
}
