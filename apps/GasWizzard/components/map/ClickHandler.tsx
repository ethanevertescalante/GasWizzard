"use client"

import { useMapEvents } from "react-leaflet";
import {photonResponse, PhotonToAddress, ReverseGeocode} from "@/lib/photon";

export default function ClickHandler(){
    useMapEvents({
        async click(e){
            console.log(e.latlng);
            const response: photonResponse = await ReverseGeocode(e.latlng);
            const {name, address, location, coordinates} = PhotonToAddress(response);
            console.log(name);
            console.log(address);
            console.log(location);
            console.log(coordinates);
        }
    })

    return null;
}