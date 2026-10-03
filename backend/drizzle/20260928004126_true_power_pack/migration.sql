CREATE TABLE "depenses" (
	"id" varchar(255),
	"user_id" varchar(255),
	"description" varchar(255),
	"montant" integer,
	"category" varchar(40),
	"date" date
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sid" varchar PRIMARY KEY,
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY,
	"email_adress" varchar(255),
	"password" varchar(255)
);
--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "session" ("expire");--> statement-breakpoint
ALTER TABLE "depenses" ADD CONSTRAINT "depenses_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");