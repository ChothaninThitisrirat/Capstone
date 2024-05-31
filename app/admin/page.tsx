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

interface History {
  id: number;
  book_id: number;
  owner_id: number;
  date_time: string;
  status: string;
  req_book_id: number;
  req_user_id: number;
}

interface Book {
  id: number;
  title: string;
  picture: string[];
}


export default function Admin(){
  const [searchTerm, setSearchTerm] = useState('');
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
    const [historyTrade, setHistoryTrade] = useState<History[]>([])
    const [book, setBook] = useState<Book[]>([])
    

    const FetchHistory = () => {
      try{
        fetch(`/api/trade`)
          .then(response => response.json())
          .then(data => {
            setHistoryTrade(data.mybookrequest)

          })
          .catch(error => {
            console.error('Error fetching user data:', error)
          })
      }catch(err){
        console.log("Fetch Review Data", err)
      }
    }

    const FetchBook = () => {
      try{
        fetch(`/api/book`)
          .then(response => response.json())
          .then(data => {
            setBook(data.book)

          })
          .catch(error => {
            console.error('Error fetching user data:', error)
          })
      }catch(err){
        console.log("Fetch Review Data", err)
      }
    }

    useEffect(() => {
      console.log('userId', userId);
      const fetchData = async () => {
          try {
              const response = await axios.get<{ user: UserInfo[] }>(`/api/admin/alluser`);

              const sortedUserId = response.data.user.sort((a, b) => b.id - a.id);
              setUserInfo(sortedUserId);
              FetchHistory()
              FetchBook()
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
  const [Statepage, setStatePage] = useState(0)
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

  console.log(userInfo)

















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
      <Navbar backGroundOn={true} withTitle={true}/>
            <TitleBar textTitle="รายชื่อ User ทั้งหมด"/>
            <div className="flex w-full h-20 bg-white drop-shadow-xl">
              <div 
              className="flex w-1/2 justify-center items-center hover:bg-gray-100 cursor-pointer"
              onClick={() => setStatePage(0)}
              >
                รายชื่อ User ทั้งหมด
              </div>
              <div className="flex w-1/2 justify-center items-center hover:bg-gray-100 cursor-pointer"
              onClick={() => setStatePage(1)}>
                ประวัติการแลกเปลี่ยนทั้งหมด
              </div>
            </div>
      {loading 
    ? 
    <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
      <HashLoader
      color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
    </div>
    :
    (notFound 
    ?<div className="flex justify-center items-center h-screen text-3xl font-bold bg-yellow-50">Not Found !</div>
    :
    (Statepage === 0 ? 
        <>
            

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
                    <input 
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                    placeholder='กรอก Username ที่ท่านต้องการดูข้อมูล'
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex w-8/12 rounded-full h-14 pl-10 pr-36"/>
                    
                </div>
                <div
                    className="flex w-full h-auto p-10 flex-wrap gap-20 mb-10 mt-5 library-containe justify-center items-center">
                  {userInfo.filter(item => item.username.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => (
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
            </>
          : (
            <div className="flex justify-center items-center flex-col w-full h-full mt-12">
              {historyTrade.map((item, index) => (
                <div className="flex h-52 w-screen justify-center mb-12">
                  <div className="flex  flex-col w-8/12 h-full  bg-bg drop-shadow-xl  justify-center items-start rounded-2xl">
                    <div className="flex w-full h-1/6 bg-dark1 rounded-t-2xl">
                      <div className="flex font-bold text-white pl-8 justify-center items-center text-2xl">
                      Trade ID: {item.id}
                      </div>
                    </div>
                    <div className="flex w-full h-5/6">
                      <div className="flex w-2/5 h-full justify-around items-center">
                        <div className="flex flex-col justify-center items-center">
                          <img
                              src={userInfo.find((user) => user.id === item.owner_id)?.profile_picture}
                              alt="Profile picture"
                              className='w-24 h-24 object-cover cursor-pointer bg-white rounded-full'
                              />
                          <b>{userInfo.find((user) => user.id === item.owner_id)?.username}</b>
                          <b>ID #{userInfo.find((user) => user.id === item.owner_id)?.id}</b>
                        </div>
                        <div className="flex">
                          <img
                              src={book.find((book) => book.id === item.book_id)?.picture[0]}
                              alt="Profile picture"
                              className='w-24 h-24 object-cover cursor-pointer bg-white rounded-full'
                              />
                        </div>
                        
                      </div>
                      <div className="flex w-2/5 h-full justify-center items-center">
                        
                      </div>
                      <div className="flex w-2/5 h-full justify-center items-center">
                        
                      </div>
                    </div>
                  </div>
                </div>
                  ))}

            </div>)  
          
          
          )
            
          )}
    </>
    
  )
}

