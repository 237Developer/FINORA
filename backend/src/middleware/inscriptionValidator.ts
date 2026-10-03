import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";

const validations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("l'email est requis")
    .isEmail()
    .withMessage("format d'email invalide"),
  body("password")
    .notEmpty()
    .withMessage("le mot de passe est requis")
    .isLength({ min: 8 })
    .withMessage("le mot de passe doit avoir au moins 8 caractères")
    .custom((value) => {
      const hasNumber = /\d/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      if (!hasNumber || !hasUpper) {
        throw new Error(
          "le mot de passe doit contenir au moins un chiffre et une majuscule",
        );
      }
      return true;
    }),
  body("confirmPassword")
    .notEmpty()
    .withMessage("les mots de passe ne correspondent pas")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("les mots de passe ne correspondent pas");
      }
      return true;
    }),
  body("terms").notEmpty().withMessage("vous devez accepter les conditions"),
];

export default [
  ...validations,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).render("inscription", {
        title: "Gestionnaire de dépenses",
        error: firstError,
      });
    }

    next();
  },
];
