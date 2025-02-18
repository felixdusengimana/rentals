"use client"
import { IProperty } from '@/src/types/properties';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProperties = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/properties`);
  return data;
};

export default function Home() { 

  const { data: properties, isLoading, isError } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error fetching properties</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property: IProperty) => (
          <div key={property.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={property.images?.[0]} alt={property.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600">{property.description}</p>
            <p className="text-lg font-bold mt-2">${property.pricePerNight} / night</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
