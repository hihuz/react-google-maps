import { compose, withProps } from "recompose";
import scriptLoader from "react-async-script-loader";
import config from "../../config";

const EnhanceGoogleMap = () =>
  compose(
    scriptLoader(
      `https://maps.googleapis.com/maps/api/js?key=${config.googleMaps.apiKey}`
    ),
    withProps(props => ({
      googleMaps: props.isScriptLoaded &&
        props.isScriptLoadSucceed &&
        window.google.maps
    }))
  );

export default EnhanceGoogleMap;
