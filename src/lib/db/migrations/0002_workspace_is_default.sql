ALTER TABLE "workspaces" ADD COLUMN IF NOT EXISTS "is_default" boolean DEFAULT false NOT NULL;
