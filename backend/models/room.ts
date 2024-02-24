import mongoose, {Document, Schema} from "mongoose";
// import geoCoder from "../utils/geoCoder";
import {IUser} from "./user";
import axios from "axios";

export interface IImage extends Document {
  public_id: string;
  url: string;
}

export interface IReview extends Document {
  user: IUser;
  name: string;
  rating: number;
  comment: string;
}

export interface ILocation {
  type: string;
  coordinates: number[];
  formattedAddress: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

export interface IRoom extends Document {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILocation;
  guestCapacity: number;
  numOfBeds: number;
  isInternet: boolean;
  isBreakfast: boolean;
  isAirConditioned: boolean;
  isPetsAllowed: boolean;
  isRoomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  images: IImage[];
  category: string;
  reviews: IReview[];
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema: Schema<IRoom> = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a room name"],
    trim: true,
    maxLength: [200, "Room name cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter a room description"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter a room price"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please enter a room address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter a room guest capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter a room number of beds"],
  },
  isInternet: {
    type: Boolean,
    default: false,
  },
  isBreakfast: {
    type: Boolean,
    default: false,
  },
  isAirConditioned: {
    type: Boolean,
    default: false,
  },
  isPetsAllowed: {
    type: Boolean,
    default: false,
  },
  isRoomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please enter room category"],
    enum: {
      values: ["King", "Single", "Twins"],
      message: "Please select correct category for room",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

function parseMapQuestResponse(response: any) {
  // Check if the response is successful and contains locations
  if (response.results[0].locations.length > 0) {
    const loc = response.results[0].locations[0]; // First location in the response

    // Create the location object with the desired structure
    return {
      type: "Point",
      coordinates: [loc.latLng.lng, loc.latLng.lat], // MapQuest uses 'latLng' with 'lng' and 'lat' properties
      formattedAddress: loc.street ? `${loc.street}, ${loc.adminArea5}, ${loc.adminArea3}, ${loc.adminArea1}` : '',
      city: loc.adminArea5, // 'adminArea5' is typically the city
      state: loc.adminArea3, // 'adminArea3' is typically the state code
      zipcode: loc.postalCode, // 'postalCode' is the zipcode
      country: loc.adminArea1 // 'adminArea1' is typically the country code
    };
  } else {
    // Handle cases where the response does not contain location data
    console.error("No locations found or bad response", response.info.messages);
    return {} as ILocation;
  }
}

// setting up location

roomSchema.pre<IRoom>("save", async function (next) {
  const address = this.address;
  if (!this.isNew && !this.isModified('address')) {
    return next();
  }
  const response = await axios.get(`http://www.mapquestapi.com/geocoding/v1/address`, {
    params: {
      key:  process.env.GEOCODER_API_KEY, // Replace with your API key
      location: address,
    }
  });

  console.log(response.data.results[0].locations)

  // const loc = await geoCoder.geocode(address);

  // this.location = {
  //   type: "Point",
  //   coordinates: [loc[0].longitude, loc[0].latitude],
  //   formattedAddress: loc[0].formattedAddress,
  //   city: loc[0].city,
  //   state: loc[0].stateCode,
  //   zipcode: loc[0].zipcode,
  //   country: loc[0].countryCode,
  // };

  this.location = parseMapQuestResponse(response.data);
});

export default mongoose.models.Room ||
  mongoose.model<IRoom>("Room", roomSchema);
