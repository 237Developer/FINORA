import {
  pgTable,
  varchar,
  json,
  timestamp,
  integer,
  index,
  foreignKey,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const depenses = pgTable("depenses", {
  id: varchar({ length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => users.id),
  description: varchar({ length: 255 }),
  montant: integer(),
  category: varchar({ length: 40 }),
  date: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const session = pgTable(
  "session",
  {
    sid: varchar().primaryKey(),
    sess: json().notNull(),
    expire: timestamp({ precision: 6 }).notNull(),
  },
  (table) => [
    index("IDX_session_expire").using("btree", table.expire.asc().nullsLast()),
  ],
);

export const users = pgTable("users", {
  id: varchar({ length: 255 }).primaryKey(),
  emailAdress: varchar("email_adress", { length: 255 }),
  password: varchar({ length: 255 }),
});
