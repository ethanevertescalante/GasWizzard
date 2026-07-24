"use client"

import { useMapEvents } from "react-leaflet";

export default function ClickHandler(){
    useMapEvents({
        click(e){
            console.log(e.latlng);
        }
    })

    return null;
}