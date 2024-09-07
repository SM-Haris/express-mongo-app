import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import Exception from "../lib/helpers/Exception";
import { ErrorCodes } from "../lib/constants";

function validateRequest(schema: Joi.Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      next(new Exception(error.details[0].message, ErrorCodes.BAD_REQUEST));
    }

    req.body = value;
    next();
  };
}

export default validateRequest;
