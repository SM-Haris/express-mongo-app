import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: "info", // Set the log level (info, debug, warn, error, etc.)
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new DailyRotateFile({
      filename: "logs/audit-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m", // Maximum size of each log file
      maxFiles: "4d", // Maximum number of days to keep log files
      level: "info", // Log only info level messages to this file
    }),
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "4d",
      level: "error", // Log only errors to this file
    }),
  ],
});

export default logger;
