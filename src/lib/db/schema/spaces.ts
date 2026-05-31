import { 
    pgTable, 
    uuid, 
    text, 
    timestamp, 
    boolean 
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const spaces = pgTable("spaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  
  ownerId: text("owner_id")
    .references(() => user.id, { 
      onDelete: "cascade" 
    })
    .notNull(),
    
  isDefault: boolean("is_default")
    .default(false)
    .notNull(),
  
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});