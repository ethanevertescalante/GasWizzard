"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {authClient} from "@/lib/auth-client";
import Link from "next/link";

export default function AvatarDropdown(props: {img: string, size: string}) {

    const { data: session, isPending } = authClient.useSession();


    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className={props.size}>
                        <AvatarImage src={props.img} alt="ProfilePicture" />
                        <AvatarFallback>GW</AvatarFallback>
                    </Avatar>
                </Button>
            } />
            <DropdownMenuContent className="w-32">
                {session ? (
                    <div>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>{session.user.name}</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Pins</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem variant="destructive" onClick={() => authClient.signOut()}>Log out</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </div>
                )
                    :
                    (
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href="/login">
                                    Login
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                <Link href="/signup">
                                    Signup
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    )
                }

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
