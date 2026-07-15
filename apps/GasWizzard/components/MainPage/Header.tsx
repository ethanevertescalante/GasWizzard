"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Header() {
    const [mounted, setMounted] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const username = session?.user.name;

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="flex justify-around items-baseline py-4 px-5">
            <div className="flex flex-row justify-start gap-4">
                <Link
                    href="/"
                    className="text-2xl hover:underline cursor-pointer"
                >
                    <span className="text-red-500">Gas</span>
                    <span className="text-blue-900">Wizzard</span>
                </Link>
            </div>

            <nav className="self-center">
                <ul className="flex items-center gap-3 text-lg">
                    <li className="hover:underline cursor-pointer" >
                        <Link href="/map">Map</Link>
                    </li>

                    <li className="hover:underline cursor-pointer">
                        <Link href="/about">About</Link>
                    </li>

                    {!mounted || isPending ? (
                        <li>Loading...</li>
                    ) : session ? (
                        <li>
                            <button
                                className="hover:underline cursor-pointer"
                                onClick={() => authClient.signOut()}
                            >
                                {username}
                            </button>
                        </li>
                    ) : (
                        <>
                            <li className="hover:underline cursor-pointer">
                                <Link href="/login">Login</Link>
                            </li>

                            <li className="hover:underline cursor-pointer">
                                <Link href="/signup">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}