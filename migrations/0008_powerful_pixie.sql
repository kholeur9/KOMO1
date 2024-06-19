CREATE TABLE IF NOT EXISTS "total_credit" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"total_credit" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "total_credit" ADD CONSTRAINT "total_credit_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
