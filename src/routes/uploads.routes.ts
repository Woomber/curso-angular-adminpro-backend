import { Router } from "express";
import { autenticar } from "../middlewares/authenticate";
import { upload } from "../controllers/uploads.controller";
import fileUpload from "express-fileupload";

const router = Router();

router.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);

router.put("/:collection/:id", [autenticar], upload);

export default router;
