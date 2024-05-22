'use client'


import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import TitleBar from '@/Components/TitleBar'
import Navbar from '@/Components/Navbar'
import { HashLoader } from 'react-spinners'


export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState<any>(null)
  
  useEffect(() => {
    if (id){
      const userID = Array.isArray(id) ? id[0] : id;
      console.log(id)
      fetchUserData(userID)
    }
  },[id])

  const fetchUserData = async (userID: string) => {
    try{
      const response = await fetch(`/api/user/${userID}`)
      const data = await response.json()
      setUserData(data)
      console.log
    }catch(err){
      console.log(err)
    }
  }

  if (!userData) return <div>
    <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
        <HashLoader
        color='#435585' size={50} aria-label="Loading Spinner" data-testid="loader"/>
      </div>
  </div>;


  return (
    <>
      <Navbar backGroundOn/>
      <div className="flex">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="mb-2"><strong>Name:</strong> {userData.name}</p>
            <p className="mb-2"><strong>Email:</strong> {userData.email}</p>

          </div>
        </div>
      </div>
    </>
  )
}
