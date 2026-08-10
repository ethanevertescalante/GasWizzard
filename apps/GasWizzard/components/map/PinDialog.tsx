import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription
} from "@/components/ui/alert-dialog"
import {pinType} from "@/lib/pins";
import {useRef, useState} from "react";
import {LatLngExpression, Map as LeafletMap} from "leaflet";
import {useMapContext} from "@/components/map/MapContext";

type PinDialogProps = {
    pins: pinType[]
    loadPins: () => Promise<void>
}

export function PinDialog({
    pins,
    loadPins,
                          }: PinDialogProps) {

    const { map } = useMapContext();
    const [pinsDialogOpen, setPinsDialogOpen] = useState(false);

    async function onPinsButtonClick() {
        await loadPins();
    }


    const goToPin = (lat: number, lng: number) => {
        setPinsDialogOpen(false);
        const location: LatLngExpression = [lng, lat];
        map?.setView(location,20);
    }

    return (
        <AlertDialog
            open={pinsDialogOpen}
            onOpenChange={setPinsDialogOpen}
        >
            <AlertDialogTrigger onClick={(e) => e.stopPropagation()} render={<button className="w-full text-left" onClick={onPinsButtonClick}>My Pins</button>} />
            <AlertDialogContent className="h-2/3 md:h-auto">
                <div className="h-full overflow-y-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Your Pins:</AlertDialogTitle>
                    </AlertDialogHeader>
                    {pins.length > 0  ? (
                        pins.map((pin) => (
                            <div onClick={() => goToPin(pin.pinLat, pin.pinLng)} key={pin.id} className="hover:cursor-pointer hover:bg-gray-200 p-2 rounded-2xl">
                                <div>{pin.pinUsername}</div>
                                <div>{pin.pinName}</div>
                                <div>{pin.pinAddress}</div>
                                <div>{pin.pinLat} {pin.pinLng}</div>
                            </div>
                        ))
                    ): (
                        <div className="text-center">You have no pins. Create one by searching or clicking on the map!</div>
                    )}
                </div>
                <AlertDialogFooter >
                    <AlertDialogCancel className="w-full bg-black/80 text-white">Exit</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
