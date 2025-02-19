import { ITable } from ".";
import { IPayment } from "./payment";
import { IProperty } from "./properties";
import { IUser } from "./user";

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
    