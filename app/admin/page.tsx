'use client'
import { useState, useEffect } from "react";
import Navbar from '@/Components/Navbar';
import TitleBar from '@/Components/TitleBar';
import Footer from '@/Components/Footer';
import PostNewBook from '@/Components/PostNewBook';
import propFooter from '../../public/images/propFooter.png';
import Image from 'next/image';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";
import Router from 'next/router'
import EditUser from '@/Components/EditUser';


interface UserInfo {
  id: number;
  username: string;
  profile_picture: string;
}


export default function Admin(){
  const [loading, setLoading] = useState(true)
    const { data: session, status } = useSession()
    const userId  = session?.user.id;
    const router = useRouter()
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }else if(session?.user.isAdmin){
          setNotFound(false)
        }
    }, [status, router,session])

    const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
    const [reloadInfo, setReloadInfo] = useState(false) 
    const [notFound, setNotFound] = useState(true)

    useEffect(() => {
      console.log('userId', userId);
      const fetchData = async () => {
          try {
              const response = await axios.get<{ user: UserInfo[] }>(`/api/admin/alluser`);

              const sortedUserId = response.data.user.sort((a, b) => b.id - a.id);
              setUserInfo(sortedUserId);
              setLoading(false);
          } catch (error) {
              console.error('Error:', error);
              setLoading(false);
          }
      };

      if (userId !== undefined) {
          fetchData();
      }
  }, [userId]);



  const [stateOpen, setStateOpen] = useState(false)
  const [userIdSelect, setUserIdSelect] = useState< number | null >(null)
  
  const [classAddBookbg, setClassAddBookbg] = useState('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl hidden')
  const [classAddBook, setClassAddBook] = useState({
      transform:'translateY(100%)',
      visibility: "hidden",
      transitionDuration: '0.3s'
  })

  useEffect(() => {
      if (stateOpen) {
          setClassAddBookbg('visible fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl')
          setClassAddBook({
              transform:'translateY(0%)',
              visibility: "visible",
              transitionDuration: '0.3s'
          })
      } else {
          setClassAddBookbg('hidden fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl')
          setClassAddBook({
              transform:'translateY(100%)',
              visibility: "hidden",
              transitionDuration: '0.3s'
          })
      }   
  }, [stateOpen])


  const handleUserCheck = (item: any) => {
    setReloadInfo((p)=>!p)
    setStateOpen(true)
    setUserIdSelect(item.id)
  }
























  return (
    <>
      <style>
        {stateOpen
        ?`body {
            overflow: hidden;
        }`
        :`body {
            overflow-x: hidden;
        }`}
      </style>
      {loading 
    ? 
    <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
      <HashLoader
      color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
    </div>
    :
    (notFound 
    ?<div className="flex justify-center items-center h-screen text-3xl font-bold bg-yellow-50">Not Found !</div>
    :<>
        <Navbar backGroundOn={true} withTitle={true}/>
        <TitleBar textTitle="รายชื่อ User ทั้งหมด"/>
        <div 
        style={{minHeight: "800px", maxWidth: '1700px'}}
        className="flex items-center h-auto w-sceen bg-none mx-auto flex-col">
            <div 
            style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
            className="flex w-10/12 rounded-3xl justify-around h-32 items-center mt-20">
              <div className="flex flex-col text-gray-500 items-center">
                <div className="flex">มี User ทั้งหมด</div>
                <div className="flex">{userInfo.length}</div>
                <div className="flex">Accounts</div>
              </div>
              <form className="flex w-7/12 relative">
                <input 
                style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                placeholder='กรอก Username ที่ท่านต้องการดูข้อมูล'
                className="flex w-full rounded-full h-14 pl-10 pr-36"/>
                <button 
                type='submit'
                className=" absolute right-3 top-1/2 -translate-y-1/2 flex w-32 h-10 bg-dark1 text-white text-xl justify-center items-center rounded-full">ค้นหา</button>
              </form>
            </div>
            <div
                className="flex w-full h-auto p-10 flex-wrap gap-20 mb-10 mt-5 library-container">
              {userInfo.map((item, index) => (
                  <div
                  key={index}
                  onClick={()=>handleUserCheck(item)}
                  className='flex flex-col items-center justify-around rounded-3xl border w-64 h-80 cursor-pointer shadow-sm hover:scale-105 duration-300 relative bg-dark2'>
                      <img
                      src={item.profile_picture}
                      alt="Profile picture"
                      className='w-44 h-44 object-cover cursor-pointer bg-white rounded-full'
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex w-full justify-center text-2xl text-white">{item.username}</div>
                      </div>
                      
                  </div>
              ))}
            </div>
        </div>
        <Footer/>
        <div className={classAddBookbg}></div>
        <EditUser setStateOpen={setStateOpen} classAddBook={classAddBook} userIdSelect={userIdSelect} reloadInfo={reloadInfo}/>
        </>)}
    </>
  )
}

