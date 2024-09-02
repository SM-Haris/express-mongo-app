import express from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";

const router = express.Router();

router.use("/api", UserRouter);
router.use("/api", AuthRouter);

export default router;
