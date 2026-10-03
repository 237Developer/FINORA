import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";
import CustomBadRequestError from "../errors/CustomBadRequestError";

const Validations = [
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Le champ 'category' est obligatoire.")
    .isString()
    .withMessage("Le champ 'category' doit être une chaîne de caractères."),
  body("montant")
    .trim()
    .notEmpty()
    .withMessage("Le champ 'montant' est obligatoire.")
    .isFloat({ min: 0 })
    .withMessage("Le champ 'montant' doit être un nombre positif."),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Le champ 'description' est obligatoire.")
    .isString()
    .withMessage("Le champ 'description' doit être une chaîne de caractères."),
];

export default [
  ...Validations,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        new CustomBadRequestError(errors.array().map((err) => err.msg)[0]),
      );
    }

    next();
  },
];
