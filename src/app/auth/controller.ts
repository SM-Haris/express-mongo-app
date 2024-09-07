import { NextFunction, Request, Response } from "express";
import AuthManager from "./manager";
import { LoginRequestBody } from "./types";
import { ErrorCodes } from "../../lib/constants";
import Exception from "../../lib/helpers/Exception";
import UserConstants from "../user/constants";

class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthManager.signup(req.body, next);

      res.status(200).json({
        message: data,
      });
    } catch (error: any) {
      next(
        new Exception(
          error?.errorMessage || UserConstants.MESSAGES.SIGN_UP_FAILED,
          error?.statusCode || ErrorCodes.BAD_REQUEST
        )
      );
    }
  }

  static async login(
    req: Request<{}, {}, LoginRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await AuthManager.login(req.body, next);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      next(
        new Exception(
          error?.errorMessage || UserConstants.MESSAGES.LOGIN_FAILED,
          error?.statusCode || ErrorCodes.UNAUTHORIZED
        )
      );
    }
  }
}
export default AuthController;
