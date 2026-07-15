"use client"
import {authClient} from "@/lib/auth-client";
import {useEffect, useState} from "react";
import AvatarDropdown from "@/components/ui/AvatarDropdown";
import blankProfile from "@/public/blankProfile.png"
import { Search } from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import Link from "next/link";

export default function MapHeader() {
    const [mounted, setMounted] = useState(false);
    const {data: session, isPending} = authClient.useSession()
    const profilePic = session?.user.image || null;

    const profileSize = "size-12"

    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        <div className="flex justify-around item-baseline py-5 px-5">
            {!mounted || isPending || !profilePic ? (
                <div className="flex justify-around items-center gap-5">
                    <Link
                        href="/"
                        className="text-2xl hover:underline cursor-pointer relative"
                    >
                        <span className="text-red-500">Gas</span>
                        <span className="text-blue-900">Wizzard</span>
                    </Link>
                    <InputGroup className="w-90 bg-white h-11 ">
                        <InputGroupInput placeholder="Search a location you frequent..." />
                        <InputGroupAddon align="inline-end">
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>
                    <AvatarDropdown img={blankProfile.src} size={profileSize}/>
                </div>
                ): (
                <div>
                    <InputGroup className="w-full bg-white">
                        <InputGroupInput placeholder="Search a location you frequent..." />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>
                    <AvatarDropdown img={profilePic} size={profileSize}/>
                </div>

            )}
        </div>
    )
}
