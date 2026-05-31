import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

import { workspaces } from "./workspaces";

export const notebooks = pgTable("notebooks", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  color: text("color"),
  workspaceId: uuid("workspace_id")
    .references(() => workspaces.id, {
      onDelete: "cascade",
    })
    .notNull(),
  isStarred: boolean("is_starred").default(false).notNull(), 
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});