export async function createPin(data: {
    pinName?: string,
    pinAddress: string,
    pinLat: number,
    pinLng: number,
    markerType: string,
}) {
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