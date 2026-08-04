"use client"
import {MapContainer, Marker, Popup, useMapEvents, ZoomControl} from "react-leaflet";
import "@maptiler/leaflet-maptilersdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {LatLngExpression, Map as LeafletMap} from 'leaflet';
import {useEffect, useRef, useState} from "react";
import 'leaflet/dist/leaflet.css';
import Locator from "./locator";
import MapHeader from "./MapHeader";
import MapTilerLayer from "@/components/map/MapTilerLayer";
import L from "leaflet";
import "public/marker-icon.png"
import "public/marker-icon-2x.png"
import "public/marker-shadow.png"
import ClickHandler from "@/components/map/ClickHandler";
import {getPins} from "@/lib/pins";
import { pinType } from "@/lib/pins";
import UserPins from "@/components/map/UserPins";
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
    const [selectedLocation, setSelectedLocation] = useState<LatLngExpression | null>(null);
    const [pins, setPins] = useState<pinType[]>([]);

    async function loadPins() {
        try{
            const data = await getPins();
            setPins(data);
        }catch (error){
            console.log("Failed to load pins: ",error);
        }
    }

    useEffect(() => {
        void loadPins();
    }, []);


    const goToResultAction = (lat: number, lng: number) => {
        const location: LatLngExpression = [lat, lng];
        setSelectedLocation(location);
        mapRef.current?.setView(location, 16);
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
                <ClickHandler
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    onPinCreated={loadPins}
                />
                {pins && (
                    <UserPins
                        pins={pins}
                        setPins={setPins}
                        onPinDeleted={loadPins}/>
                )}
                <ZoomControl position="bottomright" />
            </MapContainer>
            <MapHeader goToResultAction={goToResultAction} />
        </div>

    )
}

export default Map;