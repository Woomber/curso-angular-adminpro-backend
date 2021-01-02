import jwt from "jsonwebtoken";
import { Token } from "./Token";

const jwtSecret = process.env.JWT_SECRET || "secret_key";

export const generarToken = (id: string) => {
  const payload: Token = { id };
  try {
    return jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const verificarToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSecret) as Token;
  } catch (error) {
    return null;
  }
};
