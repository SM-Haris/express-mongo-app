import express, {
  Express,
  NextFunction,
  Response,
  Request,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import { DatabaseConnection } from "./lib/helpers/Database";
import router from "./routes";

dotenv.config();

const port = process.env.PORT || 8000;
const app: Express = express();

const corsOptions = {
  origin: process.env.CORS_URL?.split(","),
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(403).send({ ...err, status: 403 });
  } else {
    next(err);
  }
};

app.use(errorHandler);

app.use(function (err: any, req: Request, res: Response, _next: NextFunction) {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`[INFO] Server is listening at http://localhost:${port}`);
});

const startServer = async () => {
  try {
    console.log("[INFO] Connecting to Database...");
    await DatabaseConnection();
    console.log("[INFO] Database connected");
  } catch (error: any) {
    console.log(`[ERROR] ${error.message}`);
  }
};

startServer();
