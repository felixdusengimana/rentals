"use client"
import useAuth from '@/src/hooks/useAuth';
import { ERole } from '@/src/types/user';
import api from '@/src/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

const RentalAgreement = () => {
  const {user, refetchUser} = useAuth();
  const router = useRouter();

  const {mutate, isPending} = useMutation({
    mutationFn: async () => {
      await api.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user?.id}/role`, {
        role: ERole.HOST
      });
    },
    onSuccess: () => {
      refetchUser();
      router.replace('/list-property');
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold">LALA <span className='text-xs'>for</span></h1>
          <span className="text-red-500 text-2xl font-bold">HOST</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Rental Hosting Agreement</h2>
              <p className="text-gray-600 mb-6">Before you become a host, please review the following terms:</p>
            </div>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                <p>You must provide accurate property details.</p>
              </li>
              <li className="flex gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                <p>No fraudulent or misleading listings are allowed.</p>
              </li>
              <li className="flex gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                <p>You are responsible for property maintenance and guest satisfaction.</p>
              </li>
              <li className="flex gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                <p>All transactions must comply with local regulations.</p>
              </li>
            </ul>

            <button onClick={()=>mutate()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              {isPending ? "Hold on a bit" : "I agree to the terms and want to become a host"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalAgreement;