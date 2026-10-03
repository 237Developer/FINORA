ALTER TABLE "depenses"
ALTER COLUMN "date" SET DATA TYPE timestamp with time zone
USING "date"::timestamp AT TIME ZONE 'UTC';

ALTER TABLE "depenses"
ALTER COLUMN "date" SET DEFAULT now(),
ALTER COLUMN "date" SET NOT NULL;
