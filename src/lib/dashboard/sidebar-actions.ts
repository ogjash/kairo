"use server";

import { db } from "@/lib/db";
import { workspaces } from "@/lib/db/schema/workspaces";
import { notebooks } from "@/lib/db/schema/notebooks";
import { eq, and, desc } from "drizzle-orm";

export async function getSpaceWorkspacesWithNotebooks(spaceId: string) {
  return db.query.workspaces.findMany({
    where: eq(workspaces.spaceId, spaceId),
    orderBy: [desc(workspaces.createdAt)],
    with: {
      notebooks: {
        orderBy: [desc(notebooks.createdAt)],
      },
    },
  });
}

export async function getStarredNotebooksInSpace(spaceId: string) {
  return db
    .select({
      id: notebooks.id,
      name: notebooks.name,
      color: notebooks.color,
      workspaceId: notebooks.workspaceId,
    })
    .from(notebooks)
    .innerJoin(workspaces, eq(notebooks.workspaceId, workspaces.id))
    .where(
      and(
        eq(workspaces.spaceId, spaceId),
        eq(notebooks.isStarred, true)
      )
    )
    .orderBy(desc(notebooks.createdAt));
}