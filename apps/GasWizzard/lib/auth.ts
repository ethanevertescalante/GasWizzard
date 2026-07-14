import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import {oAuthProxy} from "better-auth/plugins";
import {nextCookies} from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
    },
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            console.log("Auth Hook Triggered:", ctx.path);
        }),
    },
    plugins: [oAuthProxy(), nextCookies()],
});