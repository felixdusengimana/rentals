"use client"
import AddProperty from '@/src/components/AddProperty';
import ChangePropertyStatus from '@/src/components/ChangePropertyStatus';
import PageLayout from '@/src/components/PageLayout';
import Button from '@/src/components/ui/Button';
import Dropdown from '@/src/components/ui/Dropdown';
import { CustomTable } from '@/src/components/ui/Table';
import useAuth from '@/src/hooks/useAuth';
import { IPaginatedResponse } from '@/src/types';
import { EStatus, IProperty } from '@/src/types/properties';
import api from '@/src/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import { BiDotsHorizontal, BiPen, BiTrash } from 'react-icons/bi';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function PropertiesList() {
    const {user} = useAuth();
    const { data: properties, isPending, isFetching, isLoading } = useQuery({
        queryKey: ["properties", user?.id],
        queryFn: async () => {
          const res = await api.get<IPaginatedResponse<IProperty>>(`${process.env.NEXT_PUBLIC_BASE_URL}/properties/by-user/${user?.id}`);
          return res.data;
        },
        retry: 3,
        enabled: !!user,
    });

    const columnHelper = createColumnHelper<IProperty>();


    const [columns] = useState([
        columnHelper.accessor('title', {
            id: 'title',
            header: () => <span>Property name</span>,
            cell: (info) => <span className="font-medium">{info.getValue()}</span>,
            footer: (info) => info.column.id,
          }),
            columnHelper.accessor('pricePerNight', {
                id: 'pricePerNight',
                header: () => <span>Price per night</span>,
                cell: (info) => <span>{info.getValue()}</span>,
                footer: (info) => info.column.id,
            }),

            columnHelper.accessor('location', {
                id: 'location',
                header: () => <span>Location</span>,
                cell: (info) => <span>{info.getValue()}</span>,
                footer: (info) => info.column.id,
            }),

            columnHelper.accessor('status', {
                id: 'status',
                header: () => <span>Status</span>,
                cell: (info) => <span>{info.getValue()}</span>,
                footer: (info) => info.column.id,
            }),

            columnHelper.accessor('createdAt', {
                id: 'createdAt',
                header: () => <span>Created At</span>,
                cell: (info) => <span>{
                    new Date(info.getValue()).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })
                    }</span>,
                footer: (info) => info.column.id,
            }),

            columnHelper.accessor('updatedAt', {
                id: 'updatedAt',
                header: () => <span>Updated At</span>,
                cell: (info) => <span>{
                    new Date(info.getValue()).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })
                    }</span>,
                footer: (info) => info.column.id,
            }),

            columnHelper.accessor('parentId', {
                id: 'actions',
                header: () => <span>Actions</span>,
                cell: (info) => <p className='flex items-center'>
                    <Dropdown trigger={<BiDotsHorizontal />}>
                        <Link
                        className='flex items-center cursor-pointer gap-1 p-2 border-b '
                        href={`/properties/${info.row.original.id}/bookings`}
                        >
                            <HiEye/>
                            <span>View Bookings</span>
                        </Link>
                        {info.row.original.status==EStatus.ACTIVE&&<AddProperty property={info.row.original} trigger={<p className='flex items-center cursor-pointer gap-1 p-2 border-b '>
                            <BiPen/>
                            <span>Edit</span>
                        </p>}/>}
                        {info.row.original.status!==EStatus.DELETED&&<ChangePropertyStatus
                        newStatus={info.row.original.status===EStatus.INACTIVE ? EStatus.ACTIVE : EStatus.INACTIVE}
                        property={info.row.original}
                        trigger={<p className='flex items-center cursor-pointer gap-1 p-2 border-b'>
                            {info.row.original.status===EStatus.INACTIVE ? <HiEye/> : <HiEyeOff/>}
                            <span>{info.row.original.status===EStatus.INACTIVE ? 'Activate' : 'Deactivate'}</span>
                        </p>}
                        />}
                        {info.row.original.status!==EStatus.DELETED&&
                        <ChangePropertyStatus
                        newStatus={EStatus.DELETED}
                        property={info.row.original}
                        trigger={<p className='flex text-red-500 items-center cursor-pointer gap-1 p-2'>
                            <BiTrash/>
                            <span>Delete</span>
                        </p>}
                        />
                        }
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
                <h1 className="text-2xl font-semibold">Properties</h1>
                <p className='text-gray-500 text-sm'>
                    List of all properties you have added
                </p>
            </div>
            <AddProperty  trigger={<Button>Add Property</Button>}/>
        </div>
        <CustomTable table={table} loading={isPending||isFetching||isLoading}/>
    </PageLayout>
  )
}
