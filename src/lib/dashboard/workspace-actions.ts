"use server";

import { db } from "@/lib/db";
import { workspaces } from "@/lib/db/schema/workspaces";
import { notebooks } from "@/lib/db/schema/notebooks";
import { spaces } from "@/lib/db/schema/spaces";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

async function assertSpaceOwner(spaceId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const space = await db.query.spaces.findFirst({
    where: eq(spaces.id, spaceId),
  });
  if (!space || space.ownerId !== session.user.id) throw new Error("Forbidden");

  return { userId: session.user.id, space };
}

export async function createDefaultUnsortedWorkspace(
  spaceId: string,
  userId: string
) {
  const existing = await db.query.workspaces.findFirst({
    where: and(
      eq(workspaces.spaceId, spaceId),
      eq(workspaces.isDefault, true)
    ),
  });
  if (existing) return existing;

  const [ws] = await db
    .insert(workspaces)
    .values({
      name: "Unsorted",
      ownerId: userId,
      spaceId,
      isDefault: true,
      color: "#94a3b8",
    })
    .returning();
  return ws;
}

export async function createWorkspace(
  spaceId: string,
  name: string,
  color: string
) {
  try {
    const { userId } = await assertSpaceOwner(spaceId);

    const [ws] = await db
      .insert(workspaces)
      .values({
        name,
        color,
        ownerId: userId,
        spaceId,
        isDefault: false,
      })
      .returning();

    revalidatePath(`/s/${spaceId}`);
    return { success: true as const, workspace: ws };
  } catch (error) {
    console.error("Failed to create workspace:", error);
    return { success: false as const, error: "Failed to create workspace" };
  }
}

export async function createNotebook(
  spaceId: string,
  workspaceId: string,
  name: string,
  color?: string
) {
  try {
    await assertSpaceOwner(spaceId);

    const workspace = await db.query.workspaces.findFirst({
      where: and(
        eq(workspaces.id, workspaceId),
        eq(workspaces.spaceId, spaceId)
      ),
    });
    if (!workspace) {
      return { success: false as const, error: "Workspace not found" };
    }

    const [nb] = await db
      .insert(notebooks)
      .values({
        name,
        workspaceId,
        color: color ?? "#94a3b8",
      })
      .returning();

    revalidatePath(`/s/${spaceId}`);
    return { success: true as const, notebook: nb };
  } catch (error) {
    console.error("Failed to create notebook:", error);
    return { success: false as const, error: "Failed to create notebook" };
  }
}
