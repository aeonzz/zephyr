CREATE TYPE "public"."category" AS ENUM('Men', 'Women', 'Unisex', 'Kids');--> statement-breakpoint
CREATE TYPE "public"."color" AS ENUM('Black', 'White');--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "category" "category" NOT NULL;