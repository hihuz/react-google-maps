import React, { Component } from "react";
import EnhanceGoogleMap from "./EnhanceGoogleMap";

const fitMap = ({ map, markers }) => {};

class GoogleMap extends Component {
  constructor() {
    super();

    this.state = {
      loading: true
    };
    this.positionMap = this.positionMap.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
  }

  positionMap(address) {
    this.setState(prevState => ({ ...prevState, loading: true }));
    this.geocoder = new window.google.maps.Geocoder();
    this.geocoder.geocode({ address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const { location } = results[0].geometry;
        new window.google.maps.Marker({
          map: this.map,
          position: location
        });
        this.map.setCenter(location);
        this.setState(prevState => ({ ...prevState, loading: false }));
      }
    });
  }

  renderMarkers() {
    const { children } = this.props;

    if (!children || !this.props.isScriptLoaded) {
      return null;
    }

    return React.Children.map(children, child => {
      React.cloneElement(child, {
        map: this.map,
        google: window.google
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isScriptLoaded &&
      !this.props.isScriptLoaded &&
      nextProps.isScriptLoadSucceed
    ) {
      this.map = new window.google.maps.Map(this.mapEl, {
        center: { lat: 0, lng: 0 },
        zoom: 12
      });

      this.positionMap(nextProps.address);
    }

    if (nextProps.address !== this.props.address && this.props.isScriptLoaded) {
      positionMap(nextProps.address);
      console.log("fooo");
    }
  }

  render() {
    const mapStyles = {
      width: "100%",
      height: "100%",
      opacity: this.state.loading ? 0 : 1
    };
    return (
      <div className="google-map">
        <div
          ref={mapEl => {
            this.mapEl = mapEl;
          }}
          style={mapStyles}
        >
          {this.renderMarkers()}
          Loading...
        </div>
      </div>
    );
  }
}

export default EnhanceGoogleMap()(GoogleMap);
