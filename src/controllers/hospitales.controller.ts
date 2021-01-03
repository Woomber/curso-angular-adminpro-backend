import { Response } from "express";
import { Hospital } from "../models";
import { AuthRequest } from "../helpers/AuthRequest";
import { serverError } from "../helpers/Errors";

export const getHospitales = async (req: AuthRequest, res: Response) => {
  try {
    const hospitales = await Hospital.find().populate("usuario", "nombre img");

    res.status(200).json(hospitales);
  } catch (error) {
    serverError(res, error);
  }
};
export const createHospital = async (req: AuthRequest, res: Response) => {
  const { nombre, img } = req.body;
  const userId = req.authentication.id;

  try {
    const hospital = new Hospital({ nombre, img, usuario: userId });

    await hospital.save();

    res.status(200).json(hospital);
  } catch (error) {
    serverError(res, error);
  }
};
export const updateHospital = async (req: AuthRequest, res: Response) => {
  res.json({
    message: "PUT Hospitales",
  });
};
export const deleteHospital = async (req: AuthRequest, res: Response) => {
  res.json({
    message: "DELETE Hospitales",
  });
};
