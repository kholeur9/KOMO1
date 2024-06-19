CREATE TABLE IF NOT EXISTS "forfaits_internet" (
	"user_id" uuid,
	"forfait" integer DEFAULT 0 NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "forfaits";