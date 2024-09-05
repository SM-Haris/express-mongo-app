import { UserConstants } from "../../lib/constants";
import { User } from "../../lib/models/user";
import { LoginRequestBody, SignUpRequestBody } from "../../lib/types/auth";
import { getAuthTokens, validatePassword } from "../../lib/utils/auth";
import bcrypt from "bcrypt";

class AuthManager {
  static async signup(data: SignUpRequestBody) {
    try {
      const { email, username, password } = data;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      
      if (existingUser) {
        throw new Error(UserConstants.MESSAGES.USER_ALREADY_REGISTERED);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });

      await newUser.save();

      return UserConstants.MESSAGES.SIGN_UP_SUCCESS;
    } catch (error) {
      throw new Error(UserConstants.MESSAGES.SIGN_UP_FAILED);
    }
  }

  static async login(data: LoginRequestBody) {
    try {
      const { email, password } = data;

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(UserConstants.MESSAGES.USER_VALIDATION_FAILURE);
      }

      await validatePassword(password, user.password);

      const authTokens = await getAuthTokens(user.id);

      return authTokens;
    } catch (error) {
      throw new Error(UserConstants.MESSAGES.LOGIN_FAILED);
    }
  }
}

export default AuthManager;
