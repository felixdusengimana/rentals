"use client"
import PropertyBookingFirstStep from '@/src/components/PropertyBookingFirstStep';
import PropertyBookingSecondStep from '@/src/components/PropertyBookingSecondStep';
import PropertyBookingThirdStep from '@/src/components/PropertyBookingThirdStep';
import api from '@/src/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react'

export default function PropertyBooking() {
    const {id} = useParams() as {id:string};
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const search = searchParams.get('step')??'1';


    const { data: property} = useQuery({
        queryKey: ["property", id],
        queryFn: async () => {
          const response = await api.get(`/properties/${id}`);
          return response.data;
        },
        enabled: !!id,
    });
  
    const [step, setStep] = React.useState<number>(parseInt(search));

    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        return params.toString();
      },
      [searchParams]
    );

    const updateUrl = (step: number) => {
      router.push(`?${createQueryString('step', step.toString())}`);
    }
    
    const handleNext = () => {
      if(step >= 3) return;
      setStep(step + 1);
      updateUrl(step + 1);
    };

    const handlePrevious = () => {
      if(step <= 1) return;
      setStep(step- 1);
      updateUrl(step - 1);
    }

  useEffect(() => {
    if(!property) return;
    const search = searchParams.get('step')??'1';
    const step = parseInt(search);
    setStep(step);
  }, [property, search])    

  return (
    <div>
        {(!step || step === 1) && <PropertyBookingFirstStep property={property} onNext={handleNext} />}
        {step === 2 && <PropertyBookingSecondStep onNext={handleNext} onPrevious={handlePrevious} />}
        {step === 3 && <PropertyBookingThirdStep />}
    </div>
  )
}
