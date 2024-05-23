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

const EditPage3: React.FC = (): JSX.Element => {
   const { data: session, status } = useSession();
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);
   const router = useRouter();
   const [tempFacebook, setTempFacebook] = useState("");
   const [tempInstagram, setTempInstagram] = useState("");
   const [tempLineID, setTempLineID] = useState("");

  useEffect(() => {
    console.log(session)
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session?.user?.id) {
      fetch(`/api/user/${session.user.id}`)
        .then(response => response.json())
        .then(data => {
          setUser(data)
          setTempFacebook(data.user.facebook)
          setTempInstagram(data.user.instagram)
          setTempLineID(data.user.line)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
          setLoading(false)
        })
    }
  }, [status, router, session])

  const handleContactChange = async () => {
   try{
      if(!session) {
         router.push('/login')
         return;
      }

      const response = await fetch(`/api/user/${session.user.id}/contact`,{
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            user_id: parseInt(session.user.id),
            facebook: tempFacebook,
            instagram: tempInstagram,
            line: tempLineID
         }),
      })

      if (response.ok) {
         setUser(prevUser => {
            if(!prevUser) return null;
            return{
               ...prevUser,
               user:{
                  ...prevUser.user,
                  facebook: tempFacebook,
                  instagram: tempInstagram,
                  line: tempLineID
               }
            }
         })
      } else {
         console.error('Failed to update contact information')
      }
   } catch(error){
      console.error('Error update Contact:',error)
   }
  }

  const handleCancelUpdateContact = () => {
   setTempFacebook(user?.user.facebook || '')
   setTempInstagram(user?.user.instagram || '')
   setTempLineID(user?.user.line || '')
  }
  
  if (status === 'loading') {
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

               {/* Facebook */}
               <div className="flex w-1/2 flex-col h-fit justify-center items-start">
                  <div className="flex w-4/6">
                     <p className="font-bold text-2xl text-graynamehead">Facebook</p>
                  </div>
                  <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                     <Icon icon="logos:facebook" className="flex w-7 h-7  text-gray-400" />
                     <input
                     value={tempFacebook}
                     onChange={(e) => setTempFacebook(e.target.value)}
                     className="font-bold h-fit py-4 pl-5 text-grayname"
                     /> 
                  </div>
               </div>

               {/* IG */}
               <div className="flex w-1/2 flex-col h-fit justify-center items-start">
                  <div className="flex w-4/6">
                     <p className="font-bold text-2xl text-graynamehead">Instagram</p>
                  </div>
                  <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                     <Icon icon="skill-icons:instagram" className="flex w-7 h-7  text-gray-400" />
                     <input
                     value={tempInstagram}
                     onChange={(e) => setTempInstagram(e.target.value)} 
                     className="font-bold h-fit py-4 pl-5 text-grayname"
                     /> 
                  </div>
               </div>

               {/* Line */}
               <div className="flex w-1/2 flex-col h-fit justify-center items-start">
                  <div className="flex w-4/6">
                     <p className="font-bold text-2xl text-graynamehead">Line</p>
                  </div>
                  <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                     <Icon icon="skill-icons:instagram" className="flex w-7 h-7  text-gray-400" />
                     <input
                     value={tempLineID}
                     onChange={(e) => setTempLineID(e.target.value)} 
                     className="font-bold h-fit py-4 pl-5 text-grayname"
                     /> 
                  </div>
               </div>
               <div className="flex">
                  <button
                     onClick={handleContactChange}
                     className="ml-2 text-red-500 hover:underline"
                  >
                  Save
                  </button>

                  <button
                     onClick={handleCancelUpdateContact}
                     className="ml-2 text-red-500 hover:underline"
                  >
                  Cancel
                  </button>
               </div>
            </div>

    </>
  );
};

export default EditPage3;