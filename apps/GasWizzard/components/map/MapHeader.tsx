"use client"
import {authClient} from "@/lib/auth-client";
import { useState } from "react";
import AvatarDropdown from "@/components/ui/AvatarDropdown";
import blankProfile from "@/public/blankProfile.png"
import Link from "next/link";
import SearchView from "./SearchView";

type MapHeaderProps = {
    goToResultAction: (lat: number, lng: number, address: string, locationInfomration: string, name: string) => void;
};

export default function MapHeader({
    goToResultAction,
}: MapHeaderProps) {
    const {data: session} = authClient.useSession()
    const profilePic = session?.user.image || null;

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const profileSize = "size-12"

    return (
        <header className="fixed top-0 left-0 right-0 z-[9999] overflow-visible pointer-events-none">
            <div className="flex justify-center items-center gap-5 py-3 pointer-events-auto overflow-visible">
                <Link href="/" className="text-2xl">
                    <span className="text-red-500">Gas</span>
                    <span className="text-blue-900">Wizzard</span>
                </Link>

                <SearchView
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    results={results}
                    setResults={setResults}
                    goToResultAction={goToResultAction}
                />

                {!profilePic ? (
                    <AvatarDropdown img={blankProfile.src} size={profileSize} />
                ): (
                    <AvatarDropdown img={profilePic} size={profileSize}  />
                )}

            </div>
        </header>
    )
}
