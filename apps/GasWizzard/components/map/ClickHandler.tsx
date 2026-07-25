
import {Marker, useMapEvents, Popup} from "react-leaflet";
import {photonResponse, PhotonToAddress, ReverseGeocode} from "@/lib/photon";
import {LatLngExpression} from "leaflet";
import {useState} from "react";

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
    // const [coordinates, setCoordinates] = useState<Coordinate | null>(null);


    useMapEvents({
        async click(e){
            setSelectedLocation(e.latlng);
            console.log(e.latlng);
            const response: photonResponse = await ReverseGeocode(e.latlng);
            const {name, address, location, coordinates} = PhotonToAddress(response);

            setName(name);
            setAddress(address);
            setLocation(location);

            console.log(name);
            console.log(address);
            console.log(location);
            console.log(coordinates);
        }
    })

    if (!selectedLocation) return;

    return(
        <Marker position={selectedLocation}>
            <Popup>
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
            </Popup>
        </Marker>
    )
}