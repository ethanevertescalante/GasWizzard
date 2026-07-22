"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { maptilerLayer } from "@maptiler/leaflet-maptilersdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function MapTilerLayer() {
    const map = useMap();

    useEffect(() => {
        const layer = maptilerLayer({
            apiKey: process.env.NEXT_PUBLIC_MAPTILER_KEY!,
            style: "019f696c-fef5-71a6-b6da-8c357088d2d4",
        });

        layer.addTo(map);

        return () => {
            map.removeLayer(layer);
        };
    }, [map]);

    return null;
}