import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";


export async function GET(request: NextRequest) {
    try{
        const session = await auth.api.getSession({
           headers: await headers(),
        });
        if(!session){
            console.error("Create Pin failed: No active session.");

            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { pinId } = await request.json();
        const pin = await prisma.pins.findFirst({
            where: {
                id: pinId
            },
            orderBy: {
                createdAt: "asc"
            }
        })

        console.log("Pin: ", pin)
        return NextResponse.json(
            { pin },
            { status: 201 },
        )

    }catch(error){
        console.error(`Failed to get pin with pinId: `,error);
        return NextResponse.json(
            { error: "Failed to get pin with pinId" },
            { status: 500 }
        )
    }
}