import scriptLoader from "react-async-script-loader";
import config from "../../config";

const EnhanceGoogleMap = () =>
  scriptLoader(`https://maps.googleapis.com/maps/api/js?key=${config.googleMaps.apiKey}`);

export default EnhanceGoogleMap;
