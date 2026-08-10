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
import {getPins, pinType} from "@/lib/pins";
import {PinDialog} from "@/components/map/PinDialog";
import {useEffect, useState} from "react";

export default function AvatarDropdown(props: {img: string, size: string}) {

    const { data: session } = authClient.useSession();
    const [pins, setPins] = useState<pinType[]>([]);

        async function loadPins() {
            try{
                const data = await getPins();
                setPins(data);
            }catch (error){
                console.log("Failed to load pins: ",error);
            }
        }

    useEffect(() => {
        void loadPins();
    }, []);

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
                            <DropdownMenuItem>
                                <PinDialog pins={pins} loadPins={loadPins}/>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="w-full text-left" variant="destructive" onClick={() => authClient.signOut()}>Log out</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </div>
                )
                    :
                    (
                        <DropdownMenuGroup>
                            <DropdownMenuItem >
                                <Link className="w-full text-left" href="/login">
                                    Login
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                <Link className="w-full text-left" href="/signup">
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
