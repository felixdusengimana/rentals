import React, { useRef } from 'react';
import { ReactNode } from 'react';
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/axios';
import Button from './ui/Button';
import CustomDialog, { CustomDialogRef } from './ui/Dialog';
import { EBookingStatus, IBooking } from '../types/booking';
import useAuth from '../hooks/useAuth';

const ChangeBookingStatus = ({ trigger, booking, newStatus }: { trigger: ReactNode, booking: IBooking, newStatus: EBookingStatus }) => {
    const queryClient = useQueryClient();
    const {user} = useAuth();
    const modalRef = useRef<CustomDialogRef>(null);

    const { mutate: update, isPending: isUpdating } = useMutation({
        onSuccess() {
            toast.success(`Booking ${newStatus===EBookingStatus.CANCELED?"cancelled":"confirmed"} successful!`, { id: "register" });
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
            modalRef.current?.close();
        },
        onError(error) {
            // @ts-ignore
            toast.error(`${error?.response?.data?.message??error.message ?? `${newStatus===EBookingStatus.CANCELED?"Cancelling":"Confirming"} booking failed!`}`, {
                id: "register",
            });
        },
        mutationFn: () => api.put(`/bookings/${newStatus===EBookingStatus.CANCELED?"cancel":"confirm"}`, { 
            bookingId: booking?.id,
            hostEmail: user?.email,
            renterEmail: booking?.renter?.email
         }),
    });

    return (
        <CustomDialog
            title={``}
            ref={modalRef} trigger={trigger}>
            <div className='text-center'>
                <h1
                className="text-xl font-semibold mt-2"
                >
                Change booking status of {booking?.renter?.name} in {booking?.property?.title}
                </h1>
                Are you sure you want to {newStatus === EBookingStatus.CANCELED ? "cancel" : "confirm"} this booking?
            </div>
            <div className="flex justify-end gap-2 mt-3">

                <Button
                    onClick={() => {
                        toast.loading("Updating booking...", { id: "register" });
                        update();
                    }}
                    isLoading={isUpdating}
                    className="bg-primary text-white"
                >
                    {newStatus==EBookingStatus.CANCELED ? "Cancel" : "Confirm"}
                </Button>
                <Button
                    onClick={() => {
                        modalRef.current?.close();
                    }}
                    className="bg-red-500 text-white"
                >
                    Close
                </Button>
            </div>
        </CustomDialog>
    );
};

export default ChangeBookingStatus;