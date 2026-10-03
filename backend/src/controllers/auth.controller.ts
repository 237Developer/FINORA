import { getUserByEmail, setUser } from "../db/db";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";

async function signUpController(req: Request, res: Response) {
  const { email, password } = req.body;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.render("inscription", {
      title: "Gestionnaire de dépenses",
      error: "Cet e-mail est déjà utilisé.",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await setUser(email, hashPassword);
  return res.redirect("/auth");
}


export { signUpController };
