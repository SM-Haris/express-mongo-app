import { ProjectionType } from "mongoose";
import { UserConstants } from "../../lib/constants";
import { User } from "../../lib/models/user";
import { User as UserInterface, UserRequest } from "../../lib/types/auth";

class UserManager {
  static async getUser(req: UserRequest) {
    try {
      const projection: ProjectionType<UserInterface> = {
        _id: 0,
        password: 0,
        __v: 0,
      };

      const user = await User.findOne({ id: req.auth.userId }, projection);

      if (!user) {
        throw new Error(UserConstants.MESSAGES.USER_NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new Error(UserConstants.MESSAGES.FETCHING_USER_FAILED);
    }
  }
}

export default UserManager;
