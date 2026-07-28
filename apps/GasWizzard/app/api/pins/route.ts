import { prisma } from "@/lib/prisma"
import {NextRequest, NextResponse} from "next/server";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";

const {data: session} = await authClient.getSession();

const createPinScheme = z.object({
    pinUsername: z.string().trim().min(1),
    pinName: z.optional(z.string().trim()),
    pinAddress: z.string().trim(),
    pinLat: z.float64(),
    pinLng: z.float64(),
    markerType: z.string().uppercase().trim(),
})


export async function GET() {
    try{
        if (!session) return;
        const pins = await prisma.pins.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: "asc"
            }
        })
    }catch(error){
        console.error(error);
        throw error;
    }
}

export async function POST(request: NextRequest) {
    try{
        if (!session) return;
        const body: unknown = await request.json();
        const result = createPinScheme.safeParse(body);

        if(!result.success){
            return NextResponse.json(
                {
                    error: "Invalid request data",
                    issue: result.error.issues,
                },
                { status: 400 }
            )
        }

        const pin = await prisma.pins.create({
            data: {
                pinUsername: result.data.pinUsername,
                pinName: result.data.pinName || null,
                pinAddress: result.data.pinAddress,
                pinLat: result.data.pinLat,
                pinLng: result.data.pinLng,
                markerType: result.data.markerType,
                userId: session.user.id
            }
        })

        console.log("Pin created successfully: ", pin)
        return NextResponse.json(
            { pin },
            { status: 201 },
        )
        
    }catch(error){
        console.error("Failed to create pin: ",error);
        return NextResponse.json(
            { error: "Failed to create pin" },
            { status: 500 }
        )
    }
}