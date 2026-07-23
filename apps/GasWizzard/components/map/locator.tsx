import React, { useEffect } from 'react';
import {Marker, Popup, useMapEvents} from "react-leaflet";

const fallback = [37.8025, -122.405833]; //coit tower sf/bay area
const zoom = 10;

export default function Locator(){
    const [position, setPosition] = React.useState(null);

    const map = useMapEvents({
        locationfound(e){
            // @ts-ignore
            setPosition(e.latlng);
            map.setView(e.latlng,zoom,{
                animate: false,
            });
        },
        locationerror(e){
            // @ts-ignore
            map.setView(fallback,zoom,{
                animate: false,
            });
        }
    })

    useEffect(() => {
        map.locate({
            enableHighAccuracy: true,
            timeout: 5000,
        })
    }, [map])

    return position === null ? null : (
        console.log("position", position)
    )

}