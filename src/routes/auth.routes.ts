import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validator";
import { login } from "../controllers/auth.controller";

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validarCampos,
  ],
  login
);

export default router;
