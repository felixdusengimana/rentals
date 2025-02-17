import { ITable } from ".";

export interface IProperty extends ITable {
    name: string;
    description: string;
    images: string[];
    pricePerNight: number;
    children?: IProperty[];
    location: string;
    parentId?: string;
    propertyType: string;
    status: string;
}