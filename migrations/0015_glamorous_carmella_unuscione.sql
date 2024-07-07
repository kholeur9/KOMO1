ALTER TABLE "session" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "user_id" DROP NOT NULL;