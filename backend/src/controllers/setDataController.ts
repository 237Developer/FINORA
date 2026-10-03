import { getAllDepenseForAUser, setDepense } from "../db/db";
import type { Request, Response } from "express";

export default async function setDepenseController(
  req: Request,
  res: Response,
) {
  if (!req.user) {
    res.redirect("/auth");
    return;
  }

  const reqData = req.body;
  await setDepense(reqData, req.user.id);
  const resData = await getAllDepenseForAUser(req.user!.id);
  res.json(resData);
}
