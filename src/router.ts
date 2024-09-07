import express from "express";
import UserRouter from "./app/user/routes";
import AuthRouter from "./app/auth/routes";

const router = express.Router();

router.use("/api", UserRouter);
router.use("/api", AuthRouter);

export default router;
