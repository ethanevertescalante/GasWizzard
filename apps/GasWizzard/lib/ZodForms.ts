import {z} from "zod";

export const loginForm = z.object({
    email: z.string().trim().pipe(
        z.email({
            error: "Invalid email address",
        })),
    password: z.string().min(8,{
        error: "Password must be at least 8 characters",
    })
})

export type LoginForm = z.infer<typeof loginForm>;

export const signUpForm = z.object({
    username: z.string({
        error: "Invalid username, please pick another username",
    }),
    email: z.string().trim().pipe(
        z.email({
            error: "Invalid email address",
        })),

    password: z.string().min(8,{
        error: "Password must be at least 8 characters",
    }),

    confirmPassword: z.string().min(8,{
        error: "Password must be at least 8 characters",
    })
}).refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
})

export type SignUpForm = z.infer<typeof signUpForm>

export const connectionForm = z.object({
    connectionUsername: z.string().min(1).trim(),
    numberOfTrips: z.number().default(1),
    timeframe: z.string().default("TRIP"),
    roundTrip: z.boolean().default(false),
    startPinId: z.string(),
    endPinId: z.string(),
})

export type ConnectionForm = z.infer<typeof connectionForm>