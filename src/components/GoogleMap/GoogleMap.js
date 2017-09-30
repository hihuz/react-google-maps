import React, { Component } from "react";
import EnhanceGoogleMap from "./EnhanceGoogleMap";

class GoogleMap extends Component {
  constructor() {
    super();

    this.state = {
      mapLoaded: false,
    };

    this.positionMap = this.positionMap.bind(this);
    this.placeMarkers = this.placeMarkers.bind(this);
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded && isScriptLoadSucceed) {
      this.map = new google.maps.Map(this.mapEl);
      this.setState({ mapLoaded: true });
      this.positionMap(this.props.locations);
      this.placeMarkers(this.props.locations);
    }
  }

  positionMap(locations) {
    const bounds = new google.maps.LatLngBounds();
    locations.forEach(location => {
      bounds.extend(location.position);
    });

    this.map.fitBounds(bounds);
  }

  placeMarkers(locations) {
    const markers = locations.map(
      location =>
        new google.maps.Marker({
          position: location.position,
          map: this.map,
          icon: this.props.markerIcon,
        }),
    );
  }

  render() {
    return (
      <div className="google-map">
        <div
          ref={mapEl => {
            this.mapEl = mapEl;
          }}
          className="google-map__container"
          style={{ width: "400px", height: "400px" }}
        />

        {!this.state.mapLoaded && <div className="google-map__loader">Loading...</div>}
      </div>
    );
  }
}

export default EnhanceGoogleMap()(GoogleMap);
