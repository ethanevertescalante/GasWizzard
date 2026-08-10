import {getPins, pinType} from "@/lib/pins";
import {Marker, Popup} from "react-leaflet";
import {RefObject, useState} from "react";
import {deletePin, editPin} from "@/lib/pins";

type UserPinProps = {
    pins: pinType[]
    setPins: (pins: pinType[]) => void;
    onPinDeleted: () => Promise<void>;
}

export default function UserPins({
    pins,
    onPinDeleted,
}: UserPinProps
){

    const [editPinState, setEditPinState] = useState<boolean>(false)

    const editPin = () => {
        if (!editPinState){
            setEditPinState(true)
        }else{
            setEditPinState(false)
        }
    }

    const deletePinInstance = async (pin: pinType) => {
        await deletePin(pin.id);
        await onPinDeleted();
    }


    return (
        <div >
            {pins.map(pin => (
                <Marker
                    key={pin.id}
                    position={[pin.pinLng, pin.pinLat]}
                >
                    <Popup>
                        <strong>{pin.pinUsername}</strong>
                        <p>{pin.pinName}</p>
                        <p>{pin.pinAddress}</p>
                        <div className="flex items-center justify-center gap-2">
                            <button className="bg-orange-500 p-2 rounded-md text-sm font-bold text-white">
                                Add Connection
                            </button>
                            {!editPinState ? (
                                <button onClick={() => editPin()} className="bg-blue-500  p-2 rounded-md text-sm font-bold text-white">
                                    Edit
                                </button>
                            ) : (
                                <button onClick={() => editPin()} className="bg-green-500  p-2 rounded-md text-sm font-bold text-white">
                                    Done
                                </button>
                            )}
                            <button onClick={() => deletePinInstance(pin)} className="bg-red-500 p-2 rounded-md text-sm font-bold text-white">
                                Delete
                            </button>
                        </div>

                    </Popup>

                </Marker>
            ))}
        </div>
    )

}