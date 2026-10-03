import express from "express";
import dataRouteur from "./routes/dataRoutes/index.routes";
import authRouteur from "./routes/authRoutes/index.routes";
import path from "path";
const app = express();
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { Pool } from "pg";
import passport from "./auth/passport";
import isAuthenticated from "./middleware/auth.middleware";
import type { Request, Response, NextFunction } from "express";

const pgSessionStore = connectPgSimple(session);

app.use(
  session({
    store: new pgSessionStore({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL!,
      }),
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: "gestionnaireDepense",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(passport.session());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouteur);

app.use(isAuthenticated, express.static(path.join(__dirname, "../../dist")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const APP_HOST = process.env.APP_HOST || "0.0.0.0";
const PORT = Number(process.env.PORT) || 3000;

app.use("/data", isAuthenticated, dataRouteur);

type AppError = Error & {
  statusCode?: number;
  name?: string;
};

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json(err.message);
});

app.listen(PORT, APP_HOST, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`le serveur tourne sur ${APP_HOST}:${PORT}`);
});
