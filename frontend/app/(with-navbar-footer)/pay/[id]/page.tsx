"use client"
import { useState } from "react";
import Button from "@/src/components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "@/src/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import api from "@/src/utils/axios";
import AuthModel from "@/src/components/ui/AuthModel";

export default function PaymentSimulation() {
  const { user } = useAuth();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [message, setMessage] = useState("");
  const {id} = useParams() as {id: string};

  const { mutate, isPending: isLoading } = useMutation({
    onSuccess() {
      toast.success("Booking successfully!", { id: "booking" });
      setTimeout(() => router.push("/"), 1000);
      setMessage("Payment successful! 🎉");

    },
    onError(error: any) {
     // @ts-ignore
     toast.error(`${error?.response?.data?.message?? error.message ?? "Error while booking"}`, { id: "booking" });
      setMessage("An error occurred. Please try again.");
    },
    mutationFn: (data:{
        transactionId: string;
        paymentMethod: string;
    }) => api.put(`/payments/${id}/confirm`, { ...data, renterId: user?.id }),
  });

  const handlePayment = async () => {
    setMessage("");

    const transactionId = `TXN-${Math.floor(Math.random() * 1000000)}`;
      const paymentData = {
        transactionId,
        paymentMethod,
      };

      mutate(paymentData);
  };


  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">You need to log in first</h2>
          <p className="mb-4">Please log in to complete your payment.</p>
          <AuthModel trigger={<Button
            className="bg-co-blue text-white hover:bg-blue-700 border-0 w-full"
            onClick={() => router.push("/login")}
          >
            Log in
          </Button>} type="login"/>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
        <p className="mb-4">Select a payment method and proceed with your transaction.</p>

        <select
          className="w-full p-2 border rounded mb-4"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="mobile_money">Mobile Money</option>
        </select>

        <Button
          className="bg-co-blue text-white hover:bg-blue-700 border-0 w-full"
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>

        {message && <p className="mt-4 text-sm font-bold">{message}</p>}
      </div>
    </div>
  );
}
