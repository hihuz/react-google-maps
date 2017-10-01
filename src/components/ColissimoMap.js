import React from "react";
import GoogleMap from "./GoogleMap/GoogleMap";
import Marker from "./GoogleMap/Marker";

const address = "2 rue Delacroix Toulouse 31000 France";

const locations = [
  {
    id: 1,
    position: {
      lat: 43.5992157,
      lng: 1.4479145
    }
  }
];

const ColissimoMap = () => {
  return (
    <GoogleMap address={address}>
      {locations.map(location => (
        <Marker key={location.id} location={location} />
      ))}
    </GoogleMap>
  );
};

export default ColissimoMap;
