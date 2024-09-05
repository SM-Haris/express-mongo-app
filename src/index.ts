import express, { Express, ErrorRequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DatabaseConnection } from "./lib/helpers/Database";
import router from "./routes";
import logger from "./lib/helpers/Logger";

dotenv.config();

const port = process.env.PORT || 8000;
const app: Express = express();

const corsOptions = {
  origin: process.env.CORS_URL?.split(","),
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  logger.info(
    `METHOD:${req?.method}  URL:${req?.url}  HOSTNAME:${req?.hostname}  IP:${req.ip}`
  );
  next();
});

app.use(router);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(
    `ERROR:${err.message} METHOD:${req?.method}  URL:${req?.url}  HOSTNAME:${req?.hostname}  IP:${req.ip}`
  );
  if (err.name === "UnauthorizedError") {
    res.status(403).send({ ...err, status: 403 });
  } else {
    res.status(err.status || 500).send({
      status: err.status,
      message: err.message,
    });
  }
};

app.use(errorHandler);

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
