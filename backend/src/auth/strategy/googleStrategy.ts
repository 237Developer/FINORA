
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { getUserByGoogleId, getUserByEmail, setUserWithGoogle } from "../../db/db";

export default () => {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        const googleId = profile.id;

        if (!email) {
          return done(null, false, { message: "Email non fourni par Google." });
        }

        // 1. Check if user exists by googleId
        let user = await getUserByGoogleId(googleId);
        if (user) {
          return done(null, user);
        }

        // 2. Check if user exists by email
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
          if (existingUser.password) {
            return done(null, false, {
              message: "Ce compte existe déjà avec un mot de passe. Veuillez vous connecter avec votre e-mail et votre mot de passe.",
            });
          } else {
            return done(null, existingUser);
          }
        }

        // 3. Create new user with Google
        const newUser = await setUserWithGoogle(email, googleId);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  );
};
