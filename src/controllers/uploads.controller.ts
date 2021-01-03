import { Response } from "express";
import { AuthRequest } from "../helpers/AuthRequest";
import { serverError } from "../helpers/Errors";
import { Hospital, Medico, Usuario } from "../models";
import { v4 as uuidv4 } from "uuid";
import { UploadedFile } from "express-fileupload";
import { updateImage } from "../helpers/updateImage";

export const upload = async (req: AuthRequest, res: Response) => {
  const { collection, id } = req.params;

  const coleccionesValidas = ["hospitales", "medicos", "usuarios"];
  if (!coleccionesValidas.includes(collection)) {
    return res.status(400).json({ message: "Colección inválida" });
  }

  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  try {
    const file = req.files.imagen as UploadedFile;
    const explodedFileName = file.name.split(".");
    const ext = explodedFileName[explodedFileName.length - 1];

    const extValidas = ["png", "jpg", "gif", "jpeg"];
    if (!extValidas.includes(ext)) {
      return res
        .status(400)
        .json({ message: "Extensión de archivo no permitida" });
    }

    const filename = `${uuidv4()}.${ext}`;

    const path = `./uploads/${collection}/${filename}`;

    file.mv(path, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al mover imagen" });
      }

      updateImage(collection, id, filename);

      return res.json({ filename });
    });
  } catch (error) {
    serverError(res, error);
  }
};
