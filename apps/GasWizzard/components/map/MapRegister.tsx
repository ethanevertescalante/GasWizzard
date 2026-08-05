"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapContext } from "./MapContext";

export default function MapRegister() {
    const leafletMap = useMap();
    const { setMap } = useMapContext();

    useEffect(() => {
        setMap(leafletMap);
    }, [leafletMap, setMap]);

    return null;
}