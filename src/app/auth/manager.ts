import { NextFunction } from "express";
import UserConstants from "../user/constants";
import { User } from "../user/model";
import { LoginRequestBody, SignUpRequestBody } from "./types";
import { getAuthTokens, validatePassword } from "./utils";
import bcrypt from "bcrypt";
import { ErrorCodes } from "../../lib/constants";
import Exception from "../../lib/helpers/Exception";

class AuthManager {
  static async signup(data: SignUpRequestBody, next: NextFunction) {
    try {
      const { email, username, password } = data;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        throw new Exception(
          UserConstants.MESSAGES.USER_ALREADY_REGISTERED,
          ErrorCodes.BAD_REQUEST
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });

      await newUser.save();

      return UserConstants.MESSAGES.SIGN_UP_SUCCESS;
    } catch (error: any) {
      throw new Exception(
        error?.errorMessage || UserConstants.MESSAGES.SIGN_UP_FAILED,
        error?.statusCode || ErrorCodes.BAD_REQUEST
      );
    }
  }

  static async login(data: LoginRequestBody, next: NextFunction) {
    try {
      const { email, password } = data;

      const user = await User.findOne({ email });
      if (!user) {
        throw new Exception(
          UserConstants.MESSAGES.USER_VALIDATION_FAILURE,
          ErrorCodes.BAD_REQUEST
        );
      }

      const isPasswordValid = await validatePassword(password, user.password);

      if (!isPasswordValid) {
        throw new Exception(
          UserConstants.MESSAGES.INVALID_PASSWORD,
          ErrorCodes.UNAUTHORIZED
        );
      }

      const authTokens = await getAuthTokens(user.id);

      return authTokens;
    } catch (error: any) {
      throw new Exception(
        error?.errorMessage || UserConstants.MESSAGES.LOGIN_FAILED,
        error?.statusCode || ErrorCodes.UNAUTHORIZED
      );
    }
  }
}

export default AuthManager;
