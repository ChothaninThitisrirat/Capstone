'use client'
import React, { useState, useEffect } from 'react';
import Navbar from "@/Components/Navbar";
import Rating from '@mui/material/Rating';
import HashLoader from "react-spinners/HashLoader";
import { Icon } from '@iconify/react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  user: {
   id: number;
   first_name: string;
   last_name: string;
   email: string;
   phone_number: string;
   profile_picture: string;
   facebook: string;
   instagram: string;
   line: string;
  };
  review_avg: {
    score: number;
  };
  review_count: {
    reviewer_id: number;
  };
}

export default function EditPa() {
   const { data: session, status } = useSession();
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);
   const router = useRouter();

  useEffect(() => {
    console.log(session)
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session?.user?.id) {
      fetch(`/api/user/${session.user.id}`)
        .then(response => response.json())
        .then(data => {
          setUser(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
          setLoading(false)
        })
    }
  }, [status, router, session])

  if (status === 'loading') {
    return <div>
      <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
        <HashLoader
        color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
      </div>
  </div>;
  }

  if (!session) {
    return router.push('/login');
  }

  if (!user) {
    return <div>
      <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
        <HashLoader
        color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
      </div>
  </div>;
  }

  return (
    <>
            <div className="flex w-full h-full bg-white flex-col items-center ">
                สถานที่จัดส่ง
            </div>

    </>
  );
};

