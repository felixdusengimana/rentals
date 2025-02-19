import React, { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPropertySchema, EStatus, IAddPropertyInputs, IProperty, PROPERTY_TYPES } from "@/src/types/properties";
import { ReactNode } from 'react';
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/axios';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Button from './ui/Button';
import CustomDialog, { CustomDialogRef } from './ui/Dialog';
import { IoClose } from 'react-icons/io5';
import Select from './ui/Select';
import useAuth from '../hooks/useAuth';

const AddProperty = ({ trigger, parent, property }: { trigger: ReactNode, parent?: IProperty, property?: IProperty }) => {
    const {user} = useAuth();
    const queryClient = useQueryClient();
    const modalRef = useRef<CustomDialogRef>(null);

    const {
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<IAddPropertyInputs>({
        resolver: zodResolver(addPropertySchema),
        defaultValues: {
            parentId: property ? parseInt(property?.id): parent? parseInt(parent?.id):undefined,
            images: property?.images??[""],
            propertyType:  property? property?.propertyType:parent?.propertyType,
            hostId: property? property?.hostId:parseInt(user?.id!),
            description: property?.description,
            location: property?.location,
            pricePerNight:  property?.pricePerNight,
            title: property?.title,
            propertyStatus: property?.status??EStatus.ACTIVE,
        },
    });

    const { mutate, isPending } = useMutation({
        onSuccess() {
            toast.success("Registration successful!", { id: "register" });
            queryClient.invalidateQueries({
                queryKey: ["properties"],
            });
            reset();
            modalRef.current?.close();
        },
        onError(error) {
            toast.error(`${error.message ?? "Registration failed!"}`, {
                id: "register",
            });
        },
        mutationFn: (data: IAddPropertyInputs) => api.post("/properties", data),
    });


    const { mutate: update, isPending: isUpdating } = useMutation({
        onSuccess() {
            toast.success("Updating successful!", { id: "register" });
            queryClient.invalidateQueries({
                queryKey: ["properties"],
            });
            reset();
            modalRef.current?.close();
        },
        onError(error) {
            toast.error(`${error.message ?? "Update failed!"}`, {
                id: "register",
            });
        },
        mutationFn: (data: IAddPropertyInputs) => api.put(`/properties/${property?.id}`, data),
    });


    const onSubmit = (data: IAddPropertyInputs) => {
        toast.loading(`${property?.id?"Updating...":"Registering..."}`, { id: "register" });
        const nwe = data.images.filter((url, index, self) => url && self.indexOf(url) === index);
        if (!parent?.id) delete data.parentId;
        if (property?.id) {
            update({ ...data, images: nwe });
        } else {
            mutate({ ...data, images: nwe });
        }
    };

    useEffect(()=>{
       if(parent){
              setValue('propertyType', parent.propertyType);
              setValue('parentId', parseInt(parent.id));
              setValue('hostId', parent?.hostId);
       }
    },[parent]);

    return (
        <CustomDialog 
        title={`${property?.id?"Update":"Add"} ${parent?.id?`Room in ${parent.title}`:"Property"} `}
        description={`Fill in the details to ${property?.id?"update":"add a new"} ${parent?.id?"room":"property"}`}
        ref={modalRef} trigger={trigger}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Name"
                    className="mb-4"
                    placeholder="John Doe"
                    error={errors.title?.message}
                    type="text"
                    onChange={(e) =>
                        setValue("title", e.target.value, {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                    value={watch("title")}
                />

                <Input
                    label="Price Per Night"
                    className="mb-4"
                    placeholder="Price"
                    error={errors.pricePerNight?.message}
                    onChange={(e) =>
                        setValue("pricePerNight", parseInt(e.target.value), {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                    type="number"
                    value={watch("pricePerNight")}
                />

                <Input
                    label="Location"
                    className="mb-4"
                    placeholder="Location"
                    error={errors.location?.message}
                    onChange={(e) =>
                        setValue("location", e.target.value, {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                    value={watch("location")}
                />

                {parent?.id?null:<Select
                    label="Property Type"
                    className="mb-4"
                    placeholder="Select Property Type"
                    value={watch("propertyType")}
                    error={errors.propertyType?.message}
                    onChange={(e) =>
                        setValue("propertyType", e.target.value, {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                >
                    {PROPERTY_TYPES.map((type)=>(
                        <option key={type} value={type}>{type}</option>
                    ))}
                </Select>}

                <TextArea
                    label="Description"
                    className="mb-4"
                    placeholder="Description"
                    error={errors.description?.message}
                    onChange={(e) =>
                        setValue("description", e.target.value, {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                    value={watch("description")}
                />


                <div className="flex flex-col gap-1">
                    <label className="block font-bold mb-1 text-sm text-gray-700">
                        Image Urls
                    </label>
                    {watch('images').map((_, index) => (
                        <Input
                            key={index}
                            type='url'
                            label={`Image ${index + 1}`}
                            placeholder={`Image ${index + 1}`}
                            error={errors.images?.[index]?.message || (index==0?errors.images?.message:null)}
                            onChange={(e) => {
                                setValue(`images.${index}`, e.target.value, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                });
                            }}
                            value={watch("images")[index]}
                            right={
                                watch("images").length<=1 ? null :
                                <button
                                    type='button'
                                    onClick={() => {
                                        setValue(
                                            "images",
                                            watch("images", []).filter((_, i) => i !== index),
                                            {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                            }
                                        );
                                    }}
                                ><IoClose /></button>
                            }
                        />
                    ))}

                    <Button
                        type="button"
                        outline={true}
                        className='w-full py-1'
                        onClick={() => {
                            setValue("images", [...watch("images"), ""]);
                        }}
                    >
                        Add Image
                    </Button>
                </div>


                <div className="flex items-center flex-wrap justify-between pt-6 border-t border-gray-200">
                    <Button
                        type="button"
                        outline={true}
                        onClick={() => {
                            modalRef.current?.close();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button isLoading={isPending} className="px-[72px]">
                        {isPending ||isUpdating ? `${property?.id?"Updating":"Adding"} ${parent?.id?"room":"propery"}...` : `${property?.id?"Update":"Add"} ${parent?.id?"room":"propery"}`}
                    </Button>
                </div>
            </form>
        </CustomDialog>
    );
};

export default AddProperty;