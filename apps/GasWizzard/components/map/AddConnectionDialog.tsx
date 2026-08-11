import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { pinType } from "@/lib/pins";
import {connectionForm, ConnectionForm} from "@/lib/ZodForms";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";




import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {createConnection} from "@/lib/connection";

type ConnectionDialogProps = {
    pins: pinType[];
    startPin: pinType;
    onClose: () => void;
};

const timeframes = [
    { label: "Trip (1 Day)", value: "TRIP" },
    { label: "Work Week (5 Days)", value: "WORK-WEEK" },
    { label: "Week (7 Days)", value: "WEEK" },
    { label: "Month (30 days)", value: "MONTH" },
    { label: "Year (365 Days)", value: "YEAR" },
];

const numbers = Array.from({ length: 7 }, (_, index) => ({
    label: String(index + 1),
    value: index + 1,
}));

export function AddConnectionDialog({
                                     pins,
                                     startPin,
                                     onClose,
                                 }: ConnectionDialogProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<ConnectionForm>({
        resolver: zodResolver(connectionForm),
        mode: "onChange",

        defaultValues: {
            startPinId: startPin.id,
            numberOfTrips: 1,
            roundTrip: false,
        },
    });

    const onSubmit = async (data: ConnectionForm) => {
        console.log(data);
        await createConnection(data);
        // Close after successful creation
        onClose();
    };

    return (
        <AlertDialog
            open={true}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <AlertDialogContent className="flex flex-col justify-center w-full md:h-auto">
                <div className=" w-full">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Create A Connection
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <form
                        id="connection-form"
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col w-full"
                    >
                        <input
                            type="hidden"
                            {...register("startPinId")}
                        />

                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field >
                                        <FieldLabel>
                                            Connection Name
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            {...register("connectionUsername")}
                                            placeholder="Commute"
                                            className="rounded-md border border-gray-300 shadow-sm"
                                        />
                                        {errors.connectionUsername && (
                                            <p className="text-red-500">
                                                {errors.connectionUsername.message}
                                            </p>
                                        )}
                                    </Field>
                                    <div className="flex flex-col gap-2">
                                        <FieldLabel>
                                            Start Pin
                                        </FieldLabel>
                                        <Controller
                                            name="startPinId"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    disabled={true}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue>{startPin.pinUsername}</SelectValue>
                                                    </SelectTrigger>
                                                </Select>
                                            )}
                                        />
                                        <FieldLabel>
                                            End Pin
                                        </FieldLabel>
                                        <Controller
                                            name="endPinId"
                                            control={control}
                                            render={({ field }) => {
                                                const selectedEndPinId = pins.find(
                                                    (pin ) => pin.id === field.value
                                                );

                                                return(
                                                    <Select
                                                        value={field.value ?? ""}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a pin">
                                                                {selectedEndPinId?.pinUsername}
                                                            </SelectValue>
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {pins
                                                                    .filter((pin) => pin.id !== startPin.id)
                                                                    .map((pin) => (
                                                                        <SelectItem
                                                                            key={pin.id}
                                                                            value={pin.id}
                                                                        >
                                                                            {pin.pinUsername}
                                                                        </SelectItem>
                                                                    ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                )

                                            }}
                                        />
                                        <FieldLabel>
                                            Number Of Trips
                                        </FieldLabel>
                                        <Controller
                                            name="numberOfTrips"
                                            control={control}
                                            render={({ field }) => {
                                                const selectedNumberOfTrips = numbers.find(
                                                    (number) => number.value === field.value
                                                );

                                                return (
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={(value) =>
                                                            field.onChange(Number(value))
                                                        }
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Number of trips" >
                                                                {selectedNumberOfTrips?.label}
                                                            </SelectValue>
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {numbers.map((number) => (
                                                                    <SelectItem
                                                                        key={number.value}
                                                                        value={String(number.value)}
                                                                    >
                                                                        {number.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                );

                                            }}
                                        />
                                        <FieldLabel>
                                            Timeframe
                                        </FieldLabel>
                                        <Controller
                                            name="timeframe"
                                            control={control}
                                            render={({ field }) => {
                                                const selectedTimeframe = timeframes.find(
                                                    (timeframe) => timeframe.value === field.value
                                                );

                                                return (
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select timeframe">
                                                                {selectedTimeframe?.label}
                                                            </SelectValue>
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {timeframes.map((timeframe) => (
                                                                    <SelectItem
                                                                        key={timeframe.value}
                                                                        value={timeframe.value}
                                                                    >
                                                                        {timeframe.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />

                                    </div>
                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                        <Controller
                                name="roundTrip"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center gap-2 pt-3">
                                        <Checkbox
                                            id="round-trip-checkbox"
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked);
                                            }}
                                        />

                                        <Label htmlFor="round-trip-checkbox">
                                            Round Trip?
                                        </Label>
                                    </div>
                                )}/>

                    </form>
                </div>
                <div className="flex flex-col justify-center gap-3">
                        <AlertDialogCancel
                            type="button"
                            className="w-full rounded-md bg-black/80 text-white px-4 py-2 font-bold disabled:opacity-50"
                        >
                            Exit
                        </AlertDialogCancel>

                    <button
                        type="submit"
                        form="connection-form"
                        disabled={isSubmitting || !isValid}
                        className="w-full rounded-md bg-orange-500 disabled:cursor-not-allowed  px-4 py-2 font-bold text-white disabled:opacity-50"
                    >
                        {isSubmitting ? "Creating..." : "Create Connection"}
                    </button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}