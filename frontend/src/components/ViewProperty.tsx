import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";
import Loader from "./ui/Loader";
import ErrorMessage from "./ui/ErrorMessage";
import CustomDialog, { CustomDialogRef } from "./ui/Dialog";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { ERole } from "../types/user";

const ViewProperty = ({ id, trigger }: { id: string, trigger: React.ReactNode }) => {
  const modalRef = useRef<CustomDialogRef>(null);

  const {user} = useAuth(); 
  
  const { data: property, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  return (
    <CustomDialog title="Property Details" ref={modalRef} trigger={trigger}>
      {isLoading ? <Loader /> : error ? <ErrorMessage message="Failed to load property details." /> : (
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-semibold mb-2">{property?.title}</h2>
          <p><strong>Location:</strong> {property?.location}</p>
          <p><strong>Type:</strong> {property?.propertyType}</p>
          <p><strong>Price per Night:</strong> ${property?.pricePerNight}</p>
          <p><strong>Status:</strong> {property?.status}</p>
          <p><strong>Description:</strong> {property?.description}</p>
          <p><strong>Created At:</strong> {new Date(property?.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(property?.updatedAt).toLocaleString()}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {property?.images?.map((image: string, index: number) => (
              <img key={index} src={image} alt={`Property Image ${index + 1}`} className="rounded-lg w-full h-32 object-cover" />
            ))}
          </div>

          {user?.role!== ERole.RENTER &&<Link href={`/properties/${property?.id}/bookings`} className="text-primary underline mt-2 block">
            View All Bookings Of this Property
          </Link>}
        </div>

      )}
    </CustomDialog>
  );
};

export default ViewProperty;
