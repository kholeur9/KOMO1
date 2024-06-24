CREATE TABLE IF NOT EXISTS "retrait_credit" (
	"id" serial PRIMARY KEY NOT NULL,
	"total_credit_id" integer,
	"quantity" integer DEFAULT 0 NOT NULL,
	"data_forfait" text NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "retrait_credit" ADD CONSTRAINT "retrait_credit_total_credit_id_total_credit_id_fk" FOREIGN KEY ("total_credit_id") REFERENCES "public"."total_credit"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
