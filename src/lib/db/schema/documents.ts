import { 
  pgTable, 
  text, 
  integer, 
  uuid, 
  timestamp 
} from "drizzle-orm/pg-core";
import { notebooks } from "./notebooks";

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  notebookId: uuid("notebook_id")
    .references(() => notebooks.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  fileSize: integer("file_size"),
  
  provider: text("provider", { enum: ["google-drive", "onedrive", "dropbox", "local"] }).notNull(),
  providerFileId: text("provider_file_id").notNull(),
  
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  tokenExpiry: timestamp("token_expiry"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
