import Button from "../CustomComponents/General/Button";
import {useForm} from "react-hook-form";
import {signUpForm, SignUpForm} from "../../lib/ZodForms";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";


export default function SignUpPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpForm)
    })

    const onSubmit = (data: SignUpForm) => {
        console.log(data);
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
            <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className="border border-gray-300 rounded-md shadow-sm"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            <Button buttonType="submit">Sign Up</Button>
            <p className="text-black">
                Already have an account?{" "}
                <span className="hover:underline cursor-pointer">
                        <Link href="/login">Login</Link>
                    </span>
            </p>
        </form>
    )
}