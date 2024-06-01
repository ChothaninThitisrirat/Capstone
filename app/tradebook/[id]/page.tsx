'use client'

import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";
import Navbar from '@/Components/Navbar';
import TitleBar from '@/Components/TitleBar';
import Footer from '@/Components/Footer';
import PostNewBook from '@/Components/PostNewBook';
import propFooter from '../../public/images/propFooter.png';
import Image from 'next/image';
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";
import Router from 'next/router'
import ManageRequest from '@/Components/ManageRequest';

interface Book {
    id: number;
    title: string;
    picture: string;
    status: string;
    isPost_trade: boolean;
}

interface BookRequest {
  id: number;
  pickup: string;
  address: string;
  picture: string[];
  title: string;
  status: string;
  Trade_Trade_book_idToBook: any[];
}
interface tradeReQuest {
  id: number;
  req_book_id: number;
  status:string;
  pickup_req:string,
  req_address:string,
  Book_Trade_req_book_idToBook:any;
}


function TradeBookSelect() {
    const param = useParams<{ id?: string }>();
    const [loading, setLoading] = useState(true)
    const [ loadcompo, setLoadcompo] = useState(false)
    const [bookId, setBookId] = useState<string | null | undefined>('')

    const { data: session, status } = useSession()
    const userId  = session?.user.id;
    const router = useRouter()
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])
    
  useEffect(() => {
    if(param.id !== undefined){
      setBookId(param.id)
    }
  }, [param.id]);

    const [tradeBook, setTradeBook] = useState<BookRequest>();
    const [tradeReQuest, setTradeReQuest] = useState<tradeReQuest[]>([]);
    const [historyTrade, setHistoryTrade] = useState<tradeReQuest[]>([]);
    const [tradingBook, setTradingBook] = useState<tradeReQuest[]>([]);

    const [bookIdSelect, setBookIdSelect] = useState<number | null | undefined>(null)
    const [stateOpen, setStateOpen] = useState(false)
    const [classAddBookbg, setClassAddBookbg] = useState('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl hidden')
    const [classAddBook, setClassAddBook] = useState({
        transform:'translateY(100%)',
        visibility: "hidden",
        transitionDuration: '0.3s'
    })

    useEffect(() => {
      setLoadcompo(false)
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/trade/mybookrequest/${userId}/book/${bookId}`);
                console.log('response', response.data.mybookrequest);
                if(response.data.mybookrequest !== undefined && response.data.mybookrequest !== null){
                setTradeBook(response.data.mybookrequest);
                setTradeReQuest(response.data.mybookrequest.Trade_Trade_book_idToBook.filter((item:tradeReQuest) => item.status === 'pending').reverse());
                setHistoryTrade(response.data.mybookrequest.Trade_Trade_book_idToBook.filter((item:tradeReQuest) => item.status === 'traded').reverse());
                setTradingBook(response.data.mybookrequest.Trade_Trade_book_idToBook.filter((item:tradeReQuest) => item.status === 'trading'));
                }
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        if (bookId !== undefined && userId !== undefined) {
        fetchData(); 
        }
    }, [userId,bookId,loadcompo]);




  const handlePopup = (item:any) => {
    if(item.Book_Trade_req_book_idToBook.status === 'available'){
      setBookIdSelect(item.Book_Trade_req_book_idToBook.id)
      setStateOpen(true);
    }
  }

  const handlePopuptrading = (item:any) => {
    if(tradingBook[0] !== undefined){
      setBookIdSelect(item.Book_Trade_req_book_idToBook.id)
      setStateOpen(true);
    }
  }

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









    const handleToBookInfo = (BookId: any) => {
        if (BookId !== null && BookId !== undefined) {

            router.push(`/bookinfo/${BookId.toString()}`)
        }
    }



    return (<>
        <style>
            {stateOpen?`body {
                overflow: hidden;
            }`:`body {
              overflow-x: hidden;
            }`}
        </style>
            <Navbar backGroundOn={true} withTitle={true}/>
            <TitleBar textTitle='หนังสือแลกเปลี่ยนของฉัน'/>
            {loading ?<div className="flex justify-center h-screen mt-52">
                        <HashLoader
                            className="ml-1 duration-300 "
                            color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
                    </div>
            :<div
            style={{minHeight: "800px", maxWidth: '1800px'}}
            className="flex items-center h-auto z-10 bg-none w-screen pb-20 flex-col mx-auto">

                    <div className="flex bg-dark3 w-10/12 h-auto mt-10 rounded-3xl flex-col">
                        <div className="flex w-full bg-dark1 text-white h-10 items-center justify-center rounded-t-3xl text-xl sm:text-2xl sm:h-12">{tradeBook?.title}</div>
                        <div className="flex justify-around py-5 px-5 responsive-trade-book">
                          <div className="flex w-full justify-around">
                              <div className="flex items-center justify-center rounded-sm w-24 h-36 shrink-0">
                              {
                              tradeBook?.picture && tradeBook.picture.length > 0 ?
                                <img
                                  onClick={() => handleToBookInfo(tradeBook?.id)}
                                  src={tradeBook.picture[0]}
                                  className="w-full h-full object-cover shadow shrink-0 cursor-pointer"
                                  alt="Trade Book"
                                />
                                :<div>
                                  <HashLoader
                                    className="ml-1 mr-2"
                                    color='#fff'
                                    loading={true}
                                    size={20}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                  />
                                </div>}
                                  
                              </div>
                              <div className="flex flex-col my-auto w-auto">
                                  <div className="flex justify-center text-xl text-white">วิธีการแลกเปลี่ยน</div>
                                  <div className="flex w-full justify-center">
                                      <div className="flex justify-center text-xl">{tradeBook?.pickup !== null  && tradeBook?.pickup !== undefined && tradeBook?.pickup !== '' 
                                      &&<div className="flex flex-col w-24 h-28 shadow-xl rounded-2xl bg-white scale-90 relative">
                                              <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-8 text-white">นัดรับ</div>
                                              <Icon icon="tdesign:undertake-delivery" width="50" height="50" 
                                              className='ml-2 mt-1'/>
                                              <Icon icon="mdi:hand-extended-outline" width="50" height="50"
                                              className='scale-x-[-1] absolute top-16 right-2' />
                                          </div>
                                      }</div>
                                      <div className="flex justify-center text-xl">{tradeBook?.address !== null  && tradeBook?.address !== undefined && tradeBook?.address !== '' 
                                      &&<div className="flex flex-col w-24 h-28 shadow-xl rounded-2xl bg-white items-center scale-90 relative">
                                              <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-8 text-white">จัดส่ง</div>
                                              <Icon icon="iconoir:delivery-truck" width="70" height="70" />
                                              <Icon icon="fluent:checkmark-12-filled" width="20" height="20" 
                                              className=' absolute top-14 left-8'/>
                                          </div>
                                      }</div>
                                  </div>
                              </div>
                            </div>
                            <div className="flex border-l-2 border-gray-400 "></div>
                            <div className="flex flex-col gap-5 my-auto w-full sm:w-2/3">
                                <div className="flex justify-center text-xl text-white">จำนวนหนังสือที่เสนอแลกเปลี่ยน</div>
                                <div className="flex justify-center text-xl text-white">{tradeReQuest?.length}</div>
                                <div className="flex justify-center text-xl text-white">เล่ม</div>
                            </div>
                        </div>
                    </div>
                    
                    
                    {tradingBook[0]?.status === 'trading' &&
                    <>
                      <div className="flex text-3xl text-dark1 font-bold mt-14 mb-10 sm:text-4xl">หนังสือที่กำลังเทรดด้วย</div>
                      <div 
                      onClick={() => handlePopuptrading(tradingBook[0])}
                      className='flex items-center justify-center rounded-sm border w-40 h-60 cursor-pointer shadow-sm hover:scale-105 duration-300 relative mb-5'>
                              <div className="flex flex-col absolute bottom-0 translate-y-12 text-base w-full">
                                  <div className="flex w-40 h-max  justify-center items-end  font-bold text-lg pt-4">{tradingBook[0].Book_Trade_req_book_idToBook.title}</div>
                              </div>
                              <img
                              src={tradingBook[0].Book_Trade_req_book_idToBook.picture[0]}
                              alt="Profile picture"
                              className='w-full h-full object-cover cursor-pointer bg-white'
                              />
                          </div>
                    </>
                    }  
                    



                    <div className="flex text-3xl text-dark1 font-bold mt-14 sm:text-4xl">หนังสือที่เสนอแลกเปลี่ยน</div>
                    {tradeReQuest.length === 0 ? <div className="flex  items-center h-52 text-xl font-bold text-gray-400 w-full pl-32">
                        ไม่มีหนังสือที่เสนอแลกเปลี่ยน
                        </div>
                    :<div
                    className="flex w-full h-auto p-10 flex-wrap justify-between mb-10 mt-5 gap-5 library-container sm:justify-start sm:w-auto sm:gap-20">
                      {tradeReQuest?.map((item, index) => (
                          <div
                          key={index}
                          onClick={() => handlePopup(item)}
                          className='flex items-center justify-center rounded-sm border w-40 h-60 cursor-pointer shadow-sm hover:scale-105 duration-300 relative'>
                                {(item.Book_Trade_req_book_idToBook.status === 'trading')&& 
                                <div 
                                    style={{backgroundColor:'#57575780'}}
                                    className={"absolute top-0 left-0 w-40 h-60 flex justify-center items-center font-bold text-xl duration-300"}>
                                    {item.Book_Trade_req_book_idToBook.status === 'trading' && <div className="flex">UNAVAILABLE</div>}
                                </div>}
                              <div className="flex flex-col absolute bottom-0 translate-y-12 text-base w-full">
                                  <div className="flex w-40 h-max  justify-center items-end  font-bold text-lg pt-4">{item.Book_Trade_req_book_idToBook.title}</div>
                              </div>
                              <img
                              src={item.Book_Trade_req_book_idToBook.picture[0]}
                              alt="Profile picture"
                              className='w-full h-full object-cover cursor-pointer bg-white'
                              />
                          </div>
                      ))}
                    </div>}

                    <div className="flex text-2xl text-dark1 font-bold mt-14 w-full px-5 sm:px-20">ประวัติหนังสือที่แลกเปลี่ยน</div>
                    {historyTrade.length === 0 ? <div className="flex  items-center h-52 text-xl font-bold text-gray-400 w-full pl-10 sm:pl-32">
                        ไม่มีประวัติหนังสือที่แลกเปลี่ยน
                        </div>
                    :
                      <div
                      className="flex w-full h-auto p-10 flex-wrap gap-20 mb-10 mt-5 library-container">
                        {historyTrade?.map((item, index) => (
                            <div
                            key={index}
                            onClick={() => handleToBookInfo(item.req_book_id)}
                            className='flex items-center justify-center rounded-sm border w-40 h-60 cursor-pointer shadow-sm hover:scale-105 duration-300 relative'>
                                <div className="flex flex-col absolute bottom-0 translate-y-12 text-base w-full">
                                    <div className="flex w-40 h-max  justify-center items-end  font-bold text-lg pt-4">{item.Book_Trade_req_book_idToBook.title}</div>
                                </div>
                                <img
                                src={item.Book_Trade_req_book_idToBook.picture[0]}
                                alt="Profile picture"
                                className='w-full h-full object-cover cursor-pointer bg-white'
                                />
                            </div>
                        ))}
                      </div>}
            </div>}







            <Footer/>
            <div className={classAddBookbg}></div>
            <ManageRequest stateOpen={stateOpen} setStateOpen={setStateOpen} classAddBook={classAddBook} setLoadcompo={setLoadcompo} tradeReQuest={tradeReQuest} bookIdSelect={bookIdSelect} tradingBook={tradingBook}/>
            

            
        </>
        
    )
}

export default TradeBookSelect