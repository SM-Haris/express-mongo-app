import { Request, Response } from "express";
import AuthManager from "./manager";
import { LoginRequestBody } from "../../lib/types/auth";
import { ErrorCodes } from "../../lib/constants";

class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const data = await AuthManager.signup(req.body);

      res.status(200).json({
        message: data,
      });
    } catch (error: any) {
      res.status(ErrorCodes.BAD_REQUEST).json({
        error: error.message,
      });
    }
  }

  static async login(req: Request<{}, {}, LoginRequestBody>, res: Response) {
    try {
      const user = await AuthManager.login(req.body);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(ErrorCodes.UNAUTHORIZED).json({
        error: error.message,
      });
    }
  }
}
export default AuthController;
