import React, { Component } from "react";
import EnhanceGoogleMap from "./EnhanceGoogleMap";

// TODO for FC : use react-intl
class GoogleMap extends Component {
  constructor() {
    super();

    this.state = {
      loading: true
    };

    this.mapEl = null;
    this.map = null;
    this.mapCenter = null;
    this.googleMaps = null;
    this.markers = null;

    // this.positionMap = this.positionMap.bind(this);
    // this.renderMarkers = this.renderMarkers.bind(this);
    // this.fitMap = this.fitMap.bind(this);
    // this.renderMap = this.renderMap.bind(this);
  }

  positionMap(address) {
    this.setState(prevState => ({ ...prevState, loading: true }));
    this.geocoder = new this.googleMaps.Geocoder();
    this.geocoder.geocode({ address }, (results, status) => {
      if (status === this.googleMaps.GeocoderStatus.OK) {
        const { location } = results[0].geometry;
        this.mapCenter = new this.googleMaps.Marker({
          map: this.map,
          position: location
        });
        this.map.setCenter(location);
        this.setState(prevState => ({ ...prevState, loading: false }));
      }
    });
  }

  renderMarkers(markers) {
    this.markers = markers.map(
      marker =>
        new this.googleMaps.Marker({
          map: this.map,
          position: marker.position
        })
    );
  }

  fitMap() {
    const mapBounds = new this.googleMaps.LatLngBounds();
    this.markers.forEach(marker => {
      mapBounds.extend(marker.position);
    });
    this.map.fitBounds(mapBounds);
  }

  renderMap(address, markers) {
    this.positionMap(address);
    this.renderMarkers(markers);
    this.fitMap();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.googleMaps && nextProps.googleMaps) {
      this.googleMaps = nextProps.googleMaps;
      this.map = new this.googleMaps.Map(this.mapEl, {
        center: { lat: 0, lng: 0 },
        zoom: 12
      });

      this.renderMap(nextProps.address, nextProps.markers);
    }

    if (nextProps.address !== this.props.address && this.googleMaps) {
      positionMap(nextProps.address);
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
          Loading...
        </div>
      </div>
    );
  }
}

export default EnhanceGoogleMap()(GoogleMap);
