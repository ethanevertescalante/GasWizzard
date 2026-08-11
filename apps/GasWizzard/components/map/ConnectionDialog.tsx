import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { pinType } from "@/lib/pins";
import {connectionForm, ConnectionForm} from "@/lib/ZodForms";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {Input} from "@/components/ui/input";

type ConnectionDialogProps = {
    pins: pinType[];
    startPin: pinType;
    onClose: () => void;
};

const timeframes = [
    { label: "Trip", value: "TRIP" },
    { label: "Week", value: "WEEK" },
    { label: "Work Week", value: "WORK-WEEK" },
    { label: "Month", value: "MONTH" },
    { label: "Year", value: "YEAR" },
];

const numbers = Array.from({ length: 16 }, (_, index) => ({
    label: String(index + 1),
    value: index + 1,
}));

export function ConnectionDialog({
                                     pins,
                                     startPin,
                                     onClose,
                                 }: ConnectionDialogProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ConnectionForm>({
        resolver: zodResolver(connectionForm),

        defaultValues: {
            startPinId: startPin.id,
        },
    });

    const onSubmit = async (data: ConnectionForm) => {
        console.log(data);

        // Call your create connection API here

        // Close after successful creation
        // onClose();
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
                                                    value={field.value ?? ""}
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
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value ?? ""}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a pin" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {pins
                                                                .filter((pin) => pin.id !== startPin.id)
                                                                .map((pin) => (
                                                                    <SelectItem
                                                                        key={pin.id}
                                                                        value={pin.pinUsername}
                                                                    >
                                                                        {pin.pinUsername}
                                                                    </SelectItem>
                                                                ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <FieldLabel>
                                            Number Of Trips
                                        </FieldLabel>
                                        <Controller
                                            name="numberOfTrips"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={
                                                        field.value !== undefined
                                                            ? String(field.value)
                                                            : ""
                                                    }
                                                    onValueChange={(value) =>
                                                        field.onChange(Number(value))
                                                    }
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Number of trips" />
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
                                            )}
                                        />
                                        <FieldLabel>
                                            Timeframe
                                        </FieldLabel>
                                        <Controller
                                            name="timeframe"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value ?? ""}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select timeframe" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {timeframes.map((timeframe) => (
                                                                <SelectItem
                                                                    key={timeframe.value}
                                                                    value={timeframe.label}
                                                                >
                                                                    {timeframe.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
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
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-orange-500 hover:bg-orange-300 px-4 py-2 font-bold text-white disabled:opacity-50"
                    >
                        {isSubmitting ? "Creating..." : "Create Connection"}
                    </button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}