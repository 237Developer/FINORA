import { getDepensesByFrequency } from "../db/db";
import type { Request, Response } from "express";

export default async function getDepenseController(
  req: Request,
  res: Response,
): Promise<void> {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const frequency = (req.query.frequency as string) || "cettesemaine";
  const startDate = req.query.startDate as string | undefined;
  const endDate = req.query.endDate as string | undefined;

  const depenses = await getDepensesByFrequency(
    req.user.id,
    frequency,
    startDate,
    endDate,
  );

  res.json({
    user: {
      email: req.user.email_adress,
    },
    depenses,
  });
}
