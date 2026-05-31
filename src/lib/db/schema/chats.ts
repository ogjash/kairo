import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { notebooks } from "./notebooks";

export const chats = pgTable("chats", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title"),
  subjectId: uuid("subject_id")
    .references(() => notebooks.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});