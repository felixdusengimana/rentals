"use client"
import PropertyBookingFirstStep from '@/src/components/PropertyBookingFirstStep';
import api from '@/src/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react'

export default function PropertyBooking() {
    const {id} = useParams() as {id:string};

    const { data: property, isLoading: isLoadingProperty, error } = useQuery({
        queryKey: ["property", id],
        queryFn: async () => {
          const response = await api.get(`/properties/${id}`);
          return response.data;
        },
        enabled: !!id,
    });
  return (
    <div>
        <PropertyBookingFirstStep onNext={()=>{}} onPrevious={()=>{}} hasNext hasPrevious property={property}/>
    </div>
  )
}
