
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import DatePicker, { DateObject } from "react-multi-date-picker";
  import { useEffect } from "react";
import Input from "./ui/Input";
import { getDaysBetweenDates } from "../utils/date";
import { bookingStepThreeSchema, IBooking, IBookingStepThree } from "../types/booking";
import Button from "./ui/Button";
  
  function RangeCustomInput({ openCalendar, value }: any) {
    const valueAsArray = value?.split("~");
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
          />
          <Input
            name="checkOut"
            type="text"
            label="Check-out"
            value={valueAsArray?.[1]}
            placeholder="Check-out"
            onFocus={openCalendar}
            readOnly
          />
        </div>
        {valueAsArray?.length > 1 && (
          <p className="font-bold text-co-blue text-sm mt-1">
            {getDaysBetweenDates(valueAsArray[0], valueAsArray[1])} nights
          </p>
        )}
      </>
    );
  }
  
  interface BookingInfoProps {
    handleFormChange: (data: Partial<IBooking>) => void;
    roomAmount: number;
    handleGoNext: () => void;
    handleBack: ()=>void;
    formData: IBookingStepThree;
  }
  
  export default function BookingStepThree({
    handleFormChange,
    roomAmount,
    handleGoNext,
    formData,
  }: BookingInfoProps) {
    const {
      register,
      watch,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm<IBookingStepThree>({
      resolver: zodResolver(bookingStepThreeSchema),
      defaultValues: {
        amount: formData?.amount,
        numberOfRooms: formData?.numberOfRooms,
        guests: formData?.guests,
        checkIn: formData?.checkIn,
        checkOut: formData?.checkOut,
      },
    });
  
    const calculateAmountToPay = (rooms: number, nights: number) => {
      const amount = rooms * nights * roomAmount;
      setValue("amount", amount);
    };
  
    const onSubmit = (data: IBookingStepThree) => {
      handleGoNext?.();
    };
  
    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");
    const numberOfRooms = watch("numberOfRooms");
  
    useEffect(() => {
      let dayDiff = 1;
      if (checkIn && checkOut) {
        dayDiff = getDaysBetweenDates(checkIn, checkOut);
      }
  
      if (numberOfRooms > 0 && dayDiff > 0) {
        calculateAmountToPay(numberOfRooms, dayDiff);
      }
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberOfRooms, checkIn, checkOut]);
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <DatePicker
          numberOfMonths={2}
          range
          minDate={new Date().setDate(new Date().getDate() + 1)}
          mapDays={({ date }) => {
            const isDisabled =
              new Date(date as any) > new Date(2023, 7, 14) &&
              new Date(date as any) < new Date(2023, 7, 25);
  
            return {
              style: {
                backgroundColor: isDisabled ? "brown" : "",
                color: isDisabled ? "white" : "",
              },
              disabled: isDisabled,
            };
          }}
          value={[checkIn, checkOut]}
          onChange={(dateObject: DateObject[]) => {
            if (dateObject.length > 1) {
              setValue("checkIn", dateObject[0].format(), {
                shouldValidate: true,
              });
              setValue("checkOut", dateObject[1].format(), {
                shouldValidate: true,
              });
            }
          }}
          render={<RangeCustomInput />}
        >
          <div className="w-full flex justify-end items-center gap-3 px-3 py-3">
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <p className="text-sm">Reserved days</p>
            </div>
  
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <p className="text-sm">Out of service</p>
            </div>
          </div>
        </DatePicker>
        {(errors.checkIn?.message || errors.checkOut?.message) && (
          <p className="text-red-500 text-xs">
            {errors.checkIn?.message}, {errors.checkOut?.message}
          </p>
        )}
  
        <div className="mt-3">
          <Input
            {...register("numberOfRooms", { valueAsNumber: true })}
            name="numberOfRooms"
            label="Number of Rooms"
            error={errors.numberOfRooms?.message}
          />
        </div>
        <div className="mt-3">
          <Input
            {...register("guests", { valueAsNumber: true })}
            error={errors.guests?.message}
            name="guests"
            label="Number of Guests"
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <p className="text-co-black font-bold text-base">Amount to pay:</p>
          <p className="text-co-blue font-bold text-base">${watch("amount")}</p>
        </div>
  
        <div className="flex gap-3">
          <Button
            disabled={Object.values(errors).length > 0}
            className="mt-5 bg-co-blue text-white hover:bg-blue-700 border-0"
          >
            Next
          </Button>

          <Button
            disabled={Object.values(errors).length > 0}
            className="mt-5 bg-co-blue text-white hover:bg-blue-700 border-0"
          >
            Back
          </Button>
        </div>
      </form>
    );
  }