import { Request, Response } from "express";
import { Usuario } from "../models";
import bcrypt from "bcryptjs";
import { generarToken } from "../helpers/jwt";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.find({}, "nombre email role google");

  res.status(200).json({
    usuarios,
  });
};

export const createUsuario = async (req: Request, res: Response) => {
  const { email, password, nombre } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        message: "Email ya registrado",
      });
    }

    const salt = bcrypt.genSaltSync();

    const usuario = new Usuario({
      email,
      nombre,
      password: bcrypt.hashSync(password, salt),
    });

    await usuario.save();

    const token = await generarToken(usuario.id);

    res.status(200).json({
      usuario,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { password, google, email, ...fields } = req.body;

  // TODO: Validar token

  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({
        message: "No encontrado",
      });
    }

    if (usuario.email !== email) {
      const existeEmail = await Usuario.findOne({ email });

      if (existeEmail) {
        return res.status(400).json({
          message: "Email ya registrado",
        });
      }
    }

    fields.email = email;

    const newData = await Usuario.findByIdAndUpdate(usuario.id, fields, {
      new: true,
    });

    res.status(200).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({
        message: "No encontrado",
      });
    }

    await Usuario.findByIdAndDelete(id);

    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
