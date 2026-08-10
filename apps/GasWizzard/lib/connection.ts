import axios from 'axios';

export type ConnectionType = {
    id: string;
    connectionUsername: String;
    numberOfTrips: number;
    roundTrip: boolean;
    startPinId: string;
    endPinId: string;
    userId: string;
}

export async function createConnection(data:{
    connectionUsername: String;
    numberOfTrips: number;
    roundTrip: boolean;
    StartPinId: string;
    endPinId: string;
    userId: string;
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

export async function getConnections(){
    const response = await fetch('/api/connections');

    if (!response.ok) {
        throw new Error("Failed to get connections: ");
    }

    const data: { connections: ConnectionType[] } = await response.json();

    return data.connections;
}