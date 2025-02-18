import { z } from "zod";
import { ITable } from ".";

export interface IProperty extends ITable {
    title: string;
    description: string;
    images: string[];
    pricePerNight: number;
    children?: IProperty[];
    location: string;
    parentId?: string;
    propertyType: string;
    status: string;
}

export const PROPERTY_TYPES = [
    'APARTMENT',
    'HOUSE',
    'STUDIO',
    'VILLA',
    'CONDO',
    'TOWNHOUSE',
    'CABIN',
    'LOFT',
    'COTTAGE',
    'MANSION',
    'HOTEL'
  ];

  export enum EPropertyType {
    APARTMENT = 'APARTMENT',
    HOUSE = 'HOUSE',
    STUDIO = 'STUDIO',
    VILLA = 'VILLA',
    CONDO = 'CONDO',
    TOWNHOUSE = 'TOWNHOUSE',
    CABIN = 'CABIN',
    LOFT = 'LOFT',
    COTTAGE = 'COTTAGE',
    MANSION = 'MANSION',
    HOTEL = 'HOTEL'
  }

  
export const addPropertySchema = z.object({
    title: z.string({
        required_error: "Name is required",
    }).min(3, "Name is too short").max(255, "Name is too long"),
    description: z.string({
        required_error: "Description is required",
    }).min(3, "Description is too short"),
    images: z.array(z.string().url(
        {
            message: "Invalid image URL"
        }
    )).min(1, "At least one image is required"),
    pricePerNight: z.number({
        required_error: "Price per night is required",
    }).min(1, "Price per night is too low"),
    location: z.string({
        required_error: "Location is required",
    }).min(3, "Location is too short"),
    parentId: z.string().optional(),
    propertyType: z.string({
        required_error: "Property type is required",
    }),
    hostId: z.number(),
})
export type IAddPropertyInputs = z.infer<typeof addPropertySchema>;