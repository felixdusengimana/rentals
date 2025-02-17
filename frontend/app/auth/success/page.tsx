"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        localStorage.setItem('authToken', token);
        router.replace('/');
      } else {
        router.replace('/auth/login');
      }
    }
  }, [router]);

  return <p>Authenticating...</p>; 
};

export default Success;
