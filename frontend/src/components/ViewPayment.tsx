import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";
import CustomDialog, { CustomDialogRef } from "./ui/Dialog";
import Loader from "./ui/Loader";
import ErrorMessage from "./ui/ErrorMessage";

const ViewPayment = ({ id, trigger }: { id: string, trigger: React.ReactNode }) => {
  const modalRef = useRef<CustomDialogRef>(null);
  
  const { data: payment, isLoading, error } = useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const response = await api.get(`/payments/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  return (
    <CustomDialog title="Payment Details" ref={modalRef} trigger={trigger}>
      {isLoading ? <Loader /> : error ? <ErrorMessage message="Failed to load payment details." /> : (
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Amount:</strong> <br />${payment?.amount}</p>
            <p><strong>Transaction ID:</strong> <br />{payment?.transactionId}</p>
            <p><strong>Payment Method:</strong> <br />{payment?.paymentMethod}</p>
            <p><strong>Status:</strong> <br />{payment?.status}</p>
            <p><strong>Booking ID:</strong> <br />{payment?.bookingId}</p>
            <p><strong>Check-in Date:</strong><br /> {new Date(payment?.checkInDate).toLocaleDateString()}</p>
            <p><strong>Check-out Date:</strong><br /> {new Date(payment?.checkOutDate).toLocaleDateString()}</p>
            <p><strong>Created At:</strong><br /> {new Date(payment?.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> <br /> {new Date(payment?.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </CustomDialog>
  );
};

export default ViewPayment;
