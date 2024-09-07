  import mongoose, { Schema } from "mongoose";
  import { v4 as uuidv4 } from "uuid";

  const userSchema = new Schema({
    id: {
      type: String,
      default: () => uuidv4(),
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  export const User = mongoose.model("users", userSchema);
