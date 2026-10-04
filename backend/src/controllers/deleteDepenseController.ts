import { deleteDepense, getDepensesByFrequency } from "../db/db";
import type { Request, Response } from "express";

export default async function deleteDepenseController(
  req: Request,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const id = req.params.id as string;
  await deleteDepense(id, req.user.id);

  const frequency =
    (req.query.frequency as string) ||
    (req.body.frequency as string) ||
    "cettesemaine";

  const depenses = await getDepensesByFrequency(req.user.id, frequency);
  res.json({
    user: {
      email: req.user.email_adress,
    },
    depenses,
  });
}
