import Button from "./ui/Button";
import { useRouter } from "next/navigation";

export default function PropertyBookingThirdStep() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Your Booking Request Has Been Received! 🎉</h2>
        <p className="mb-4">Thank you for choosing to stay with us! Your request has been sent to the property hosts for approval.</p>
        <p className="mb-4">We'll notify you via email as soon as your booking is confirmed. Once approved, you'll receive a secure payment link to complete your reservation.</p>
        <p className="mb-6">Sit back, relax, and get ready for an amazing stay! 😊</p>
        <Button 
          className="bg-co-blue text-white hover:bg-blue-700 border-0 mt-4"
          onClick={() => router.replace("/")}
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
