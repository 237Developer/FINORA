import passport from "passport";
import initLocalStrategy from "./strategy/localStrategy";
import initGoogleStrategy from "./strategy/googleStrategy";
import { getUserById } from "../db/db";

passport.use("local", initLocalStrategy());
passport.use("google", initGoogleStrategy());

//stocke uniquement l'id de la session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id:string, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
