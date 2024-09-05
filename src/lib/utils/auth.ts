import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { UserConstants } from "../constants";

dotenv.config()

export const getAuthTokens = async (user_id: string) => {
  const access = jwt.sign({ userId: user_id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1d",
  });
  const refresh = jwt.sign({ userId: user_id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "7d",
  });

  return { access, refresh };
};

export const validatePassword = async (
  password: string,
  enryptedData: string
) => {
  const isPasswordValid = await bcrypt.compare(password, enryptedData);

  if (!isPasswordValid) {
    throw new Error(UserConstants.MESSAGES.USER_VALIDATION_FAILURE);
  }

  return;
};
