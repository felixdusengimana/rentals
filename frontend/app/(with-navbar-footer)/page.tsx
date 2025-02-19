"use client"
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import HomeTravelFIlters from '@/src/components/HomeTravelFIlters';
import PropertiesGrid from '@/src/components/PropertiesGrid';
import { fetchProperties } from '@/src/services/properties';




export default function Home(){
  const [filters, setFilters] = React.useState<{category?: string, location?: string, dateRange?: {start: string, end: string}, guests?: Record<string, number>}>();

  const { data: properties, isLoading, isFetching, isPending, isError } = useQuery({
    queryKey: ['properties', filters?.category, filters?.location],
    queryFn: ()=>fetchProperties({category: filters?.category}),
  });

  return (
      <div className="min-h-screen bg-gray-50">
        <div className='pt-10 bg-white'>
        <HomeTravelFIlters handleFilters={(s)=>setFilters(s)}/>
        </div>
        <main className="max-w-7xl mx-auto px-4">
          <PropertiesGrid properties={properties?.data??[]} isLoading={isLoading||isFetching||isPending} isError={isError}/>
        </main>
      </div>
  );
};

