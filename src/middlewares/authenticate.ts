import { NextFunction, Request, RequestHandler, Response } from "express";
import { verificarToken } from "../helpers/jwt";

export const autenticar: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    const payload = verificarToken(token);

    if (!payload) {
      throw new Error("Token inválido");
    }

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Not authenticated",
    });
  }
};
