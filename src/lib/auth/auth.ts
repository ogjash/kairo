import { betterAuth, Schema } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/lib/db/schema";

import { createSpaceWithAvatar } from "@/lib/dashboard/space-actions";

import { db } from "@/lib/db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

    databaseHooks: {
      user: {
        create: {
            after: async (user) => {
            // When a user is successfully created in the db, create their default space
            try {
                console.log("Creating default space for user:", user.id);
                const result = await createSpaceWithAvatar(user.id, "My Space", true);
                console.log("Space creation result:", result);
                if (!result.success) {
                    console.error("Space creation failed:", result.error);
                }
            } catch (error) {
                console.error("Failed to create default space during signup:", error);
            }
            },
        },
      },
    },

    plugins: [nextCookies()],

});