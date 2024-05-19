'use client'
import React, { useState, useEffect } from 'react';
import Navbar from "@/Components/Navbar";
import Rating from '@mui/material/Rating';
import HashLoader from "react-spinners/HashLoader";
import { Icon } from '@iconify/react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null); 
  
  useEffect(() => {
    if (session) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/user/${session.user?.id}`);
          const result = await response.json();
          setUser(result.user);
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [session]);
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setNewProfilePicture(file);
  };

  const handleUploadProfilePicture = async () => {
    if (!newProfilePicture || !session) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('profile', newProfilePicture);

      const response = await fetch(`/api/user/${session.user?.id}/profile`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        console.log('Profile picture updated successfully');
      } else {
        console.error('Failed to update profile picture:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

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
      <div className="h-screen overflow-y-hidden">
        <div className="absolute">
          <Navbar backGroundOn />
        </div>
        <div className="flex justify-center items-center w-full h-full bg-dark2 pt-16">
          <div className="flex flex-col justify-start items-center w-1/5 bg-white h-full drop-shadow-2xl rounded-tr-3xl ">
            <div
              className='aspect-square mt-8 w-11/12 bg-cover bg-black bg-no-repeat rounded-full'
              style={{ backgroundImage: `url(${user.profile_picture})` }}
            />
            <div className="flex font-normal text-5xl mt-8">{user.username}</div>

            <div className="flex mt-10 text-lg mb-3">
              คะแนนของฉัน
            </div>
            {/* <Rating name="read-only" value={review_avg.score} readOnly size="large" /> */}
            <div className="flex mt-10 text-lg mb-3">
              {/* {user.review_avg.score} คะแนน (${user.review_count.reviewer_id}) */}
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

            <div className="flex w-full h-5/6 pb-12">
              <div className="flex justify-center items-center w-1/3 flex-col">
                <div
                    className='aspect-square mt-8 w-6/12 bg-cover bg-black bg-no-repeat rounded-full'
                    style={{ backgroundImage: `url(${user.profile_picture})` }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="profilePictureInput"
                  />
                  <label
                    htmlFor="profilePictureInput"
                    className="flex w-5/12 justify-center items-center bg-dark2 text-white font-bold rounded-3xl mt-8 py-2 cursor-pointer"
                  >
                    เปลี่ยนรูปโปรไฟล์
                  </label>
                  <button
                    onClick={handleUploadProfilePicture}
                    className="flex w-5/12 justify-center items-center bg-dark2 text-white font-bold rounded-3xl mt-4 py-2"
                  >
                    Upload
                  </button>
              </div>
              

                

              <div className="flex flex-col justify-center items-center w-2/3  h-full bg-white">
                <div className="flex w-10/12 h-full flex-col justify-center items-center">
                  <div className="flex w-full justify-around">

                    {/* FirstnameInput */}
                    <div className="flex w-1/2 flex-col h-fit justify-center items-start">
                      <div className="flex items-start w-4/6">

                        <p className="font-bold text-2xl text-black">
                          ชื่อ
                        </p>

                      </div>
                        <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                            <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                            <input
                              value={user.first_name}
                              readOnly
                              className="font-bold h-fit py-4 pl-5"
                            /> 
                        </div>
                    </div>

                    {/* LastnameInput */}
                    <div className="flex w-1/2 flex-col h-fit justify-center items-start">
                      <div className="flex w-4/6">
                        <p className="font-bold text-2xl text-black">นามสกุล</p>
                      </div>
                        <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                            <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                            <input
                              value={user.last_name}
                              readOnly
                              className="font-bold h-fit py-4 pl-5"
                            /> 
                          </div>
                    </div>
                    
                  </div>

                  <div className="flex w-full flex-col h-fit justify-center items-center mt-8">
                      <div className="flex items-start w-full">
                        <p className="font-bold text-2xl text-black">อีเมล์</p>
                      </div>
                        <div className="flex w-full border-b border-gray-400 justify-start items-center">
                            <Icon icon="ic:outline-email" className="flex w-7 h-7 text-gray-400" />
                            <input
                              value={user.email}
                              readOnly
                              className="font-bold h-fit py-4 pl-5"
                            /> 
                          </div>
                    </div>

                  
                    <div className="flex w-full flex-col h-fit justify-center items-center mt-8">
                      <div className="flex items-start w-full">
                        <p className="font-bold text-2xl text-black">เบอร์โทรศัพท์</p>
                      </div>
                        <div className="flex w-full border-b border-gray-400 justify-start items-center">
                            <Icon icon="mynaui:telephone" className="flex w-7 h-7 text-gray-400" />
                            <input
                              value={user.phone_number}
                              readOnly
                              className="font-bold h-fit py-4 pl-5"
                            /> 
                          </div>
                    </div>
                    
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
