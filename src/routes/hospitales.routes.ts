import { Router } from "express";
import { check } from "express-validator";
import { autenticar } from "../middlewares/authenticate";
import {
  createHospital,
  deleteHospital,
  getHospitales,
  updateHospital,
} from "../controllers/hospitales.controller";
import { validarCampos } from "../middlewares/validator";

const router = Router();

router.get("/", [autenticar], getHospitales);
router.post(
  "/",
  [
    autenticar,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  createHospital
);
router.put("/:id", [autenticar], updateHospital);
router.delete("/:id", [autenticar], deleteHospital);

export default router;
