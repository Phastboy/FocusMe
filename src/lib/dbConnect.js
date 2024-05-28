// src/lib/connectDb.js
import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.DB_URL) {
    throw new Error("Please provide a valid database URL");
  }

  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  try {
    await mongoose.connect(process.env.DB_URL);
    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    isConnected = false;
    process.exit(1);
  }
};
