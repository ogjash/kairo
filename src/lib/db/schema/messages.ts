import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { chats } from "./chats";

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  chatId: uuid("chat_id")
    .references(() => chats.id, {
      onDelete: "cascade",
    })
    .notNull(),
  role: text("role").notNull(),  // "user" | "assistant"
  content: text("content").notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});