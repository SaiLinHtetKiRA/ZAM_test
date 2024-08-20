import Express from "express";
import { Create, Upload, CreateTags } from "../controller/Controller.js";
import multer from "multer";
import formidable from "express-formidable";
const router = Express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route("/").post(upload.array("posters"), Upload, Create);
router.route("/:tags").post(CreateTags);

export default router;
