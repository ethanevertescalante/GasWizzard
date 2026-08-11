import { pinType } from "@/lib/pins";
import { Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { deletePin } from "@/lib/pins";
import { ConnectionDialog } from "@/components/map/ConnectionDialog";

type UserPinProps = {
    pins: pinType[];
    setPins: (pins: pinType[]) => void;
    onPinDeleted: () => Promise<void>;
};

export default function UserPins({
                                     pins,
                                     onPinDeleted,
                                 }: UserPinProps) {
    const [editPinState, setEditPinState] = useState(false);

    const [connectionDialogOpen, setConnectionDialogOpen] = useState(false);
    const [selectedPin, setSelectedPin] = useState<pinType | null>(null);

    const toggleEditPin = () => {
        setEditPinState((prev) => !prev);
    };

    const deletePinInstance = async (pin: pinType) => {
        await deletePin(pin.id);
        await onPinDeleted();
    };

    const openConnectionDialog = (pin: pinType) => {
        setSelectedPin(pin);
        setConnectionDialogOpen(true);
    };

    return (
        <div>
            {pins.map((pin) => (
                <Marker
                    key={pin.id}
                    position={[pin.pinLng, pin.pinLat]}
                >
                    <Popup>
                        <strong>{pin.pinUsername}</strong>
                        <p>{pin.pinName}</p>
                        <p>{pin.pinAddress}</p>

                        <div className="flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => openConnectionDialog(pin)}
                                className="rounded-md bg-orange-500 p-2 text-sm font-bold text-white"
                            >
                                Add Connection
                            </button>

                            {!editPinState ? (
                                <button
                                    type="button"
                                    onClick={toggleEditPin}
                                    className="rounded-md bg-blue-500 p-2 text-sm font-bold text-white"
                                >
                                    Edit
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={toggleEditPin}
                                    className="rounded-md bg-green-500 p-2 text-sm font-bold text-white"
                                >
                                    Done
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => deletePinInstance(pin)}
                                className="rounded-md bg-red-500 p-2 text-sm font-bold text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {connectionDialogOpen && selectedPin && (
                <ConnectionDialog
                    startPin={selectedPin}
                    pins={pins}
                    onClose={() => {
                        setConnectionDialogOpen(false);
                        setSelectedPin(null);
                    }}
                />
            )}
        </div>
    );
}