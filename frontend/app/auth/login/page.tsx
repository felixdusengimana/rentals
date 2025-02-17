"use client"
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CgGoogle } from "react-icons/cg";

const fetchUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/user`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

export default function LoginPage() {
  const router = useRouter();
  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Login to LaLa</h2>
        {error && (
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}
            className="px-4 flex gap-3 items-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <CgGoogle/>
            <p>Sign in with Google</p>
          </a>
        )}
      </div>
    </div>
  );
}
