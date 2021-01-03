import { Router } from "express";
import { check } from "express-validator";
import { autenticar } from "../middlewares/authenticate";
import {
  createMedico,
  deleteMedico,
  getMedicos,
  updateMedico,
} from "../controllers/medicos.controller";
import { validarCampos } from "../middlewares/validator";

const router = Router();

router.get("/", [autenticar], getMedicos);
router.post(
  "/",
  [
    autenticar,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("hospital", "El hospital es obligatorio").isMongoId(),
    validarCampos,
  ],
  createMedico
);
router.put("/:id", [autenticar], updateMedico);
router.delete("/:id", [autenticar], deleteMedico);

export default router;
