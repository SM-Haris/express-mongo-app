import express from "express";
import AuthController from "./controller";
import validateRequest from "../../middlewares/RequestValidators";
import { loginSchema, userSchema } from "./validationSchemas";
const PREFIX = "/auth";
const router = express.Router();

router.post(
  `${PREFIX}/login`,
  validateRequest(loginSchema),
  AuthController.login
);
router.post(
  `${PREFIX}/signup`,
  validateRequest(userSchema),
  AuthController.signup
);

export default router;
