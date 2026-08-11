import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import {connectionType} from "@/lib/connection";

type PinDialogProps = {
    connections: connectionType[]
    loadConnections: () => Promise<void>
}

export function ConnectionDialog({
                              connections,
                              loadConnections,
                          }: PinDialogProps) {

    const [ConnectionsDialogOpen, setConnectionsDialogOpen] = useState(false);

    async function onConnectionsButtonClick() {
        await loadConnections();
    }



    return (
        <AlertDialog
            open={ConnectionsDialogOpen}
            onOpenChange={setConnectionsDialogOpen}
        >
            <AlertDialogTrigger onClick={(e) => e.stopPropagation()} render={<button className="w-full text-left cursor-pointer" onClick={onConnectionsButtonClick}>My Connections</button>} />
            <AlertDialogContent className="h-2/3 md:h-auto">
                <div className="h-full overflow-y-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle>My Connections:</AlertDialogTitle>
                    </AlertDialogHeader>
                    {connections.length > 0  ? (
                        connections.map((connection) => (
                            <div key={connection.id} className="block justify-left gap-2 text-nowrap hover:cursor-pointer hover:bg-gray-200 p-2 rounded-2xl">
                                <div>{connection.connectionUsername}</div>
                                <div>{connection.numberOfTrips} {connection.timeframe}</div>
                                <div></div>
                                <div>
                                    Round Trip?: {connection.roundTrip ? (
                                        <span>Yes</span>
                                ) : (
                                    <span>No</span>
                                )}
                                </div>
                            </div>
                        ))
                    ): (
                        <div className="text-center">You have no connections. Make one by clicking on a pin!</div>
                    )}
                </div>
                <AlertDialogFooter >
                    <AlertDialogCancel className="w-full bg-black/80 text-white">Exit</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
