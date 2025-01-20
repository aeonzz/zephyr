ALTER TABLE "user" ADD COLUMN "emailVerified" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "email_verified";