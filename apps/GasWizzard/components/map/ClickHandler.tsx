
import {Marker, useMapEvents, Popup} from "react-leaflet";
import {photonResponse, PhotonToAddress, ReverseGeocode} from "@/lib/photon";
import {LatLngExpression} from "leaflet";
import {useState} from "react";
import {createPin} from "@/lib/pins";
import {coordinates} from "@maptiler/sdk";
import {Coordinate} from "@/lib/osrm";
import { Separator } from "@base-ui/react";
import {Input} from "@/components/ui/input";

type clickHandlerProps = {
    selectedLocation: LatLngExpression | null;
    setSelectedLocation: (coordinate: LatLngExpression | null) => void;
}


export default function ClickHandler({
    selectedLocation,
    setSelectedLocation,
}: clickHandlerProps){

    const [ name, setName ] = useState<string | undefined>("");
    const [ address, setAddress ] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [coord, setCoord] = useState<Coordinate | null>(null);
    const [ pinName, setPinName ] = useState<string>("");

    useMapEvents({
        async click(e){
            setSelectedLocation(e.latlng);
            console.log(e.latlng);
            const response: photonResponse = await ReverseGeocode(e.latlng);
            const {name, address, location, coordinates: coords} = PhotonToAddress(response);

            setName(name);
            setAddress(address);
            setLocation(location);
            setCoord(coords);

            console.log(name);
            console.log(address);
            console.log(location);
            console.log(coordinates);
        }
    })

    if (!selectedLocation) return;

    return(
            <Marker position={selectedLocation}>
                {location ? (
                    <Popup>
                        <div className="relative min-w-60 bg-white rounded-full">
                            {name && (
                                <div>
                                    {name}
                                    <br/>
                                </div>)}
                            {address && (
                                <div>
                                    {address}
                                    <br/>
                                </div>)}
                            {location && (
                                <div>
                                    {location}
                                    <br/>
                                </div>)}

                            {coord && address && (
                                <div className="flex flex-row justify-around  p-2  ">
                                    <Input
                                        value={pinName ?? ""}
                                        onChange={e => setPinName(e.target.value)}
                                        placeholder="home, work..."
                                        className="w-3/5 h-full"

                                    />
                                    <Separator />
                                    <button
                                        onClick={ () => createPin({
                                            pinUsername: pinName,
                                            pinName: name,
                                            pinAddress: address,
                                            pinLat: coord?.lat,
                                            pinLng: coord?.lng,
                                            markerType: ""
                                        })}
                                        className="hover:cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 text-nowrap text-blue-900"
                                        disabled={pinName === ""}
                                    >
                                        Add Pin
                                    </button>
                                </div>

                            )}
                        </div>
                    </Popup>
                ): (
                    <Popup>
                        <div className="text-red-500 text-center">
                            No address available at this location, please select a different area!
                        </div>
                    </Popup>
                )}
            </Marker>
    )
}