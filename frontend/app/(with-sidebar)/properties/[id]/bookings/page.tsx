"use client"
import ChangeBookingStatus from '@/src/components/ChangeBookingStatus';
import PageLayout from '@/src/components/PageLayout';
import Dropdown from '@/src/components/ui/Dropdown';
import { CustomTable } from '@/src/components/ui/Table';
import ViewPayment from '@/src/components/ViewPayment';
import useAuth from '@/src/hooks/useAuth';
import { IPaginatedResponse } from '@/src/types';
import { EBookingStatus, IBooking } from '@/src/types/booking';
import { EPaymentStatus } from '@/src/types/payment';
import api from '@/src/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useParams } from 'next/navigation';
import React from 'react'
import { useState } from 'react';
import { BiDotsHorizontal} from 'react-icons/bi';
import { GiCancel, GiConfirmed } from 'react-icons/gi';
import { HiEye } from 'react-icons/hi';

export default function BookingsList() {
    const {id} = useParams() as {id:string};

    const { data: property, isLoading: isLoadingProperty, error } = useQuery({
        queryKey: ["property", id],
        queryFn: async () => {
          const response = await api.get(`/properties/${id}`);
          return response.data;
        },
        enabled: !!id,
    });

    const {user} = useAuth();
    const { data: properties, isPending, isFetching, isLoading } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
          const res = await api.get<IPaginatedResponse<IBooking>>(`${process.env.NEXT_PUBLIC_BASE_URL}/bookings?propertyId=${id}`);
          return res.data;
        },
        retry: 3,
        enabled: !!id,
    });

    const columnHelper = createColumnHelper<IBooking>();


    const [columns] = useState([
        columnHelper.accessor('renter.name', {
            id: 'title',
            header: () => <span>Renter Name</span>,
            cell: (info) => <span className="font-medium">{info.getValue()}</span>,
            footer: (info) => info.column.id,
          }),
            columnHelper.accessor('renter.email', {
                id: 'pricePerNight',
                header: () => <span>Render Email</span>,
                cell: (info) => <span>{info.getValue()}</span>,
                footer: (info) => info.column.id,
            }),

            columnHelper.accessor('checkInDate', {
                id: 'location',
                header: () => <span>Check In Date/Check Out Date</span>,
                cell: (info) => <span>{
                    new Date(info.getValue()).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })} - {new Date(info.row.original.checkOutDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })
                    }</span>,
                footer: (info) => info.column.id,
            }),
            

            columnHelper.accessor('status', {
                id: 'status',
                header: () => <span>Status</span>,
                cell: (info) => <span>{info.getValue()}</span>,
                footer: (info) => info.column.id,
            }),

            columnHelper.accessor('property.title', {
              id: 'property',
              header: () => <span>Rented Property</span>,
              cell: (info) => <span>{info.getValue()}</span>,
              footer: (info) => info.column.id,
            }),

            columnHelper.accessor('Payment.amount', {
              id: 'amount',
              header: () => <span>Amount</span>,
              cell: (info) => <span>{info.getValue()}</span>,
              footer: (info) => info.column.id,
            }),

            columnHelper.accessor('Payment.status', {
              id: 'paymentStatus',
              header: () => <span>Payment Status</span>,
              cell: (info) => <span>{info.getValue()}</span>,
              footer: (info) => info.column.id,
            }),

            columnHelper.accessor('property.id', {
                id: 'actions',
                header: () => <span>Actions</span>,
                cell: (info) => <p className='flex items-center'>
                    <Dropdown trigger={<BiDotsHorizontal />}>
                        {info.row.original.Payment?.status==EPaymentStatus.PAID&&<ViewPayment
                        id={info.row.original?.Payment?.id!}
                        trigger={
                          <p
                        className='flex items-center cursor-pointer gap-1 p-2 border-b '
                        >
                            <HiEye/>
                            <span>View Paymeny</span>
                        </p>
                        }
                        />}
                          
                         {info.row.original.status==EBookingStatus.PENDING&&<>
                          <ChangeBookingStatus
                        trigger={
                            <p className='flex text-blue-500 items-center cursor-pointer gap-1 p-2 border-b '>
                                <GiConfirmed/>
                                <span>Confirm Booking</span>
                            </p>
                        }
                        booking={info.row.original}
                        newStatus={EBookingStatus.CONFIRMED}
                        />    

                        <ChangeBookingStatus
                        trigger={
                            <p className='flex items-center text-red-500 cursor-pointer gap-1 p-2 border-b '>
                                <GiCancel/>
                                <span>Cancel Booking</span>
                            </p>
                        }
                        
                        booking={info.row.original}
                        newStatus={EBookingStatus.CANCELED}
                        />
                         </>}
                        </Dropdown>
                </p>,
                footer: (info) => info.column.id,
            }),
        
    ]);

    const table = useReactTable({
        data: properties?.data || [],
        columns,
        // state: {
        //   columnVisibility,
        //   rowSelection,
        // },
        // onRowSelectionChange: setRowSelection,
        // onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
    });
  return (
    <PageLayout>
        <div className='flex justify-between items-center mb-4'>
            <div className=''>
                <h1 className="text-2xl font-semibold">Bookings</h1>
                <p className='text-gray-500 text-sm'>
                    List of all bookings for <span className='text-blue-500'>{property?.title}</span>
                </p>
            </div>
        </div>
        <CustomTable table={table} loading={isPending||isFetching||isLoading}/>
    </PageLayout>
  )
}
