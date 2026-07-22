"use client"
import { MapContainer, ZoomControl } from "react-leaflet";
import "@maptiler/leaflet-maptilersdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {Map as LeafletMap} from 'leaflet';
import {useRef} from "react";
import 'leaflet/dist/leaflet.css';
import Locator from "./locator";
import MapHeader from "./MapHeader";
import MapTilerLayer from "@/components/map/MapTilerLayer";

// const tileUrl =
//     `https://api.maptiler.com/maps/019f696c-fef5-71a6-b6da-8c357088d2d4/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;

const Map = () => {
    const mapRef = useRef<LeafletMap | null>(null);

    return (
        <div>
            <MapContainer
                keyboard={false}
                ref={mapRef}
                center={[51.505, -0.09]}
                zoom={3}
                scrollWheelZoom={true}
                wheelPxPerZoomLevel={250}
                wheelDebounceTime={80}
                zoomSnap={0.25}
                zoomDelta={0.25}
                zoomControl={false}
                doubleClickZoom={true}
                className="fixed inset-0 h-screen w-screen"
            >
                <Locator/>
                <MapTilerLayer />
                <ZoomControl position="bottomright" />
            </MapContainer>
            <MapHeader/>
        </div>

    )
}

export default Map;