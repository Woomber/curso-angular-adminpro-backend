import { Response } from "express";

export const serverError = (res: Response, message: any) => {
  console.error(message);
  res.status(500).json({
    message: "Error del servidor",
  });
};
