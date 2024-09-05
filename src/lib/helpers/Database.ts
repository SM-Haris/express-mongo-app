import mongoose from "mongoose";
import { ErrorMessages } from "../constants";

export const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
  } catch (error) {
    throw new Error(ErrorMessages.MESSAGES.DATABASE_CONNECTION_ERROR);
  }
};
