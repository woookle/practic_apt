import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("-- Practic APT --");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
