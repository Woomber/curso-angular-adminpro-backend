import { NextFunction, RequestHandler, Response } from "express";
import { Token } from "../helpers/Token";
import { AuthRequest } from "../helpers/AuthRequest";
import { verificarToken } from "../helpers/jwt";

export const autenticar: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    const payload = verificarToken(token) as Token;

    if (!payload) {
      throw new Error("Token inválido");
    }

    req.authentication = payload;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Not authenticated",
    });
  }
};
