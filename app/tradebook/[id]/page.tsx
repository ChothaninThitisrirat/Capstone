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
    const [tradeReQuest, setTradeReQuest] = useState<tradeReQuest[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/trade/mybookrequest/${userId}/${bookId}`);
                console.log('response', response.data.mybookrequest);

                setTradeBook(response.data.mybookrequest);
                // setTradeReQuest(response.data.mybookrequest.Trade_Trade_book_idToBook);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        if (bookId !== undefined && userId !== undefined) {
        fetchData(); 
        }
    }, [userId,bookId]);
    
    console.log(userId,bookId,'tradeBook', tradeBook);
    console.log('tradeReQuest', tradeReQuest);

    return (<>
        <style>
            {`body {
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
{/* 
                    <div className="flex bg-dark3 w-10/12 h-auto mt-10 rounded-3xl flex-col">
                        <div className="flex w-full bg-dark1 text-white h-12 items-center justify-center rounded-t-3xl text-2xl">{tradeBook?.title}</div>
                        <div className="flex justify-around py-5 px-5">
                            <div className="flex items-center justify-center rounded-sm w-24 h-36 shrink-0">
                                <img src={tradeBook?.picture} className="w-full h-full object-cover shadow shrink-0" />
                            </div>
                            <div className="flex flex-col my-auto w-60">
                                <div className="flex justify-center text-xl text-white">วิธีการแลกเปลี่ยน</div>
                                <div className="flex w-full justify-center">
                                    <div className="flex justify-center text-xl">{tradeBook?.pickup !== null  && tradeBook?.pickup !== undefined && tradeBook?.pickup !== '' 
                                    &&<div className="flex flex-col w-24 h-28 shadow-xl rounded-2xl bg-white scale-90 relative z-30">
                                            <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-8 text-white">นัดรับ</div>
                                            <Icon icon="tdesign:undertake-delivery" width="50" height="50" 
                                            className='ml-2 mt-1'/>
                                            <Icon icon="mdi:hand-extended-outline" width="50" height="50"
                                            className='scale-x-[-1] absolute top-16 right-2' />
                                        </div>
                                    }</div>
                                    <div className="flex justify-center text-xl">{tradeBook?.address !== null  && tradeBook?.address !== undefined && tradeBook?.address !== '' 
                                    &&<div className="flex flex-col w-24 h-28 shadow-xl rounded-2xl bg-white items-center scale-90 relative z-30">
                                            <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-8 text-white">จัดส่ง</div>
                                            <Icon icon="iconoir:delivery-truck" width="70" height="70" />
                                            <Icon icon="fluent:checkmark-12-filled" width="20" height="20" 
                                            className=' absolute top-14 left-8'/>
                                        </div>
                                    }</div>
                                </div>
                            </div>
                            <div className="flex border-l-2 border-gray-400 "></div>
                            <div className="flex flex-col gap-5 my-auto">
                                <div className="flex justify-center text-xl text-white">จำนวนหนังสือที่เสนอแลกเปลี่ยน</div>
                                <div className="flex justify-center text-xl text-white">{tradeBook?.Trade_Trade_book_idToBook.length}</div>
                                <div className="flex justify-center text-xl text-white">เล่ม</div>
                            </div>
                        </div>
                    </div>
                    
                     */}


                    <div className="flex text-3xl text-dark1 font-bold mt-14">หนังสือที่เสนอแลกเปลี่ยน</div>

                    
            </div>}







            <Footer/>
                
            

            
        </>
        
    )
}

export default TradeBookSelect