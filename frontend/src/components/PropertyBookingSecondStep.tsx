import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { use, useEffect, useState } from "react";
import Input from "./ui/Input";
import { getDaysBetweenDates } from "../utils/date";
import { bookingStepThreeSchema, IBookingStepThree } from "../types/booking";
import Button from "./ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../utils/axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

function RangeCustomInput({ openCalendar, value, errors }: {
    openCalendar?: () => void;
    value?: string;
    errors: {
        checkIn?: string;
        checkOut?: string;
    };
}) {
    const valueAsArray = value ? value?.split("~") : [];
    return (
        <>
            <div className="flex gap-2 justify-between">
                <Input
                    name="checkIn"
                    type="text"
                    label="Check-in"
                    value={valueAsArray?.[0]}
                    placeholder="Check-in"
                    onFocus={openCalendar}
                    readOnly
                    error={errors.checkIn}
                />
                <Input
                    name="checkOut"
                    type="text"
                    label="Check-out"
                    value={valueAsArray?.[1]}
                    placeholder="Check-out"
                    onFocus={openCalendar}
                    readOnly
                    error={errors.checkOut}
                />
            </div>
            {valueAsArray && valueAsArray?.length > 1 && (
                <p className="font-bold text-co-blue text-sm mt-1">
                    {getDaysBetweenDates(valueAsArray[0], valueAsArray[1])} nights
                </p>
            )}
        </>
    );
}

interface PropertyBookingSecondStepProps {
    onNext: () => void;
    onPrevious: () => void;
}

export default function PropertyBookingSecondStep({ onNext, onPrevious }: PropertyBookingSecondStepProps) {
    const { id } = useParams() as { id: string };
    const {user} = useAuth();

    const { data: property } = useQuery({
        queryKey: ["property", id],
        queryFn: async () => {
            const response = await api.get(`/properties/${id}`);
            return response.data;
        },
        enabled: !!id,
    });

    const { mutate, isPending: isUpdating } = useMutation({
        onSuccess() {
            onNext();
            toast.success("Booking successfully!", { id: "booking" });
        },
        onError(error) {
            // @ts-ignore
            toast.error(`${error?.response?.data?.message?? error.message ?? "Error while booking"}`, {
                id: "booking",
            });
        },
        mutationFn: (data: IBookingStepThree) => api.post(`/bookings`, {...data, renterId: user?.id, propertyId: id}),
    });

    const roomAmount = property?.pricePerNight || 0;

    const {
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IBookingStepThree>({
        resolver: zodResolver(bookingStepThreeSchema),
    });

    const [amount, setAmount] = useState(0);

    const calculateAmountToPay = (rooms: number, nights: number) => {
        setAmount(rooms * nights * roomAmount);
    };

    const onSubmit = (data: IBookingStepThree) => {
        toast.loading("Updating...", { id: "booking" });
        mutate(data);
    };

    const checkIn = watch("checkInDate");
    const checkOut = watch("checkOutDate");
    const numberOfRooms = watch("numberOfRooms");

    useEffect(() => {
        let dayDiff = 0;
        if (checkIn && checkOut) {
            dayDiff = getDaysBetweenDates(checkIn, checkOut);
        }

        if (numberOfRooms > 0 && dayDiff > 0) {
            calculateAmountToPay(numberOfRooms, dayDiff);
        }
    }, [numberOfRooms, checkIn, checkOut]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-md mx-auto py-10">
            <DatePicker
                numberOfMonths={2}
                range
                minDate={new Date().setDate(new Date().getDate() + 1)}
                value={[checkIn, checkOut]}
                onChange={(dateObject: DateObject[]) => {
                    if (dateObject.length > 1) {
                        setValue("checkInDate", dateObject[0].format(), { shouldValidate: true, shouldDirty: true });
                        setValue("checkOutDate", dateObject[1].format(), { shouldValidate: true, shouldDirty: true });
                    }
                }}
                render={<RangeCustomInput errors={{
                    checkIn: errors.checkInDate?.message,
                    checkOut: errors.checkOutDate?.message,
                }} />}
            />
            <div className="mt-3">
                <Input
                    onChange={(e) => setValue("numberOfRooms", parseInt(e.target.value), {
                        shouldDirty: true,
                        shouldValidate: true,
                    })}
                    name="numberOfRooms"
                    label="Number of Rooms"
                    error={errors.numberOfRooms?.message}
                />
            </div>
            <div className="mt-3">
                <Input
                    onChange={(e) => setValue("guests", parseInt(e.target.value), {
                        shouldDirty: true,
                        shouldValidate: true,
                    })}
                    error={errors.guests?.message}
                    name="guests"
                    label="Number of Guests"
                />
            </div>
            {amount > 0 && (
                <div className="flex items-center gap-2 mt-3">
                    <p className="text-co-black font-bold text-base">Amount to pay:</p>
                    <p className="text-co-blue font-bold text-base">${amount}</p>
                </div>
            )}

            <div className="flex gap-3 mt-3">
                <Button disabled={isUpdating} onClick={onPrevious} outline type="button">
                    Go Back
                </Button>
                <Button isLoading={isUpdating} type="submit">
                    Book Now
                </Button>
            </div>
        </form>
    );
}
