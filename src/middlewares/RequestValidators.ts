import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

interface ValidationResult {
  error: Joi.ValidationError | null;
  value: any;
}

function validateRequest(schema: Joi.Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    req.body = value;
    next();
  };
}

export default validateRequest;