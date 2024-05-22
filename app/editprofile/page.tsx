'use client'
import React, { useState, useEffect } from 'react';
import Navbar from "@/Components/Navbar";
import Rating from '@mui/material/Rating';
import HashLoader from "react-spinners/HashLoader";
import { Icon } from '@iconify/react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { set } from 'mongoose';
import EditPage1 from './EditPage1';
import EditPage2 from './EditPage2';
import EditPage3 from './EditPage3';


interface User {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    profile_picture: string;
  };
  review_avg: number ,
  review_count: {
    reviewer_id: number;
  };
}

export default function EditProfile() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [StatePage, setStatePage] = useState(0);

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



  if (loading === true) {
    return <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
        <HashLoader
        color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
      </div>

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
      <div className="h-screen overflow-y-hidden">
        <div className="absolute">
          <Navbar backGroundOn />
        </div>
        <div className="flex justify-center items-center w-full h-full bg-dark2 pt-16">
          <div className="flex flex-col justify-start items-center w-1/5 bg-white h-full drop-shadow-2xl rounded-tr-3xl ">
            <div
              className='aspect-square mt-8 w-11/12 bg-cover bg-black bg-no-repeat rounded-full'
              style={{ backgroundImage: `url(${user.user.profile_picture})` }}
            />
            <div className="flex font-normal text-5xl mt-8">{session.user.username}</div>

            <div className="flex mt-10 text-lg mb-3">
              คะแนนของฉัน
            </div>
            <Rating name="half-rating-read" value={user.review_avg} readOnly size="large" />
            <div className="flex mt-10 text-lg mb-3">
              {user.review_avg} คะแนน ({user.review_count.reviewer_id})
            </div>
            <div 
               className='flex jusitfy-center items-center'
               onClick={() => setStatePage(0)}>
               รีวิวของฉัน
            </div>

          </div>
          <div className="w-4/5 bg-dark3 h-full ">
            <div className="flex items-center w-full h-1/6 bg-dark2 rounded-br-3xl">
              <p className="text-6xl font-bold pl-8 text-white"> Edit Profile </p>
            </div>

            <div className="flex flex-row justify-evenly items-center w-full h-16 bg-dark3 ">
              <div className="flex flex-row min-w-28 text-white text-xl font-bold">
                <p 
                  className="flex w-full justify-center items-center underline underline-offset-"
                  onClick={() => setStatePage(1)}
                >
                  <Icon icon="iconamoon:profile" className='w-8 h-8 mr-4'/>
                  แก้ไขโปรไฟล์
                </p>
              </div>

              <div className="flex flex-row min-w-28 text-white text-xl font-bold">
               <p 
                     className="flex w-full justify-center items-center underline underline-offset-"
                     onClick={() => setStatePage(2)}
                  >
                  <Icon icon="material-symbols:local-shipping-outline" className='w-8 h-8 mr-4'/>
                  ข้อมูลการจัดส่ง
                  </p>
              </div>

              <div className="flex flex-row min-w-28 text-white text-xl font-bold">
               <p 
                  className="flex w-full justify-center items-center underline underline-offset-"
                  onClick={() => setStatePage(3)}
                >
                  <Icon icon="tabler:social" className='w-8 h-8 mr-4'/>
                  ข้อมูลการติดต่อ
                </p>
              </div>
            </div>

            <div className="flex w-full h-5/6 pb-12 bg-white">
               {StatePage === 0 && 
               <div className="flex w-full h-full bg-white">
                  My Review
               </div>}
               {StatePage === 1 && <EditPage1 />}
               {StatePage === 2 && <EditPage2 />}
               {StatePage === 3 && <EditPage3 />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

