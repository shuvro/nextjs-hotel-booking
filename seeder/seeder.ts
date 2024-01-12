import mongoose from "mongoose";
import Room from "../backend/models/room";
import { rooms } from "./data";

import * as dotenv from 'dotenv';
dotenv.config(
    {
      path: '.env.local'
    }
);
const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!, {});
    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("All Rooms are added.");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
