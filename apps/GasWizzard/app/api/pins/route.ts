import { prisma } from "@/lib/prisma"
import {NextRequest, NextResponse} from "next/server";
import { z } from "zod";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";


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
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session) {
            console.error("Create Pin failed: No active session.");

            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const pins = await prisma.pins.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: "asc"
            }
        })

        console.log(pins)

        return NextResponse.json(
            { pins },
            { status: 201 },
        )
    }catch(error){
        console.error(error);
        throw error;
    }
}

export async function POST(request: NextRequest) {
    try{
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            console.error("Create Pin failed: No active session.");


            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
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
                userId: session?.user.id
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