'use client'
import React, { useState, useEffect, use } from 'react';
import Navbar from "@/Components/Navbar";
import Rating from '@mui/material/Rating';
import HashLoader from "react-spinners/HashLoader";
import { Icon } from '@iconify/react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

interface UserReview {
  title: string;
  describe: string;
  score: number;
  User_Review_User_reviewer_idToUser:{
    username: string;
  }
}

export default function EditProfile() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [StatePage, setStatePage] = useState(0);
  const [userReview, setUserReview] = useState<UserReview[]>([])
  const [reviewComment, setReviewComment] = useState(0)

  useEffect(() => {
    console.log(session)
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session?.user?.id) {
      fetch(`/api/user/${session.user.id}`)
        .then(response => response.json())
        .then(data => {
          setUser(data)
          FetchReviewData(session.user.id)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
          setLoading(false)
        })
    }
  }, [status, router, session])

  const FetchReviewData = (id: number) => {
    try{
      fetch(`/api/review/user/${id}`)
        .then(response => response.json())
        .then(data => {
          setUserReview(data.review || [])
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
          setLoading(false)
        })
    }catch(err){
      console.log("Fetch Review Data", err)
    }
  }

  useEffect(() => {
    try{
      fetch(`api/user/${session?.user.id}/contact`)
        .then(response => response.json())
        .then(data => {
          if (data?.contact?.line === null &&
            data?.contact?.instagram === null &&
            data?.contact?.facebook === null) {
          setStatePage(3);
        }
        })
      }catch{
      console.log(Error)
    }
  })

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
          <Navbar backGroundOn={true} withTitle={false} />
        </div>
        <div className="flex justify-center items-center w-full h-full bg-dark2 pt-16 ">
          <div className="flex flex-col justify-start items-center w-1/5 bg-white h-full drop-shadow-2xl rounded-tr-3xl ">
              <div
                  className='aspect-square mt-8 w-4/12 bg-cover bg-black bg-no-repeat rounded-full lg:w-6/12 xl:w-10/12 '
                  style={{ backgroundImage: `url(${user.user.profile_picture})` }}
                />
                <div className="flex font-normal text-lg mt-8 xl:text-5xl">{session.user.username}</div>

                <div className="flex mt-10 text-xs xl:text-lg mb-3">
                  คะแนนของฉัน
                </div>
                {screen.width < 1100 ? <Rating name="half-rating-read" value={user.review_avg} readOnly size="small" />:
                <Rating name="half-rating-read" value={user.review_avg} readOnly size="large" />
                }
                <div className="flex mt-10 text-lg mb-3">
                  {user.review_avg} คะแนน ({user.review_count.reviewer_id})
                </div>
                <div 
                  className='flex justify-center items-center bg-dark2 rounded-full text-white text-xs font-bold  w-3/6  h-10 cursor-pointer transform transition duration-500 ease-in-out hover:scale-10 xl:text-lg'
                  onClick={() => setStatePage(0)}>
                  อ่านรีวิวของฉัน
                </div>
          </div>
          <div className="w-4/5 bg-dark3 h-full ">
            <div className="flex items-center w-full h-1/6 bg-dark2 rounded-br-3xl">
              <p className="text-2xl font-bold pl-8 text-white lg:text-4xl xl:text-6xl"> แก้ไขข้อมูลส่วนตัว </p>
            </div>

            <div className="flex flex-row justify-evenly items-center w-full h-16 bg-dark3">
              <div className="flex flex-row min-w-28 text-white text-xs lg:text-lg xl:text-xl  font-bold">
                {StatePage === 1 ?  <p 
                   className="flex w-full justify-center items-center underline cursor-pointer drop-shadow-2xl transition-all   duration-300 ease-in-out hover:scale-105"
                  onClick={() => setStatePage(1)}
                >
                  <Icon icon="iconamoon:profile" className='w-4 h-4 mr-3 lg:w-5 lg:h-5 xl:w-8 xl:h-8'/>
                  แก้ไขโปรไฟล์
                </p> :
                <p 
                   className="flex w-full justify-center items-center cursor-pointer hover:drop-shadow-2xl transition-all hover:underline-offset-4  duration-300 ease-in-out hover:scale-105"
                  onClick={() => setStatePage(1)}
                >
                  <Icon icon="iconamoon:profile" className='w-4 h-4 mr-3 lg:w-5 lg:h-5 xl:w-8 xl:h-8'/>
                  แก้ไขโปรไฟล์
                </p>
                }
              </div>

              <div className="flex flex-row min-w-28 text-white text-xs lg:text-lg xl:text-xl font-bold">
              {StatePage === 2 ?  <p 
                   className="flex w-full justify-center items-center underline cursor-pointer drop-shadow-2xl transition-all   duration-300 ease-in-out hover:scale-105"
                  onClick={() => setStatePage(2)}
                >
                  <Icon icon="material-symbols:local-shipping-outline" className='w-4 h-4 mr-3 lg:w-5 lg:h-5 xl:w-8 xl:h-8'/>
                  ข้อมูลการจัดส่ง
                </p> :
                <p 
                   className="flex w-full justify-center items-center cursor-pointer hover:drop-shadow-2xl transition-all hover:underline-offset-4  duration-300 ease-in-out hover:scale-105"
                  onClick={() => setStatePage(2)}
                >
                  <Icon icon="material-symbols:local-shipping-outline" className='w-4 h-4 mr-3 lg:w-5 lg:h-5 xl:w-8 xl:h-8'/>
                  ข้อมูลการจัดส่ง
                  </p>}
              </div>

              <div className="flex flex-row min-w-28 text-white text-xs lg:text-lg xl:text-xl font-bold">
              {StatePage === 3 ?  <p 
                   className="flex w-full justify-center items-center underline cursor-pointer drop-shadow-2xl transition-all   duration-300 ease-in-out hover:scale-105"
                  onClick={() => setStatePage(3)}
                >
                  <Icon icon="tabler:social" className='w-4 h-4 mr-3 lg:w-5 lg:h-5 xl:w-8 xl:h-8'/>
                  ข้อมูลการติดต่อ
                </p> :
                <p 
                   className="flex w-full justify-center items-center cursor-pointer hover:drop-shadow-2xl transition-all hover:underline-offset-4  duration-300 ease-in-out hover:scale-105"
                  onClick={() => setStatePage(3)}
                >
                  <Icon icon="tabler:social" className='w-4 h-4 mr-3 lg:w-5 lg:h-5 xl:w-8 xl:h-8'/>
                  ข้อมูลการติดต่อ
                </p>}
              </div>
              
            </div>

            <div className="flex w-full h-5/6 pb-12 bg-white">
               {StatePage === 0 && 
               <div className="flex w-full h-full bg-white">
                  <div className="flex w-full gap-10 justify-center items-center px-3">
                    {reviewComment === 0 
                      ? <div 
                      className='mr-5 shrink-0 w-0 h-0'></div>
                      :
                      <Icon 
                      onClick={() => setReviewComment(prev => prev-1)}
                      className='mr-5 text-dark3 cursor-pointer shrink-0 hover:text-dark2 duration-200'
                      icon="icon-park-solid:left-c" 
                      width="50" 
                      height="50" 
                      />
                      }
                      {userReview?.length === 0
                        ?<div
                        style={{width: '1250px', WebkitOverflowScrolling: 'touch'}}
                        className="flex font-bold text-gray-400 text-xl justify-start h-68 pl-20 -translate-y-8">No Review For this User</div> 
                        :<div 
                        style={{WebkitOverflowScrolling: 'touch'}}
                        className="flex gap-10 w-10/12 justify-start items-center overflow-x-auto h-68 p-2 close-scrollbar">
                        {userReview.map((item, index) => (
                            <div 
                            key={index}
                            style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',transform: `translateX(${reviewComment * -424}px)`}}
                            className="flex w-96 h-60 rounded-3xl pt-5 px-5  shrink-0 duration-500 flex-col bg-white">


                            <div className="flex w-full text-2xl font-bold">{item.title}</div>
                            <textarea 
                            readOnly
                            value={item.describe}
                            className="flex w-full h-36 break-words pt-1 text-gray-500 resize-none css-scrollbar"/>
                            <div className="flex text-sm mt-2 pl-3 justify-between">
                                <div className="flex">{item.User_Review_User_reviewer_idToUser.username}</div>
                                <div className="flex mr-2 ">
                                    <Rating name="half-rating-read" value={item.score} readOnly size="medium" />
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                      }
                      {userReview?.length !== 2 &&(reviewComment < userReview.length - 2 
                    ?<Icon 
                    onClick={() => setReviewComment(  prev => prev+1)}
                    className='ml-5 text-dark3 cursor-pointer shrink-0 hover:text-dark2 duration-200'
                    icon="icon-park-solid:right-c" width="50" height="50" />
                    :<div style={{width: '70px'}}
                    className='mr-5 shrink-0'></div>)}
                  </div>
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

