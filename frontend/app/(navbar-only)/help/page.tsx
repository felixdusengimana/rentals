"use client";
import { useState } from "react";
import { FaQuestionCircle, FaPhone, FaEnvelope, FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useAuth from "@/src/hooks/useAuth";

const HelpCenter = () => {
  const {isAuthenticated} = useAuth();
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    { question: "How do I list a property?", answer: "To list a property, go to the 'List Property' section and fill in the required details." },
    { question: "How do I contact support?", answer: "You can reach out via email at info@feldux.com or call +250 784 483 142." },
    { question: "How can I update my booking?", answer: "Go to 'My Bookings' in your profile and select 'Modify' to update your reservation." },
    { question: "What are the cancellation policies?", answer: "Cancellation policies depend on the property. Check the specific listing for details." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold">Help Center</h1>
          <FaQuestionCircle className="text-blue-600 text-2xl" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-2">
                <button
                  className="w-full flex justify-between items-center text-left text-gray-700 font-medium"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  {faq.question}
                  <FaChevronDown className={`transition-transform ${openFAQ === index ? "rotate-180" : ""}`} />
                </button>
                {openFAQ === index && <p className="text-gray-600 mt-2">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
          <p className="text-gray-600 mb-4">Need further assistance? Reach out to us:</p>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <FaPhone className="text-blue-600" />
              <span className="text-gray-700">+250 784483 142</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <span className="text-gray-700">info@feldux.com</span>
            </div>
          </div>
        </div>

        {
            isAuthenticated&&<div className="text-center mt-8">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default HelpCenter;
