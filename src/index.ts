import "dotenv/config";
import express from "express";
import { connect } from "./db/config";
import cors from "cors";
import Routes from "./routes";

const app = express();
app.use(cors());

// Leer body json
app.use(express.json());

connect();

// Rutas
app.use("/api/usuarios", Routes.usuarios);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en puerto ${port}`);
});
