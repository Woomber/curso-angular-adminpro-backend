import { Request, Response } from "express";
import { Usuario } from "../models";
import bcrypt from "bcryptjs";
import { generarToken } from "../helpers/jwt";
import { serverError } from "../helpers/Errors";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    // Email

    if (!usuario) {
      return res.status(403).json({
        message: "Usuario o contraseña incorrectos",
      });
    }

    // Password
    if (!bcrypt.compareSync(password, usuario.password)) {
      return res.status(403).json({
        message: "Usuario o contraseña incorrectos",
      });
    }

    // Token
    const token = await generarToken(usuario.id);

    res.status(200).json({
      token,
    });
  } catch (error) {
    serverError(res, error);
  }
};
