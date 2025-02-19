"use client"
import PropertiesGrid from "@/src/components/PropertiesGrid";
import { fetchProperties } from "@/src/services/properties";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Home(){
  const {id} = useParams() as {id: string};

  const { data: properties, isLoading, isFetching, isPending, isError } = useQuery({
    queryKey: ['properties',id],
    queryFn: ()=>fetchProperties({parentId: id}),
    enabled: !!id
  });
  
  return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-4">
          
        </div>
        <main className="max-w-7xl mx-auto px-4">
          <PropertiesGrid properties={properties?.data??[]} isLoading={isLoading||isFetching||isPending} isError={isError}/>
        </main>
      </div>
  );
};
