"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import { Map as LeafletMap } from "leaflet";

type MapContextType = {
    map: LeafletMap | null;
    setMap: React.Dispatch<
        React.SetStateAction<LeafletMap | null>
    >;
};

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({
                                children,
                            }: {
    children: ReactNode;
}) {
    const [map, setMap] = useState<LeafletMap | null>(null);

    return (
        <MapContext.Provider value={{ map, setMap }}>
            {children}
        </MapContext.Provider>
    );
}

export function useMapContext() {
    const context = useContext(MapContext);

    if (!context) {
        throw new Error(
            "useMapContext must be used inside MapProvider"
        );
    }

    return context;
}