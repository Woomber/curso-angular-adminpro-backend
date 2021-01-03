import { Schema, model, Model, Document } from "mongoose";

const HospitalSchema = new Schema(
  {
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
  },
  {
    collection: "hospitales",
  }
);

HospitalSchema.method("toJSON", function () {
  const { __v, _id, ...obj } = this.toObject();

  obj.id = _id;

  return obj;
});

export interface HospitalDocument extends Document {
  nombre: string;
  img?: string;
  usuario: Schema.Types.ObjectId;
}

export interface HospitalModel extends Model<HospitalDocument> {}

export default model<HospitalDocument, HospitalModel>(
  "Hospital",
  HospitalSchema
);
