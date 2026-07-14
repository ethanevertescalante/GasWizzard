"use client"

import {authClient} from "../../lib/auth-client";
import {useEffect, useState} from "react";

export default function MapHeader() {
    const [mounted, setMounted] = useState(false);
    const {data: session, isPending} = authClient.useSession()
    const username = session?.user.name;

    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        <div className="relative flex justify-end item-baseline py-4 px-5">
            {!mounted || isPending ? (
                <p>Loading...</p>
            ): (
                <div>
                    {username}
                </div>
            )}
        </div>
    )
}
