ALTER TABLE "product" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "color" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN "size";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN "material";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN "quantity";--> statement-breakpoint
DROP TYPE "public"."color";