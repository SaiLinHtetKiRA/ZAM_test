import Express from "express";
import { Fetchdata } from "../controller/Controller.js";
const router = Express.Router();

router.route("/").get(Fetchdata);

export default router;
