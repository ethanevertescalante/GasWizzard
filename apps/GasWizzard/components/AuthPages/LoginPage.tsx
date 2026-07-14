import Button from "../CustomComponents/General/Button";
import {useForm} from "react-hook-form";
import {loginForm, LoginForm} from "../../lib/ZodForms";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {authClient} from "../../lib/auth-client";
import {useRouter} from "next/navigation";


export default function LoginPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginForm)
    })

    const router = useRouter();

    const onSubmit = async (formData: LoginForm) => {
        const { data, error } = await authClient.signIn.email({
            email: formData.email,
            password: formData.password,
            rememberMe: false,
            callbackURL: "/"
        })

        if (error) {
            setError("root", {
                type: "server",
                message: error.message ?? "Unable to create account",
            });

            return;
        }

        router.replace("/");
        router.refresh();
    }

    return (
            <form className="flex flex-col gap-3 justify-center align-middle items-center h-screen" onSubmit={handleSubmit(onSubmit)}>
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
                <Button buttonType="submit" disabled={isSubmitting}>Login</Button>
                {errors.root && (
                    <p className="text-red-500">
                        {errors.root.message}
                    </p>
                )}
                <p className="text-black">
                    Don't have an account?{" "}
                    <span className="hover:underline cursor-pointer">
                        <Link href="/signup">Sign Up</Link>
                    </span>
                </p>
            </form>
    )
}