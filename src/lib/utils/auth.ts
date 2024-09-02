import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getAuthTokens = async (user_id: string) => {
  const access = jwt.sign({ userId: user_id }, "your-secret-key", {
    expiresIn: "1h",
  });
  const refresh = jwt.sign({ userId: user_id }, "your-secret-key", {
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
    throw new Error("No active user with these credentials exists");
  }

  return;
};
