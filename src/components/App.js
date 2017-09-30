import React from "react";
import "../styles/main.css";
import GoogleMap from "./GoogleMap";

const locations = [
  {
    position: {
      lat: -34.397,
      lng: 150.644,
    },
  },
];

const App = () => <GoogleMap locations={locations} />;

export default App;
