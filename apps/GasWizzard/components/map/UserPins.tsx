import {pinType} from "@/lib/pins";
import {Marker, Popup} from "react-leaflet";

type UserPinProps = {
    pins: pinType[]
}


export default function UserPins({
    pins
                                 }: UserPinProps
){
    return (
        <div>
            {pins.map(pin => (
                <Marker
                    key={pin.id}
                    position={[pin.pinLng, pin.pinLat]}
                >
                    <Popup>
                        <strong>{pin.pinUsername}</strong>
                        <p>{pin.pinAddress}</p>
                        <div className="flex items-center justify-center gap-2">
                            <button className="bg-blue-500  p-2 rounded-md text-sm font-bold text-white">
                                Edit
                            </button>
                            <button className="bg-red-500 p-2 rounded-md text-sm font-bold text-white">
                                Delete
                            </button>
                        </div>

                    </Popup>

                </Marker>
            ))}
        </div>
    )

}