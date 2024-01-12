import * as NodeGeocoder from "node-geocoder";

//const NodeGeocoder = require("node-geocoder");
import * as dotenv from 'dotenv';
dotenv.config(
    {
      path: '.env.local'
    }
);
const options: NodeGeocoder.Options = {
  provider: process.env.GEOCODER_PROVIDER as NodeGeocoder.Providers,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geoCoder = NodeGeocoder(options);

export default geoCoder;
