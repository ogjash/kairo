ALTER TABLE "documents" RENAME COLUMN "subject_id" TO "notebook_id";--> statement-breakpoint
ALTER TABLE "documents" RENAME COLUMN "title" TO "name";--> statement-breakpoint
ALTER TABLE "documents" RENAME COLUMN "uploaded_at" TO "created_at";--> statement-breakpoint
ALTER TABLE "documents" DROP CONSTRAINT "documents_subject_id_notebooks_id_fk";
--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "is_default" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "provider" text NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "provider_file_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "access_token" text;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "token_expiry" timestamp;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_notebook_id_notebooks_id_fk" FOREIGN KEY ("notebook_id") REFERENCES "public"."notebooks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN "file_url";--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN "file_type";