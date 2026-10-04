
import { Router } from "express";
import passport from "../passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  (req, res, next) => {
    passport.authenticate("google", (err: unknown, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        const errorMessage =
          info && info.message
            ? info.message
            : "Erreur lors de l'authentification avec Google.";
        return res.status(401).render("connexion", {
          title: "Gestionnaire de dépenses",
          error: errorMessage,
        });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      });
    })(req, res, next);
  }
);

export default router;
