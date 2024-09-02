import mongoose from "mongoose";

export const DatabaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
  } catch (error) {
    throw new Error(`[ERROR] Database connection failed`);
  }
};
