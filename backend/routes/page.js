import Express from "express";
import {
  fetchRandomData,
  sortData,
  fetchData,
  Liked,
} from "../controller/Controller.js";

const router = Express.Router();

router.route("/").get(fetchRandomData);
router.route("/:pags").post(sortData);
router.route("/pag/:id").get(fetchData).put(Liked);

export default router;
