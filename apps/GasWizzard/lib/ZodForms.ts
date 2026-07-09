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