"use client"
import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { HiMenu, HiX, HiPlus, HiOfficeBuilding, HiChevronDown, HiHome, HiCog, HiQuestionMarkCircle, HiLogout } from 'react-icons/hi';
import useAuth from '@/src/hooks/useAuth';
import AddProperty from '../AddProperty';

const Sidebar = ({isExpanded, setIsExpanded}:{
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <div className={`fixed h-[calc(100vh-3.5rem)] transition-all duration-300 bg-white border-r
          ${isExpanded ? 'w-64' : 'w-16'}`}
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute right-0 top-4 translate-x-1/2 bg-white border rounded-full p-2 hover:bg-gray-50"
            >
                {isExpanded ? <HiX className="h-4 w-4" /> : <HiMenu className="h-4 w-4" />}
            </button>

            <nav className="p-4 space-y-4">
                <div className="space-y-2">
                    <AddProperty trigger={<p className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-blue-600">
                        <HiPlus className="h-5 w-5" />
                        {isExpanded && <span>Add Property</span>}
                    </p>}/>

                    <Collapsible.Root className="space-y-1">
                        <Collapsible.Trigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg">
                            <div className="flex items-center gap-2">
                                <HiOfficeBuilding className="h-5 w-5" />
                                {isExpanded && <span>Business Solutions</span>}
                            </div>
                            {isExpanded && <HiChevronDown className="h-4 w-4" />}
                        </Collapsible.Trigger>

                        {isExpanded && (
                            <Collapsible.Content className="pl-9 space-y-1">
                                <a href="#" className="block p-2 hover:bg-gray-100 rounded-lg text-sm">Enterprise</a>
                                <a href="#" className="block p-2 hover:bg-gray-100 rounded-lg text-sm">Teams</a>
                                <a href="#" className="block p-2 hover:bg-gray-100 rounded-lg text-sm">Solutions</a>
                            </Collapsible.Content>
                        )}
                    </Collapsible.Root>
                </div>

                <div className="space-y-2 pt-4 border-t">
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                        <HiHome className="h-5 w-5" />
                        {isExpanded && <span>Dashboard</span>}
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                        <HiCog className="h-5 w-5" />
                        {isExpanded && <span>Settings</span>}
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                        <HiQuestionMarkCircle className="h-5 w-5" />
                        {isExpanded && <span>Help Center</span>}
                    </a>
                </div>

                {/* User Section */}
                {isExpanded && (
                    <div className="absolute cursor-pointer bottom-0 left-0 right-0 p-4 border-t">
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                            <img
                                src={user?.photo}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                                <p className="font-medium">{user?.name}</p>
                                <p className="text-sm text-gray-500">View Profile</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 w-full p-2 mt-2 hover:bg-gray-100 rounded-lg text-red-600">
                            <HiLogout className="h-5 w-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;