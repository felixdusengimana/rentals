"use client";
import Settings from '@/src/components/Settings';
import Loader from '@/src/components/ui/Loader';
import useAuth from '@/src/hooks/useAuth';
import React from 'react'

export default function SettingPage() {
  const {user, isLoading} = useAuth();

  if(isLoading){
    return <div className="flex justify-center items-center h-screen"><Loader/></div>
  }

  return (
    <div>
      <Settings user={user!} />
    </div>
  )
}
