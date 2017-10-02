import React from "react";
import GoogleMap from "./GoogleMap/GoogleMap";

const address = "2 rue Delacroix Toulouse 31000 France";
const locations = [
  {
    id: 1,
    position: {
      lat: 43.5992157,
      lng: 1.4479145
    }
  },
  {
    id: 2,
    position: {
      lat: 43.6052137,
      lng: 1.4456693
    }
  },
  {
    id: 3,
    position: {
      lat: 43.5925958,
      lng: 1.4481584
    }
  }
];

const ColissimoMap = () => <GoogleMap address={address} markers={locations} />;

export default ColissimoMap;
