"use client"
import { MapContainer, TileLayer } from "react-leaflet";
import {Map as LeafletMap} from 'leaflet';
import {useRef} from "react";
import 'leaflet/dist/leaflet.css';
import Locator from "./locator";

const Map = () => {
    const mapRef = useRef<LeafletMap | null>(null);
    return (
        <div>
            <MapContainer
                keyboard={false}
                ref={mapRef}
                center={[51.505, -0.09]}
                zoom={3}
                scrollWheelZoom={false}
                doubleClickZoom={true}
                style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0 }}
            >
                <Locator/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>

    )
}

export default Map;