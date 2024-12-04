# Hex Map App

This is a Hex Map Application built with React and Next.js, utilizing Mapbox for map rendering and H3 for hexagonal grid calculations. The app allows users to select hexagons on the map, view the selected hexagons' IDs, and calculate their approximate total area based on the resolution.

## Features

- Interactive map with hexagon selection.
- Toggle between light and satellite map styles.
- Display of selected hexagons in an editable text area.
- Calculate the approximate area covered by selected hexagons.
- Responsive layout with smooth scrolling.
- Scroll-to-top button for user convenience.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Next.js**: Framework for server-side rendering and routing.
- **Mapbox**: Map rendering and visualization.
- **H3-js**: Hexagonal grid library for geospatial data.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Bootstrap Icons**: Icon library for the UI.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **Git**: [Download and install Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akash-gupta04/HexApp.git
   cd hex-map-application
2. Install dependencies:
   ```bash
   npm install react react-dom next
   npm install -D eslint eslint-config-next typescript @types/react @types/node
   npm install mapbox-gl react-map-gl
   
3. Add a .env.local file in the root of the project with your Mapbox access token:
    ```bash
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token
   
6. Run the server
    ```bash
   npm run dev

### Deployment
Deployed on Vercel
Checkout!! the HexApp on https://hexapp.vercel.app/
