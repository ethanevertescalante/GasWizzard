import axios from 'axios';
import {pinType} from "@/lib/pins";

export type connectionType = {
    id: string;
    connectionUsername: String;
    numberOfTrips: number;
    roundTrip: boolean;
    timeframe: string;
    startPinId: string;
    endPinId: string;
}

export async function createConnection(data:{
    connectionUsername: String;
    numberOfTrips: number;
    roundTrip: boolean;
    timeframe: string;
    startPinId: string;
    endPinId: string;
}) {
    console.log(data);
    const response = await fetch('/api/connections', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Failed to create connection: ");
    }

    return response.json();
}

export async function getConnections(): Promise<connectionType[]>{
    const response = await fetch('/api/connections');

    if (!response.ok) {
        throw new Error("Failed to get connections: ");
    }

    const data: { connections: connectionType[] } = await response.json();

    return data.connections;
}