"use client"
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import {Map as LeafletMap} from 'leaflet';
import {useRef} from "react";
import 'leaflet/dist/leaflet.css';
import Locator from "./locator";
import MapHeader from "./MapHeader";

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

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
                zoomControl={false}
                doubleClickZoom={true}
                className="fixed inset-0 h-screen w-screen"
            >
                <Locator/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={tileUrl}
                    updateWhenIdle={false}
                    updateWhenZooming={false}
                    keepBuffer={8}
                />
                <ZoomControl position="bottomright" />
            </MapContainer>
            <MapHeader/>
        </div>

    )
}

export default Map;