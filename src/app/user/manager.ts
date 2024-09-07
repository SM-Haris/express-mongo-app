import { ProjectionType } from "mongoose";
import { ErrorCodes } from "../../lib/constants";
import { User } from "./model";
import { User as UserInterface, UserRequest } from "../auth/types";
import { NextFunction } from "express";
import Exception from "../../lib/helpers/Exception";
import UserConstants from "./constants";

class UserManager {
  static async getUser(req: UserRequest, next: NextFunction) {
    try {
      const projection: ProjectionType<UserInterface> = {
        _id: 0,
        password: 0,
        __v: 0,
      };

      const user = await User.findOne({ id: req.auth.userId }, projection);

      if (!user) {
        throw new Exception(
          UserConstants.MESSAGES.USER_NOT_FOUND,
          ErrorCodes.FORBIDDEN
        );
      }

      return user;
    } catch (error) {
      throw new Exception(
        UserConstants.MESSAGES.FETCHING_USER_FAILED,
        ErrorCodes.FORBIDDEN
      );
    }
  }
}

export default UserManager;
