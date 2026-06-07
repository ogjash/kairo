import { relations } from "drizzle-orm";
import { workspaces } from "./workspaces";
import { spaces } from "./spaces";
import { notebooks } from "./notebooks";

export const spacesRelations = relations(spaces, ({ many }) => ({
  workspaces: many(workspaces),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  space: one(spaces, { fields: [workspaces.spaceId], references: [spaces.id] }),
  notebooks: many(notebooks),
}));

export const notebooksRelations = relations(notebooks, ({ one }) => ({
  workspace: one(workspaces, { fields: [notebooks.workspaceId], references: [workspaces.id] }),
}));