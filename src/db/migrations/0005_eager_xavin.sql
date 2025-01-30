ALTER TABLE "product" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN "updated_at";