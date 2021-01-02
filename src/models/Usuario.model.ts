import { Schema, model, Model, Document } from "mongoose";

export enum UsuarioRole {
  user = "USER_ROLE",
  admin = "ADMIN_ROLE",
}

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: UsuarioRole.admin,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.method("toJSON", function () {
  const { __v, _id, password, ...obj } = this.toObject();

  obj.id = _id;

  return obj;
});

export interface UsuarioDocument extends Document {
  nombre: string;
  email: string;
  password: string;
  img?: string;
  role: UsuarioRole;
  google: boolean;
}

export interface UsuarioModel extends Model<UsuarioDocument> {}

export default model<UsuarioDocument, UsuarioModel>("Usuario", UsuarioSchema);
