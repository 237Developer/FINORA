import db from "./pool";
import generateRandomId from "../utils/generateRandomId";
import { Depense } from "../types/Depense";
import { User } from "../types/User";
import { depenses, users } from "./schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { getDateRangeByFrequency } from "../utils/dateUtils";

//Gestion des dépenses.

async function getDepensesByFrequency(
  userId: string,
  frequency?: string,
  startDate?: string,
  endDate?: string,
): Promise<Depense[]> {
  const { start, end } = getDateRangeByFrequency(frequency, startDate, endDate);

  const rows = await db
    .select()
    .from(depenses)
    .where(
      and(
        eq(depenses.userId, userId),
        gte(depenses.date, start),
        lte(depenses.date, end),
      ),
    );

  return rows.map((row) => ({
    id: row.id,
    user_id: row.userId!,
    description: row.description!,
    montant: row.montant!,
    category: row.category!,
    date: new Date(row.date!),
  }));
}

async function getDataById(id: string): Promise<Depense | undefined> {
  const row = await db.query.depenses.findFirst({ where: { id } });
  return (
    row && {
      id: row.id,
      user_id: row.userId!,
      description: row.description!,
      montant: row.montant!,
      category: row.category!,
      date: new Date(row.date!),
    }
  );
}

async function setDepense(depense: Depense, userId: string) {
  const depenseId = generateRandomId();
  await db.insert(depenses).values({
    id: depenseId,
    userId,
    description: depense.description,
    montant: depense.montant,
    category: depense.category,
    date: new Date(depense.date!),
  });
}

async function deleteDepense(id: string, userId: string) {
  await db
    .delete(depenses)
    .where(and(eq(depenses.id, id), eq(depenses.userId, userId)));
}

//Gestion des utilisateurs.

async function getUserByEmail(email: string): Promise<User | undefined> {
  const user = await db.query.users.findFirst({
    where: { emailAdress: email },
  });
  return (
    user && {
      id: user.id,
      email_adress: user.emailAdress!,
      password: user.password!,
      google_id: user.googleId,
    }
  );
}
async function getUserById(id: string): Promise<User | undefined> {
  const user = await db.query.users.findFirst({ where: { id } });
  return (
    user && {
      id: user.id,
      email_adress: user.emailAdress!,
      password: user.password!,
      google_id: user.googleId,
    }
  );
}
async function getUserByGoogleId(googleId: string): Promise<User | undefined> {
  const user = await db.query.users.findFirst({
    where: { googleId },
  });
  return (
    user && {
      id: user.id,
      email_adress: user.emailAdress!,
      password: user.password!,
      google_id: user.googleId,
    }
  );
}
async function setUser(email: string, passwordHash: string) {
  const userId = generateRandomId();
  await db.insert(users).values({
    id: userId,
    emailAdress: email,
    password: passwordHash,
  });
}
async function setUserWithGoogle(email: string, googleId: string): Promise<User> {
  const userId = generateRandomId();
  await db.insert(users).values({
    id: userId,
    emailAdress: email,
    googleId: googleId,
  });
  return {
    id: userId,
    email_adress: email,
    google_id: googleId,
  };
}
export {
  getDepensesByFrequency,
  getDataById,
  setDepense,
  deleteDepense,
  getUserByEmail,
  getUserById,
  getUserByGoogleId,
  setUser,
  setUserWithGoogle,
};
