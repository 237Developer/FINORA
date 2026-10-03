import db from "./pool";
import generateRandomId from "../utils/generateRandomId";
import { Depense } from "../types/Depense";
import { User } from "../types/User";
import { depenses, users } from "./schema";

//Gestion des dépenses.

async function getAllDepenseForAUser(userId: string): Promise<Depense[]> {
  const rows = await db.query.depenses.findMany({ where: { userId } });
  console.log(rows)
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
export {
  getAllDepenseForAUser,
  getDataById,
  setDepense,
  getUserByEmail,
  getUserById,
  setUser,
};
