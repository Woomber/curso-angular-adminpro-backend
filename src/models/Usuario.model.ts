import mongoose from "mongoose";
const { Schema, model } = mongoose;

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
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.method("toJSON", function () {
  const { __v, _id, ...obj } = this.toObject();

  obj.id = _id;

  return obj;
});

export default model("Usuario", UsuarioSchema);
