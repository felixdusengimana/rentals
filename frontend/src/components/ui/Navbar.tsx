"use client";
import Link from "next/link";
import useAuth from "@/src/hooks/useAuth";
import Dropdown from "./Dropdown";


export default function Navbar() {
  const { user, isLoading: authLoading, isAuthenticated , logout} = useAuth();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-xl font-bold">LaLa Rentals</h1>
      </Link>

      <div className="flex items-center space-x-4">
        {!authLoading && (!user?.role || user?.role === "renter") && (
          <Link href="/auth/business">For Business</Link>
        )}


        {!authLoading ? (
          isAuthenticated ? (
            <Dropdown trigger={
              <div className="flex items-center space-x-3">
              <img
                src={user.photo}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-white"
              />
              <span>{user.name}</span>
            </div>
            }
            items={[
              { label: "Dashboard", onClick: () => {} },
              { label: "Logout", onClick: logout },
            ]}
            />
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </nav>
  );
}
