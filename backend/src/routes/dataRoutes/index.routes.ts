import { Router } from "express";
import type { Request, Response } from "express";
import formattedData from "../../middleware/formattedData";
import setDepenseController from "../../controllers/setDataController";
import { getAllDepenseForAUser } from "../../db/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const depenses = await getAllDepenseForAUser(req.user!.id);

  res.json({
    user: {
      email: req.user!.email_adress,
    },
    depenses,
  });
});

router.post("/", formattedData, setDepenseController);

export default router;
