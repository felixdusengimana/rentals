"use client"
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IProperty } from '@/src/types/properties';
import HomeTravelFIlters from '@/src/components/HomeTravelFIlters';
import PropertiesGrid from '@/src/components/PropertiesGrid';
import { objectToQueryString } from '@/src/utils/queryParam';
import { IPaginatedResponse } from '@/src/types';


const fetchProperties = async ({category}:{category?: string}) => {
  const queryString = objectToQueryString({category});
  const { data } = await axios.get<IPaginatedResponse<IProperty>>(`${process.env.NEXT_PUBLIC_BASE_URL}/properties?${queryString}`);
  return data;
};



export default function Home(){
  const [filters, setFilters] = React.useState<{category?: string, location?: string, dateRange?: {start: string, end: string}, guests?: Record<string, number>}>();

  const { data: properties, isLoading, isError } = useQuery({
    queryKey: ['properties'],
    queryFn: ()=>fetchProperties({category: filters?.category}),
  });


  return (
      <div className="min-h-screen bg-gray-50">
        <div className='pt-10 bg-white'>
        <HomeTravelFIlters handleFilters={(s)=>setFilters(s)}/>
        </div>
        <main className="max-w-7xl mx-auto px-4">
          <PropertiesGrid properties={properties?.data??[]} isLoading={isLoading} isError={isError}/>
        </main>
      </div>
  );
};

