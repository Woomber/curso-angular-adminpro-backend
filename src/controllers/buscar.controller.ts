import { Response } from "express";
import { AuthRequest } from "../helpers/AuthRequest";
import { serverError } from "../helpers/Errors";
import { Hospital, Medico, Usuario } from "../models";

export const buscarTodo = async (req: AuthRequest, res: Response) => {
  const { query: encodedQuery } = req.params;

  const query = decodeURIComponent(encodedQuery);

  const docQuery = {
    nombre: new RegExp(query, "i"),
  };

  try {
    const [usuarios, hospitales, medicos] = await Promise.all([
      Usuario.find(docQuery),
      Hospital.find(docQuery),
      Medico.find(docQuery),
    ]);

    res.status(200).json({
      usuarios,
      hospitales,
      medicos,
      query,
    });
  } catch (error) {
    serverError(res, error);
  }
};

export const buscarCollection = async (req: AuthRequest, res: Response) => {
  const { collection, query: encodedQuery } = req.params;

  const query = decodeURIComponent(encodedQuery);

  const docQuery = {
    nombre: new RegExp(query, "i"),
  };

  try {
    let data = [];

    switch (collection) {
      case "medicos":
        data = await Medico.find(docQuery)
          .populate("usuario", "nombre img")
          .populate("hospital", "nombre img");
        break;
      case "hospitales":
        data = await Hospital.find(docQuery).populate("usuario", "nombre img");
        break;
      case "usuarios":
        data = await Usuario.find(docQuery);
        break;
      default:
        return res.status(400).json({ message: "Colección inválida" });
    }

    res.status(200).json({
      resultados: data,
      query,
    });
  } catch (error) {
    serverError(res, error);
  }
};
