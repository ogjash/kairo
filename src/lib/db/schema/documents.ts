import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

import { notebooks } from "./notebooks";

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size"),
  subjectId: uuid("subject_id")
    .references(() => notebooks.id, {
      onDelete: "cascade",
    })
    .notNull(),
  uploadedAt: timestamp("uploaded_at")
    .defaultNow()
    .notNull(),
});