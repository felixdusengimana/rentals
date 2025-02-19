import { BiMap } from "react-icons/bi";
import Loader from "./ui/Loader";
import HomePropertyCard from "./HomePropertyCard";
import { IProperty } from "../types/properties";

export default function PropertiesGrid({isError, isLoading, properties}:{properties:IProperty[], isLoading: boolean; isError: boolean}) {

    if (isLoading) {
      return (
        <div className="py-12 flex justify-center">
          <Loader/>
        </div>
      );
    }
  
    if (isError) {
      return (
        <div className="py-12 text-red-600 p-4 rounded-lg inline-block">
            <p>Error loading properties. Please try again later.</p>
        </div>
      );
    }
  
    return (
      <div className="relative">
        <button className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md px-4 py-2 text-sm font-medium flex items-center space-x-2 text-blue-600">
          <BiMap className="h-4 w-4" />
          <span>View in map</span>
        </button>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
          {properties?.map((property: IProperty) => (
            <HomePropertyCard key={property.id} property={property} />
          ))}
          
          {properties?.length === 0 && (
            <div className="col-span-full py-12">
              <p className="text-gray-500">No properties found</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  