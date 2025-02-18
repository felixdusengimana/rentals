"use client"
import React, { useEffect } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { BiCaretDown } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';
import { GiHamburgerMenu } from 'react-icons/gi';
import AuthModel from './AuthModel';
import useAuth from '@/src/hooks/useAuth';
import Link from 'next/link';
import { ERole } from '@/src/types/user';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [hideBanner, setHideBanner] = React.useState(false);

  const removeBanner = () => {
    localStorage.setItem('hideBanner', 'true');
    setHideBanner(true);
  }

  const loggedDropdownItems = [
    { title: 'Profile', link: '/profile' },
    { title: 'Settings', link: '/settings' },
  ];

  useEffect(() => {
    if (localStorage.getItem('hideBanner')) {
      setHideBanner(true);
    }
  }, []);

  return (
    <div className="relative">
      <nav className="bg-black text-white px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">Lala</Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {isAuthenticated ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border border-white"
                      />
                      <span>{user.name}</span>

                      <BiCaretDown className="ml-1 h-4 w-4" />
                    </div>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-white rounded-md shadow-lg p-1 min-w-[180px] z-20" sideOffset={5}>
                      {loggedDropdownItems.map((dropItem, idx) => (
                        <DropdownMenu.Item key={idx} className="text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none">
                          <Link href={dropItem.link} className="block px-4 py-2 text-sm">
                            {dropItem.title}
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                      <DropdownMenu.Item className="text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none">
                        <button onClick={() => logout()} className="block px-4 py-2 text-sm">
                          Log Out
                        </button>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ) : (
                <>
                  <AuthModel type='login' />
                  <span className="text-gray-400">|</span>
                  <AuthModel type='signup' />
                </>
              )}
            </div>

            <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <Dialog.Trigger asChild className="md:hidden">
                <button className="p-2 rounded-md text-white hover:text-gray-300 focus:outline-none">
                  <GiHamburgerMenu className="h-6 w-6" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Title></Dialog.Title>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                <Dialog.Content className="fixed inset-y-0 right-0 w-full max-w-sm bg-black text-white p-6 shadow-xl overflow-auto focus:outline-none">
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="text-xl font-bold">Lala</Link>
                    <Dialog.Close asChild>
                      <button className="p-2 text-white hover:text-gray-300 focus:outline-none">
                        <RxCross1 className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-700 flex space-x-4">
                    <AuthModel type='login' />
                    <span className="text-gray-400 flex items-center">|</span>
                    <AuthModel type='signup' />
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
      </nav>

      {!hideBanner && (user?.role != ERole.HOST || (!user?.role)) && isAuthenticated ?
        <div className="bg-gray-200 py-2">
          <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <span className="text-sm text-gray-600">Convert to a host and start listing your property today!</span>
              <Link href="/business" className="ml-1 text-sm text-blue-600 hover:text-blue-800">Continue</Link>
            </div>
            <button onClick={() => removeBanner()} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              <RxCross1 className="h-4 w-4" />
            </button>
          </div>
        </div> : null
      }
    </div>
  );
};

export default Navbar;