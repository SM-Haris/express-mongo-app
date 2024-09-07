import { Response, Request, NextFunction } from "express";
import UserManager from "./manager";
import { UserRequest } from "../auth/types";
import { ErrorCodes } from "../../lib/constants";
import Exception from "../../lib/helpers/Exception";
import UserConstants from "./constants";

class UserController {
  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const status = await UserManager.getUser(req as UserRequest, next);

      res.json({
        data: status,
      });
    } catch (error: any) {
      next(
        new Exception(
          error?.errorMessage || UserConstants.MESSAGES.FETCHING_USER_FAILED,
          error?.statusCode || ErrorCodes.FORBIDDEN
        )
      );
    }
  }
}

export default UserController;
