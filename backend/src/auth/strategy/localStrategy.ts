import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../../db/db";

export default () => {
  return new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await getUserByEmail(email);
        if (!user) {
          return done(null, false);
        }
        if (!await bcrypt.compare(password, user.password)) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  );
};
