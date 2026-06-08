"use server";

import { db } from "@/lib/db";
import { spaces } from "@/lib/db/schema/spaces";
import { eq, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { createDefaultUnsortedWorkspace } from "./workspace-actions";

export async function createSpaceWithAvatar(userId: string, spaceName: string, isDefault = false) {
  const newSpaceId = uuidv4();

  try {
    const [newSpace] = await db.insert(spaces).values({
      id: newSpaceId,
      name: spaceName,
      ownerId: userId,
      isDefault: isDefault,
      avatarUrl: null,
    }).returning();

    await createDefaultUnsortedWorkspace(newSpaceId, userId);

    console.log("Space created successfully:", newSpace);
    return { success: true, space: newSpace };
  } catch (error) {
    console.error("Failed to create space:", error);
    return { success: false, error: "Failed to create space" };
  }
}

export async function getUserSpaces(userId: string) {
  try {
    const userSpaces = await db.query.spaces.findMany({
      where: eq(spaces.ownerId, userId),
      orderBy: (spaces, { desc }) => [desc(spaces.isDefault), desc(spaces.createdAt)],
    });
    return userSpaces;
  } catch (error) {
    console.error("Failed to fetch user spaces:", error);
    return [];
  }
}