import { Router } from "express";
import type { Request, Response } from "express";
import { signUpController } from "../../controllers/auth.controller";
import passport from "../../auth/passport";
import logoutController from "../../controllers/logoutController";
import inscriptionValidator from "../../middleware/inscriptionValidator";
import googleAuthRouter from "../../auth/google";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("connexion", {
    title: "Gestionnaire de dépenses",
  });
});

router.post("/", (req, res, next) => {
  passport.authenticate(
    "local",
    (
      err: unknown,
      user: Express.User | false | null,
      info?: { message?: string },
    ) => {
      if (err) return next(err);

      if (!user) {
        return res.status(401).render("connexion", {
          title: "Gestionnaire de dépenses",
          error: "E-mail ou mot de passe incorrect.",
        });
      }

      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      });
    },
  )(req, res, next);
});

router.get("/sign-up", (req: Request, res: Response) => {
  res.render("inscription", {
    title: "Gestionnaire de dépenses",
  });
});

router.post("/sign-up", inscriptionValidator, signUpController);

router.get("/log-out", logoutController);

router.use("/google", googleAuthRouter);

export default router;
