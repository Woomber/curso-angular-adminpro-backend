import { Schema, model, Model, Document } from "mongoose";

const MedicoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
  },
});

MedicoSchema.method("toJSON", function () {
  const { __v, _id, ...obj } = this.toObject();

  obj.id = _id;

  return obj;
});

export interface MedicoDocument extends Document {
  nombre: string;
  img?: string;
  usuario: Schema.Types.ObjectId;
  hospital: Schema.Types.ObjectId;
}

export interface MedicoModel extends Model<MedicoDocument> {}

export default model<MedicoDocument, MedicoModel>("Medico", MedicoSchema);
