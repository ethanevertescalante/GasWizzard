import { prisma } from "@/lib/prisma"
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {connectionForm} from "@/lib/ZodForms";


export async function GET(){
    try{
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session) {
            console.error("Create Connection failed: No active session.");

            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const connections = await prisma.connections.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: "asc"
            }
        })

        console.log(connections);

        return NextResponse.json(
            { connections },
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
            console.error("Create Connection failed: No active session.");

            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const body: unknown = await request.json();
        const result = connectionForm.safeParse(body);
        console.log(result);
        if(!result.success){
            return NextResponse.json(
                {
                    error: "Invalid request data",
                    issue: result.error.issues,
                },
                { status: 400 }
            )
        }

        const connection = await prisma.connections.create({
            data: {
                connectionUsername: result.data.connectionUsername,
                numberOfTrips: result.data.numberOfTrips,
                timeframe: result.data.timeframe,
                roundTrip: result.data.roundTrip,
                startPinId: result.data.startPinId,
                endPinId: result.data.endPinId,
                userId : session.user.id,
            }
        })

        console.log("Connection created successfully: ", connection)
        return NextResponse.json(
            { connection },
            { status: 201 },
        )

    }catch(error){
        console.error("Failed to create connection: ",error);
        return NextResponse.json(
            { error: "Failed to create connection" },
            { status: 500 }
        )
    }
}