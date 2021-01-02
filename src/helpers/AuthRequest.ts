import { Request } from "express";
import { Token } from "./Token";

export interface AuthRequest extends Request {
  authentication?: Token;
}
