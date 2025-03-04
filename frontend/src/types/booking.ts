import { ITable } from ".";
import { IPayment } from "./payment";
import { IProperty } from "./properties";
import { IUser } from "./user";
import { z } from "zod";

export interface IBooking extends ITable{
    renterId: number;
    propertyId: number;
    checkInDate: Date;
    checkOutDate: Date;
    status: EBookingStatus;
    property?: IProperty;
    renter?: IUser;
    Payment?: IPayment;
}

export enum EBookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELED = 'CANCELED'
}



    
export const bookingStepThreeSchema = z.object({
  numberOfRooms: z.number({
    invalid_type_error: "Number of rooms should be a number",
  }).min(1, "Number of rooms should be at least 1"),
  checkInDate: z.string({
    required_error: "Check-in date is required",
  }),
  checkOutDate: z.string({
    required_error: "Check-out date is required",
  }),
  guests: z.number().min(1),
});

export type IBookingStepThree = z.infer<typeof bookingStepThreeSchema>;