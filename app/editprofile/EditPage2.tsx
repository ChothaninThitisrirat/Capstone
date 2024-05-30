'use client'
import React, { useState, useEffect } from 'react';
import Navbar from "@/Components/Navbar";
import Rating from '@mui/material/Rating';
import HashLoader from "react-spinners/HashLoader";
import { Icon } from '@iconify/react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import AddAddress from '@/Components/AddAddress';
import { set } from 'mongoose';

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

interface UserAddress {
  id: number;
  address: string[];
}

const EditPage2: React.FC = (): JSX.Element => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [statusAddress, setStatusAddress] = useState(false);



  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.id) {
      fetchUserData(session.user.id);
    }
  }, [status, session?.user?.id, router]);

  const fetchUserData = async (id: number) => {
    try {
      const userResponse = await fetch(`/api/user/${id}`);
      const userData = await userResponse.json();
      setUser(userData);

      const addressResponse = await fetch(`/api/user/${id}/address`);
      const addressData = await addressResponse.json();
      setUserAddress(addressData.address || null);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
        <HashLoader color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-start w-full h-full items-center flex-col gap-4 overflow-y-auto mt-10 pb-20">

          <div 
            className='flex w-2/3 h-1/6 justify-center items-center bg-dark1 text-white text-2xl font-bold flex-col drop-shadow-lg rounded-2xl min-h-48'
            onClick={() => setStatusAddress(true)}
          >
              <button 
                onClick={() => setStatusAddress(true)}
                >
                  <Icon icon='akar-icons:plus' className='text-3xl' />
              </button>
          </div>

        {userAddress && user && userAddress.address.slice().reverse().map((address, index) => (
          <div 
            key={index}
            className='flex w-2/3 h-1/6 justify-center items-center bg-dark1 flex-col drop-shadow-lg rounded-2xl min-h-48'  
          >
            <div className='flex w-full h-1/3 text-white font-bold justify-start items-center pl-8 min-h-12'> 
              Address 
            </div>

            <div className="flex w-full h-2/3 bg-white rounded-b-2xl text-black font-bold justify-start items-center pl-8 min-h-36">
              {address}
            </div>
            
          </div>
        ))}
      </div>

      {statusAddress && <AddAddress setStatusAddress={setStatusAddress} />}
    </>
  );
};

export default EditPage2;
