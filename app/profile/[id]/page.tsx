'use client'


import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import TitleBar from '@/Components/TitleBar'
import Navbar from '@/Components/Navbar'
import { HashLoader } from 'react-spinners'
import { Rating } from '@mui/material'
import {Icon} from '@iconify/react'
import Link from 'next/link'
export default function Profile() {

  interface User {
    user: {
      id: number;
      username: string;
      profile_picture: string;
    };
    review_avg: number,
    review_count: {
      reviewer_id: number;
    };
    book_count: {
      id: number;
    };
  }

  interface ReviewItem {
    title: string;
    describe: string;
    score: number;
    User_Review_User_reviewer_idToUser:{
      username: string;
    }
  }

  interface UserBook{
      id: number;
      title: string;
      picture: string[];
      status: string;
  }
  
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null)
  const [userReview, setUserReview] = useState<ReviewItem[]>([])
  const [userBook, setUserBook] = useState<UserBook[]>([])
  const [reviewComment, setReviewComment] = useState(0)

  useEffect(() => {
    if (id){
      const userID = Array.isArray(id) ? id[0] : id;
      fetchUserData(parseInt(userID))
      fetchReviewData(parseInt(userID))
      fetchUserBook(parseInt(userID))
    }
  },[id])

  const fetchUserData = async (userID: number) => {
    try{
      const response = await fetch(`/api/user/${userID}`)
      const data = await response.json()
      setUser(data)
    }catch(err){
      console.log("Fetch User Data", err)
    }
  }

  const fetchUserBook = async (userID: number) => {
    try{
      const response = await fetch(`/api/library/${userID}`)
      const data = await response.json()
      setUserBook(data.library || [])  
      console.log(data)     
    }catch (err){
      console.log("Fetch User Book", err)
    }
  }

  const fetchReviewData = async (userID: number) => {
    try{
      const response = await fetch(`/api/review/user/${userID}`)
      const data = await response.json()
      setUserReview(data.review || []);
    }catch(err){
      console.log("Fetch Review Data", err)
    }
  }

  useEffect(()=> {
    console.log(userBook)
  })


  if (!user) return <div>
    <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
        <HashLoader
        color='#435585' size={50} aria-label="Loading Spinner" data-testid="loader"/>
      </div>
  </div>;


  return (
    <>
      <Navbar backGroundOn={false} withTitle={false}/>
      <div className="flex w-full h-full flex-col mb-8">
        <div className="flex justify-start h-full items-center bg-dark2 flex-col rounded-b-2xl">
          <div
                className='aspect-square mt-8 w-60 h-60 bg-cover bg-black bg-no-repeat rounded-full'
                style={{ backgroundImage: `url(${user.user.profile_picture})` }}
            />
          <div className="flex justify-center items-center pt-16 text-white font-semibold text-4xl pb-8" >
            {user.user.username}
          </div>

          <div className="flex w-2/5 bg-white rounded-xl drop-shadow-2xl mb-8">
            <div className="flex w-full h-full p-8">
              <div className="flex w-1/2 h-full justify-center items-center flex-col">
                <p>คะแนนผู้ใช้</p>
                <Rating name="read-only" value={user.review_avg} readOnly size="large" />
                <p>{user.review_avg} คะแนน ({user.review_count.reviewer_id})</p>
              </div>
              <div className="flex w-1/2 h-full justify-center items-center flex-col">
                <p>รายการหนังสือทั้งหมด</p>
                <p>{user.book_count.id}</p>
                <p>เล่ม </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center flex-col w-full mt-12">
          <div className="flex w-4/5 mb-6">
            <p className='text-4xl font-bold'>
              รีวิวทั้งหมดของ {user.user.username}
            </p>
          </div>
          <div className="flex w-full gap-10 justify-center items-center px-3 pb-12">
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
        
        </div>






        <div className="flex justify-center items-center flex-col w-full">
          <div className="flex w-4/5 mb-6 justify-center items-center pt-12">
            <p className='text-4xl font-bold'>
              หนังสือทั้งหมดของ {user.user.username}
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-10 justify-center items-center px-3">
            
            {userBook?.length === 0 ? (
              <div
                style={{ width: '1250px', WebkitOverflowScrolling: 'touch' }}
                className="flex font-bold text-gray-400 text-xl justify-start h-68 pl-20 -translate-y-8"
              >
                No Books For this User
              </div>
            ) : (
              userBook.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center font-bold w-max h-max bg-transparent justify-center "
                >
                  <Link
                    className="flex w-svw h-1/4 max-w-52 min-h-72 bg-cover bg-center bg-no-repeat hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105"
                    style={{ backgroundImage: `url(${item.picture[0]})` }}
                    href={`/bookinfo/${item.id}`}
                  />
                  <Link 
                  href={`/bookinfo/${item.id}`}
                  className='pt-2'
                  >
                    {item.title}
                  </Link>

          </div>
          
              ))
            )}
          </div>  
        </div>
      </div>
    </>
  )
}
