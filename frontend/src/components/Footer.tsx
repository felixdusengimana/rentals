"use client";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { ERole } from "../types/user";
import AuthModel from "./ui/AuthModel";

const Footer = () => {
    const {user, isAuthenticated} = useAuth();
    return (
        <footer className="border-t bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-bold mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><Link href="/help" className="text-sm hover:underline">Help Center</Link></li>
                            <li><a href="#" className="text-sm hover:underline">AirCover</a></li>
                            <li><a href="#" className="text-sm hover:underline">Anti-discrimination</a></li>
                            <li><a href="#" className="text-sm hover:underline">Disability support</a></li>
                            <li><a href="#" className="text-sm hover:underline">Cancellation options</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Hosting</h3>
                        <ul className="space-y-3">
                            <li>
                                {isAuthenticated ? (
                                    <Link href={user?.role ==ERole.RENTER ? "/business" : "/properties"} className="text-sm hover:underline">List your property</Link>
                                ):(
                                    <AuthModel label="List your property" type="login"/>
                                )}
                            </li>
                            <li><a href="#" className="text-sm hover:underline">Host protection</a></li>
                            <li><a href="#" className="text-sm hover:underline">Hosting resources</a></li>
                            <li><a href="#" className="text-sm hover:underline">Community forum</a></li>
                            <li><a href="#" className="text-sm hover:underline">Responsible hosting</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm hover:underline">About us</a></li>
                            <li><a href="#" className="text-sm hover:underline">New features</a></li>
                            <li><a href="#" className="text-sm hover:underline">Careers</a></li>
                            <li><a href="#" className="text-sm hover:underline">Investors</a></li>
                            <li><a href="#" className="text-sm hover:underline">Gift cards</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 flex flex-col md:flex-row md:justify-between">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <span className="text-sm">© {new Date().getFullYear()} Lala, Inc.</span>
                        <div className="flex items-center space-x-4 text-sm">
                            <a href="#" className="hover:underline">Terms</a>
                            <span>·</span>
                            <a href="#" className="hover:underline">Sitemap</a>
                            <span>·</span>
                            <a href="#" className="hover:underline">Privacy</a>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                        <div className="flex items-center space-x-2">
                            <svg className="h-5 w-5" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM2 8c0-.5.04-1 .13-1.5h2.49A12 12 0 0 0 4.5 8c0 .5.04 1 .13 1.5H2.13A7 7 0 0 1 2 8zm1.31 2.5h2.6a8.7 8.7 0 0 0 1.51 3.59A6 6 0 0 1 3.31 10.5zM6.38 8c0-.97.11-1.87.3-2.67h2.63c.2.8.3 1.7.3 2.67 0 .97-.1 1.87-.3 2.67H6.69A12.8 12.8 0 0 1 6.38 8zM8 14.93c-.76-.87-1.4-2.03-1.81-3.59h3.62c-.4 1.56-1.05 2.72-1.81 3.59zM9.92 5.33H6.08a8.7 8.7 0 0 1 1.5-3.59C8.35 2.6 9 3.77 9.92 5.33zm1.17 5.17h2.6a6 6 0 0 1-4.1 4.09 8.7 8.7 0 0 0 1.5-3.59zm.3-1.5c.09-.5.13-1 .13-1.5s-.04-1-.13-1.5h2.49c.09.5.12.98.12 1.5s-.04 1-.12 1.5h-2.5z" />
                            </svg>
                            <span className="text-sm">English (US)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>$</span>
                            <span className="text-sm">USD</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a target="_blank" href="https://github.com/felixdusengimana/rentals" className="text-gray-700 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;