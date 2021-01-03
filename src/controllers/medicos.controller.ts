import { Response } from "express";
import { AuthRequest } from "../helpers/AuthRequest";
import { serverError } from "../helpers/Errors";
import { Medico } from "../models";

export const getMedicos = async (req: AuthRequest, res: Response) => {
  try {
    const medicos = await Medico.find()
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre img");

    res.status(200).json(medicos);
  } catch (error) {
    serverError(res, error);
  }
};
export const createMedico = async (req: AuthRequest, res: Response) => {
  const { nombre, img, hospital } = req.body;
  const userId = req.authentication.id;

  try {
    const medico = new Medico({ nombre, img, hospital, usuario: userId });

    await medico.save();

    res.status(200).json(medico);
  } catch (error) {
    serverError(res, error);
  }
};
export const updateMedico = async (req: AuthRequest, res: Response) => {
  res.json({
    message: "PUT Medicos",
  });
};
export const deleteMedico = async (req: AuthRequest, res: Response) => {
  res.json({
    message: "DELETE Medicos",
  });
};
