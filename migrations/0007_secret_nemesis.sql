CREATE TABLE IF NOT EXISTS "credits" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"forfait_id" integer,
	"credit" integer DEFAULT 0 NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credits" ADD CONSTRAINT "credits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credits" ADD CONSTRAINT "credits_forfait_id_forfaits_internet_id_fk" FOREIGN KEY ("forfait_id") REFERENCES "public"."forfaits_internet"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
