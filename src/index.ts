import "dotenv/config";
import express from "express";
import { connect } from "./db/config";
import cors from "cors";
import * as Routes from "./routes";

const app = express();
app.use(cors());

// Leer body json
app.use(express.json());

connect();

// Rutas
app.use("/api/usuarios", Routes.usuarios);
app.use("/api/auth", Routes.auth);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en puerto ${port}`);
});
