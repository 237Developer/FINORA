import type { Request, Response, NextFunction } from "express";

export default function logoutController(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}
