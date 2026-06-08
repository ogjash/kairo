import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

import { user } from "./auth-schema";
import { spaces } from "./spaces";


export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color"),
  isDefault: boolean("is_default").default(false).notNull(),
  ownerId: text("owner_id")
    .references(() => user.id, {
      onDelete: "cascade",
    })
    .notNull(),
  spaceId: uuid("space_id")
    .references(() => spaces.id, { 
      onDelete: "cascade" 
    })
    .notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});