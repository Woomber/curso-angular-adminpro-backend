import { Response } from "express";
import { Usuario } from "../models";

export const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google");

  res.status(200).json({
    usuarios,
  });
};

export const createUsuario = async (req, res) => {
  const { email, password, nombre } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        message: "Email ya registrado",
      });
    }

    const usuario = new Usuario(req.body);

    await usuario.save();

    res.status(200).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
