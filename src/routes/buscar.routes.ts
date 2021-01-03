import { Router } from "express";
import { autenticar } from "../middlewares/authenticate";
import { buscarTodo, buscarCollection } from "../controllers/buscar.controller";

const router = Router();

router.get("/:query", [autenticar], buscarTodo);
router.get("/:collection/:query", [autenticar], buscarCollection);

export default router;
