"use client"
import {MapContainer, Marker, Popup, ZoomControl} from "react-leaflet";
import "@maptiler/leaflet-maptilersdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {LatLngExpression, Map as LeafletMap} from 'leaflet';
import {useRef, useState} from "react";
import 'leaflet/dist/leaflet.css';
import Locator from "./locator";
import MapHeader from "./MapHeader";
import MapTilerLayer from "@/components/map/MapTilerLayer";
import L from "leaflet";
import "public/marker-icon.png"
import "public/marker-icon-2x.png"
import "public/marker-shadow.png"
// const tileUrl =
//     `https://api.maptiler.com/maps/019f696c-fef5-71a6-b6da-8c357088d2d4/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;

const Map = () => {
    const defaultMarkerIcon = L.icon({
        iconUrl: "/marker-icon.png",
        iconRetinaUrl: "/marker-icon-2x.png",
        shadowUrl: "/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });
    const mapRef = useRef<LeafletMap | null>(null);

    const [selectedPosition, setSelectedPosition] = useState<LatLngExpression | null>(null);
    const [address, setAddress] = useState<string>("");
    const [locationInfomration, setLocationInfomration] = useState<string>("");
    const [name, setName] = useState<string>("");

    const goToResultAction = (lat: number, lng: number, address: string, locationInformation: string, name: string) => {
        const position: LatLngExpression = [lat, lng];

        setSelectedPosition(position);
        setAddress(address);
        setLocationInfomration(locationInformation);
        setName(name);
        mapRef.current?.setView(position, 16);

    };

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
                <MapTilerLayer />
                {selectedPosition && (
                    <Marker icon={defaultMarkerIcon}  position={selectedPosition}>
                        <Popup>{name ?? address}</Popup>
                    </Marker>
                )}
                <ZoomControl position="bottomright" />
            </MapContainer>
            <MapHeader goToResultAction={goToResultAction} />
        </div>

    )
}

export default Map;