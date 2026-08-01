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

export async function getPins(){
    const response = await fetch('/api/pins');

    if (!response.ok) {
        throw new Error("Failed to create pin: ");
    }

    const pins = await response.json();
    console.log(pins);

    return pins;

}