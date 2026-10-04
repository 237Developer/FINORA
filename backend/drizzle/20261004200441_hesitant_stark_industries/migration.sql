ALTER TABLE "users" ADD COLUMN "google_id" varchar(255);--> statement-breakpoint
ALTER TABLE "depenses" ALTER COLUMN "date" SET DATA TYPE timestamp with time zone USING "date"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "depenses" ALTER COLUMN "date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "depenses" ALTER COLUMN "date" SET NOT NULL;