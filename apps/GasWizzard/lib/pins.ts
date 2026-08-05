export type pinType = {
    id:string
    pinUsername: string;
    pinName?: string;
    pinAddress: string;
    pinLat: number;
    pinLng: number;
    markerType: string;
}


export async function createPin(data: {
    pinUsername: string,
    pinName?: string,
    pinAddress: string,
    pinLat: number,
    pinLng: number,
    markerType: string,
}) {
    console.log(data);
    const response = await fetch('/api/pins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create pin: ");
    }

    return response.json();
}

export async function getPins(): Promise<pinType[]> {
    const response = await fetch("/api/pins");

    if (!response.ok) {
        throw new Error("Failed to fetch pins");
    }

    const data: { pins: pinType[] } = await response.json();

    console.log(data.pins);

    return data.pins;
}

export async function deletePin(pinId: string): Promise<void> {
    const response = await fetch('/api/pins', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pinId),
    });

    if (!response.ok) {
        throw new Error("Failed to delete pin");
    }


}

export async function editPin(pinData: {
    pinId: string,
    pinName: string,
}): Promise<void> {
    const response = await fetch('/api/pins', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pinData),
    });
}