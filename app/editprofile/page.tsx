'use client'

import Navbar from "@/Components/Navbar";
import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import HashLoader from "react-spinners/HashLoader";
import { Icon } from '@iconify/react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Data = {
  user: {
    id: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    profile_picture: string,
    phone_number: string,
    card_id: string,
    instagram: string,
    facebook: string,
    line: string,
    address: string,
    user: string
  },
  review_avg: {
    score: number
  },
  review_count: {
    reviewer_id: number}
}

function EditProfile() {
  // Session
  // const { data: session, status } = useSession()
  // const router = useRouter()
  // useEffect(() => {
  //     if (status === 'unauthenticated') {
  //         router.push('/login')
  //     }
  // }, [status, router])
  
  // data
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/user/1');
      const result: Data = await res.json();
      console.log(result);
      setData(result);
    };
    fetchData();
  }, [])

  loading
  if (!data) return 
  <div>
    <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
      <HashLoader
      color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
    </div>
  </div>;

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
              style={{ backgroundImage: `url(${data.user.profile_picture})` }}
            />
            <div className="flex font-normal text-5xl mt-8">{data.user.username}</div>

            <div className="flex mt-10 text-lg mb-3">
              คะแนนของฉัน
            </div>
            <Rating name="read-only" value={data.review_avg.score} readOnly size="large" />
            <div className="flex mt-10 text-lg mb-3">
              {data.review_avg.score} คะแนน ({data.review_count.reviewer_id})
            </div>
          </div>
          <div className="w-4/5 bg-dark3 h-full ">
            <div className="flex items-center w-full h-1/6 bg-dark2 rounded-br-3xl">
              <p className="text-6xl font-bold pl-8 text-white"> Edit Profile </p>
            </div>

            <div className="flex flex-row justify-evenly items-center w-full h-16 bg-dark3 ">
              <div className="flex flex-row min-w-28 text-white font-bold">
                <p className="flex w-full justify-center items-center">แก้ไขโปรไฟล์</p>
              </div>

              <div className="flex flex-row min-w-28 text-white font-bold">
                <p className="flex w-full justify-center items-center">ข้อมูลการจัดส่ง</p>
              </div>

              <div className="flex flex-row min-w-28 text-white font-bold">
                <p className="flex w-full justify-center items-center">ข้อมูลการติดต่อ</p>
              </div>
            </div>

            <div className="flex w-full h-5/6">
              <div className="flex w-1/3 h-full bg-dark1">

              </div>
                

              <div className="flex flex-col justify-center items-center w-2/3  h-full bg-white">
                <div className="flex w-full justify-center items-center">
                  <div className="flex w-1/2 flex-col h-fit justify-center items-center">
                    {/* <div className="flex items-start w-full">
                      <p className="font-bold">ชื่อ</p>
                      <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                        <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                        <input
                          value={data.user.first_name}
                          readOnly
                          className="font-bold h-fit py-4 pl-5"
                        /> 
                      </div>
                    </div> */}
                  </div>
                  <div className="flex w-1/2 h-fit justify-center">
                    <input
                      value={data.user.last_name}
                      readOnly
                      className="font-bold border-b border-gray-400 h-fit py-4 pl-12"
                    />
                  </div>
                </div>
                
                {/* <div className="flex w-2/3 h-fit justify-center">
                  <input
                    value={data.user.email}
                    readOnly
                    className="border-b border-gray-400 h-fit w-full"
                  />
                </div>


                <div className="flex w-full h-fit justify-center">
                  <input
                    value={data.user.phone_number}
                    className="border-b border-gray-400 h-fit w-full"
                  />
                </div> */}

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditProfile;
