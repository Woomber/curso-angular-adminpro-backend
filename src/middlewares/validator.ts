import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";

export const validarCampos: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Errores de validación",
      errors: errors.mapped(),
    });
  }

  next();
};
