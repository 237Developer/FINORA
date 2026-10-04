import { Router } from "express";
import formattedData from "../../middleware/formattedData";
import setDepenseController from "../../controllers/setDataController";
import getDepenseController from "../../controllers/getDepenseController";
import deleteDepenseController from "../../controllers/deleteDepenseController";

const router = Router();

router.get("/", getDepenseController);

router.post("/", formattedData, setDepenseController);

router.delete("/:id", deleteDepenseController);

export default router;
