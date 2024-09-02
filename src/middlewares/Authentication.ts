import { expressjwt } from "express-jwt";

const authenticate = expressjwt({
  secret: "your-secret-key",
  algorithms: ["HS256"],
});

export default authenticate;
