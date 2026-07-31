import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng, LatLngExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import {
    photonResponse,
    PhotonToAddress,
    ReverseGeocode,
} from "@/lib/photon";

import { createPin } from "@/lib/pins";
import { Coordinate } from "@/lib/osrm";
import { Separator } from "@base-ui/react";
import { Input } from "@/components/ui/input";

type ClickHandlerProps = {
    selectedLocation: LatLngExpression | null;
    setSelectedLocation: (
        coordinate: LatLngExpression | null
    ) => void;
};

function normalizeLatLng(
    selectedLocation: LatLngExpression
): LatLng {
    if (selectedLocation instanceof LatLng) {
        return selectedLocation;
    }

    if (Array.isArray(selectedLocation)) {
        const [lat, lng] = selectedLocation;

        return new LatLng(lat, lng);
    }

    return new LatLng(
        selectedLocation.lat,
        selectedLocation.lng
    );
}

export default function ClickHandler({
                                         selectedLocation,
                                         setSelectedLocation,
                                     }: ClickHandlerProps) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [coords, setCoords] = useState<Coordinate | null>(null);
    const [pinName, setPinName] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const requestIdRef = useRef(0);

    useMapEvents({
        click(e) {
            setSelectedLocation(e.latlng);
        },
    });

    useEffect(() => {
        if (!selectedLocation) {
            setName("");
            setAddress("");
            setLocation("");
            setCoords(null);
            setPinName("");
            setHasError(false);
            setIsLoading(false);
            return;
        }

        const currentRequestId = ++requestIdRef.current;

        async function loadLocationInformation() {
            setIsLoading(true);
            setHasError(false);

            setName("");
            setAddress("");
            setLocation("");
            setCoords(null);
            setPinName("");

            try {
                const latLng = normalizeLatLng(selectedLocation!);

                const response: photonResponse =
                    await ReverseGeocode(latLng);

                const result = PhotonToAddress(response);

                if (currentRequestId !== requestIdRef.current) {
                    return;
                }

                setName(result.name ?? "");
                setAddress(result.address ?? "");
                setLocation(result.location ?? "");
                setCoords(result.coordinates ?? null);

                console.log({
                    name: result.name,
                    address: result.address,
                    location: result.location,
                    coordinates: result.coordinates,
                });
            } catch (error) {
                if (currentRequestId !== requestIdRef.current) {
                    return;
                }

                console.error("Reverse geocoding failed:", error);

                setName("");
                setAddress("");
                setLocation("");
                setCoords(null);
                setHasError(true);
            } finally {
                if (currentRequestId === requestIdRef.current) {
                    setIsLoading(false);
                }
            }
        }

        void loadLocationInformation();
    }, [selectedLocation]);

    async function handleCreatePin() {
        const trimmedPinName = pinName.trim();

        if (!coords || !trimmedPinName || isSaving) {
            return;
        }

        setIsSaving(true);

        try {
            await createPin({
                pinUsername: trimmedPinName,
                pinName: name,
                pinAddress: address,
                pinLat: coords.lat,
                pinLng: coords.lng,
                markerType: "",
            });

            setPinName("");
        } catch (error) {
            console.error("Failed to create pin:", error);
        } finally {
            setIsSaving(false);
        }
    }

    if (!selectedLocation) {
        return null;
    }

    const hasLocationInformation =
        Boolean(name) ||
        Boolean(address) ||
        Boolean(location);

    return (
        <Marker position={selectedLocation}>
            <Popup minWidth={240}>
                {isLoading ? (
                    <div className="min-w-60 p-3 text-center">
                        Loading location...
                    </div>
                ) : hasError || !hasLocationInformation ? (
                    <div className="min-w-60 p-3 text-center text-red-500">
                        No address is available at this location.
                        Please select a different area.
                    </div>
                ) : (
                    <div className="min-w-60 bg-white">
                        <div className="space-y-1 p-2">
                            {name && (
                                <div className="font-medium">
                                    {name}
                                </div>
                            )}
                            {address && (
                                <div>
                                    {address}
                                </div>
                            )}
                            {location && (
                                <div className="text-sm text-gray-600">
                                    {location}
                                </div>
                            )}
                        </div>
                        {coords && (
                            <>
                                <Separator />

                                <div className="flex items-center gap-2 p-2">
                                    <Input
                                        value={pinName}
                                        onChange={(e) =>
                                            setPinName(e.target.value)
                                        }
                                        placeholder="Home, work..."
                                        className="flex-1"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            void handleCreatePin()
                                        }
                                        disabled={
                                            !pinName.trim() ||
                                            isSaving
                                        }
                                        className="text-nowrap text-blue-900 hover:cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
                                    >
                                        {isSaving
                                            ? "Adding..."
                                            : "Add Pin"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </Popup>
        </Marker>
    );
}

