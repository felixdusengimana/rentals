import React, { useRef } from 'react';
import { EStatus, IProperty } from "@/src/types/properties";
import { ReactNode } from 'react';
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/axios';
import Button from './ui/Button';
import CustomDialog, { CustomDialogRef } from './ui/Dialog';
import { HiEye, HiEyeOff, HiTrash } from 'react-icons/hi';

const ChangePropertyStatus = ({ trigger, property, newStatus }: { trigger: ReactNode, property: IProperty, newStatus: EStatus }) => {
    const queryClient = useQueryClient();
    const modalRef = useRef<CustomDialogRef>(null);

    const { mutate: update, isPending: isUpdating } = useMutation({
        onSuccess() {
            toast.success(`${newStatus===EStatus.DELETED?"Deleting":"Updating"} successful!`, { id: "register" });
            queryClient.invalidateQueries({
                queryKey: ["properties"],
            });
            modalRef.current?.close();
        },
        onError(error) {
            // @ts-ignore
            toast.error(`${error?.response?.data?.message??error.message ?? `${newStatus===EStatus.DELETED?"Deleting":"Updating"} failed!`}`, {
                id: "register",
            });
        },
        mutationFn: () => api.put(`/properties/${property?.id}/status`, { status: newStatus }),
    });

    return (
        <CustomDialog
            title={`Change property status of ${property?.title}`}
            ref={modalRef} trigger={trigger}>
            <div className='text-center'>
                Are you sure you want to {newStatus === EStatus.INACTIVE ? "deactivate" : "activate"} this property?
                {
                    newStatus=== EStatus.INACTIVE ? <p className='text-red-500 flex gap-2 flex-col items-center text-center'> <HiEyeOff className="text-red-500" /> <span>If you deactivate this property, it will no longer be visible to users.</span>  </p> :
                    newStatus=== EStatus.ACTIVE ?<p className='text-red-500 flex gap-2 flex-col items-center text-center'><HiEye className="text-green-500" /> <span>If you activate this property, it will be visible to users.</span></p>:
                    <p className='text-red-500 flex gap-2 flex-col items-center text-center'><HiTrash className="text-red-500" /> <span>If you delete this property, it will be removed from the system.</span></p>
                }

            </div>
            <div className="flex justify-end gap-2 mt-3">

                <Button
                    onClick={() => {
                        toast.loading("Updating property...", { id: "register" });
                        update();
                    }}
                    isLoading={isUpdating}
                    className="bg-primary text-white"
                >
                    {newStatus==EStatus.INACTIVE ? "Deactivate" : newStatus==EStatus.ACTIVE ?"Activate":"Delete"}
                </Button>
                <Button
                    onClick={() => {
                        modalRef.current?.close();
                    }}
                    className="bg-red-500 text-white"
                >
                    Cancel
                </Button>
            </div>
        </CustomDialog>
    );
};

export default ChangePropertyStatus;