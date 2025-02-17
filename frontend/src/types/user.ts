import { ITable } from ".";

export interface IUser extends ITable{
    googleId: string;
    email: string;
    name: string;
    role: string;
    photo: string;
}