"use client"
import * as Dialog from '@radix-ui/react-dialog';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { RxCross1 } from 'react-icons/rx';

export default function AuthModel({ type, trigger }: { type: "login" | "signup", trigger?: ReactNode}) {
    const pathname = usePathname();
    const setRedirectUrl = () => {
        if (typeof window !== 'undefined' && pathname) {
            localStorage.setItem('redirectUrl', pathname);
        }
    }
    
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
            {trigger?trigger:<p className="cursor-pointer py-2 text-sm font-medium hover:text-gray-300">{type=="login"?"Log In":"Sign Up"}</p>}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-[90vw] bg-white rounded-md shadow-xl z-50 focus:outline-none">
                    <div className="p-6">
                        <Dialog.Title className="text-2xl font-semibold text-center mb-6">
                            {type === "login" ? "Welcome back Login" : "Join Our Community"}</Dialog.Title>

                        <Dialog.Description className="text-sm text-center text-gray-600 mb-6">
                            {type === "login" ? "Ready to get started? Sign in to explore available properties or manage your account." : "New here? Create an account to start exploring properties or manage your rental listings."}
                        </Dialog.Description>

                        <Dialog.Close asChild>
                            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none">
                                <RxCross1 className="h-5 w-5" />
                            </button>
                        </Dialog.Close>

                        <div className="space-y-3 mb-6">
                            <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`} onClick={setRedirectUrl} className="w-full flex items-center justify-center border border-gray-300 rounded py-2 px-4 hover:bg-gray-50 transition-colors">
                                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                Continue with Google
                            </a>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Don't have a renter account?{' '}
                                <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">
                                    Create one
                                </a>
                            </p>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};