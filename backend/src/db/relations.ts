import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	depenses: {
		user: r.one.users({
			from: r.depenses.userId,
			to: r.users.id
		}),
	},
	users: {
		depenses: r.many.depenses(),
	},
}))