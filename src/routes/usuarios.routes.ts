import { Router } from "express";
import { check } from "express-validator";
import { autenticar } from "../middlewares/authenticate";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controller";
import { validarCampos } from "../middlewares/validator";

const router = Router();

router.get("/", [autenticar], getUsuarios);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validarCampos,
  ],
  createUsuario
);
router.put(
  "/:id",
  [
    autenticar,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El rol es obligatorio").notEmpty(),
    validarCampos,
  ],
  updateUsuario
);
router.delete("/:id", [autenticar], deleteUsuario);

export default router;
