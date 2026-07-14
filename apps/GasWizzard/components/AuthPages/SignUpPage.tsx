"use client"

import Button from "../CustomComponents/General/Button";
import {useForm} from "react-hook-form";
import {signUpForm, SignUpForm} from "../../lib/ZodForms";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {authClient} from "../../lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpForm)
    })


    const router = useRouter();

    const onSubmit = async (formData: SignUpForm) => {
        const { data, error } = await authClient.signUp.email({
            name: formData.username,
            email: formData.email,
            password: formData.password,
        })

        if (error) {
            setError("root", {
                type: "server",
                message: error.message ?? "Unable to create account",
            });

            return;
        }

        router.replace("/map");
        router.refresh();
    }

    return (
        <form
            className="flex flex-col gap-3 justify-center align-middle items-center h-screen"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                {...register("username")}
                placeholder="Username"
                className="border border-gray-300 rounded-md shadow-sm"
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="border border-gray-300 rounded-md shadow-sm"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="border border-gray-300 rounded-md shadow-sm"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className="border border-gray-300 rounded-md shadow-sm"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            <Button buttonType="submit" disabled={isSubmitting}>Sign Up</Button>
            {errors.root && (
                <p className="text-red-500">
                    {errors.root.message}
                </p>
            )}
            <p className="text-black">
                Already have an account?{" "}
                <span className="hover:underline cursor-pointer">
                        <Link href="/login">Login</Link>
                    </span>
            </p>
        </form>
    )
}