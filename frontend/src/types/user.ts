import { ITable } from ".";

export interface IUser extends ITable{
    googleId: string;
    email: string;
    name: string;
    role: string;
    photo: string;
}

export enum ERole{
    ADMIN = "ADMIN",
    RENTER = "RENTER",
    HOST = "HOST",
}