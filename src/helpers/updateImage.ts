import fs from "fs";
import { Hospital, Medico, Usuario } from "../models";
import { HospitalDocument } from "../models/Hospital.model";
import { MedicoDocument } from "../models/Medico.model";
import { UsuarioDocument } from "../models/Usuario.model";

const deleteOld = async (type: string, oldImg: string) => {
  const oldPath = `./uploads/${type}/${oldImg}`;
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }
};

export const updateImage = async (
  type: string,
  id: string,
  filename: string
) => {
  let item: MedicoDocument | HospitalDocument | UsuarioDocument;

  switch (type) {
    case "medicos":
      item = await Medico.findById(id);
      if (!item) {
        return false;
      }

      deleteOld(type, item.img);

      item.img = filename;
      await item.save();

      break;

    case "hospitales":
      item = await Hospital.findById(id);
      if (!item) {
        return false;
      }

      deleteOld(type, item.img);

      item.img = filename;
      await item.save();
      break;

    case "usuarios":
      item = await Usuario.findById(id);
      if (!item) {
        return false;
      }

      deleteOld(type, item.img);

      item.img = filename;
      await item.save();
      break;
  }

  return true;
};
