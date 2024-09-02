import { Response, Request } from "express";
import UserManager from "./manager";
import { UserRequest } from "../../lib/types/auth";
import { ErrorCodes } from "../../lib/constants";

class UserController {
  static async getUser(req: Request, res: Response) {
    try {
      const status = await UserManager.getUser(req as UserRequest);

      res.json({
        data: status,
      });
    } catch (error: any) {
      return res.status(ErrorCodes.BAD_REQUEST).json({
        error: error.message,
      });
    }
  }
}

export default UserController;
