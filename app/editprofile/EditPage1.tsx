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
  };
  review_avg: {
    score: number;
  };
  review_count: {
    reviewer_id: number;
  };
}
const EditPage1: React.FC = (): JSX.Element => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");

  
  useEffect(() => {
    console.log(session)
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session?.user?.id) {
      fetch(`/api/user/${session.user.id}`)
        .then(response => response.json())
        .then(data => {
          setUser(data)
          setTempPhoneNumber(data.user.phone_number);
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
          setLoading(false)
        })
    }
  }, [status, router, session])

  //เปลี่ยนเบอร์โทร
  const handleDonePhoneClick = async () => {
    try {
      if (!session) {
        router.push('/login')
        return;
      }
  
      const response = await fetch(`/api/user/${session.user.id}/phone_number`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: parseInt(session.user.id),
          phone_number: tempPhoneNumber
        }),
      });
      
      if (response.ok) {
        setUser(prevUser => {
          if (!prevUser) return null;
          return {
            ...prevUser,
            user: {
              ...prevUser.user,
              phone_number: tempPhoneNumber
            }
          };
        });
        setIsEditingPhone(false);
      } else {
        console.error('Failed to update phone number:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  };
  

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
      formData.append('id', session.user?.id);
      formData.append('profile', newProfilePicture);

      const response = await fetch(`/api/user/${session.user?.id}/profile`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        console.log('Profile picture updated successfully');
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPhoneClick = () => {
    setIsEditingPhone(true);
  };


  const handleCancelPhoneClick = () => {
    setTempPhoneNumber(user?.user.phone_number || "");
    setIsEditingPhone(false);
  };

  if (status === 'loading') {
    return <div>
      <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
        <HashLoader
        color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
      </div>
  </div>;
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
        <div className="flex w-full h-5/6 pb-12 bg-white">
            <div className="flex justify-center items-center w-1/3 flex-col bg-white">
                <div
                    className='aspect-square mt-8 w-6/12 bg-cover bg-black bg-no-repeat rounded-full'
                    style={{ backgroundImage: `url(${user.user.profile_picture})` }}
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

                        <p className="font-bold text-2xl text-graynamehead">
                          ชื่อ
                        </p>

                      </div>
                        <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                            <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                            <input
                              value={user.user.first_name}
                              readOnly
                              className="font-bold h-fit py-4 pl-5 text-grayname"
                            /> 
                            <Icon icon="material-symbols:lock-outline" className="flex w-7 h-7  text-gray-400" />
                        </div>
                    </div>

                    {/* LastnameInput */}
                    <div className="flex w-1/2 flex-col h-fit justify-center items-start">
                      <div className="flex w-4/6">
                        <p className="font-bold text-2xl text-graynamehead">นามสกุล</p>
                      </div>
                        <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                            <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                            <input
                              value={user.user.last_name}
                              readOnly
                              className="font-bold h-fit py-4 pl-5 text-grayname"
                            /> 
                            <Icon icon="material-symbols:lock-outline" className="flex w-7 h-7  text-gray-400" />
                          </div>
                    </div>
                    
                  </div>

                  <div className="flex w-full flex-col h-fit justify-center items-center mt-8">
                      <div className="flex items-start w-full">
                        <p className="font-bold text-2xl text-graynamehead">อีเมล์</p>
                      </div>
                        <div className="flex w-full border-b border-gray-400 justify-start items-center">
                            <Icon icon="ic:outline-email" className="flex w-11 h-11 text-gray-400" />
                            <input
                              value={user.user.email}
                              readOnly
                              className="font-bold h-fit py-4 pl-5 text-grayname"
                            /> 
                            <div className='flex w-full h-full justify-end items-center'>
                              <Icon icon="material-symbols:lock-outline" className="flex w-7 h-7  text-gray-400" />
                            </div>
                            
                          </div>
                    </div>

                  
                    <div className="flex w-full flex-col h-fit justify-center items-center mt-8">
                      <div className="flex items-start w-full">
                        <p className="font-bold text-2xl text-graynamehead">เบอร์โทรศัพท์</p>
                      </div>
                        <div className="flex w-full border-b border-gray-400 justify-start items-center">
                            <Icon icon="mynaui:telephone" className="flex w-7 h-7 text-gray-400" />
                              <input
                                type="text"
                                value={isEditingPhone ? tempPhoneNumber : user.user.phone_number}
                                readOnly={!isEditingPhone}
                                onChange={(e) => setTempPhoneNumber(e.target.value)}
                                className="font-bold h-fit py-4 pl-5 text-grayname bg-transparent border-none focus:outline-none"
                              /> 
                              {isEditingPhone ? (
                                <>
                                  <button
                                    onClick={handleDonePhoneClick}
                                    className="ml-2 text-blue-500 hover:underline"
                                  >
                                    Done
                                  </button>
                                  <button
                                    onClick={handleCancelPhoneClick}
                                    className="ml-2 text-red-500 hover:underline"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={handleEditPhoneClick}
                                  className="ml-2 text-blue-500 hover:underline"
                                >
                                  Edit
                                </button>
                              )}
                          </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
  );
};

export default EditPage1;