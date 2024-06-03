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
import { useRouter } from 'next/navigation'
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

function TradeBook() {
    const [loading, setLoading] = useState(true)
    const [ loadcompo, setLoadcompo] = useState(false)
    const { data: session, status } = useSession()
    const userId  = session?.user.id;
    const router = useRouter()
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    const [tradeBook, setTradeBook] = useState<BookRequest[]>([]);
    const [allTradeBook, setAllTradeBook] = useState<BookRequest[]>([]);
    const [statusAllbook, setStatusAllbook] = useState(true);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/trade/mybookrequest/${userId}`);
                const myBookRequest: BookRequest[] = response.data.mybookrequest;
    
                const bookRequestWithBooks = myBookRequest.filter((request: BookRequest) => {
                    const hasBooks = request.Trade_Trade_book_idToBook.length !== 0;
                    console.log(`Request ID: ${request.id}, Has Books: ${hasBooks}`);
                    return hasBooks;
                });
    
                const bookRequestTrading = myBookRequest.filter((request: BookRequest) => {
                    const isTrading = request.status === 'trading';
                    console.log(`Request ID: ${request.id}, Is Trading: ${isTrading}`);
                    return isTrading;
                });

                const combinedBookRequest = [...bookRequestTrading,...bookRequestWithBooks ];
                
                const uniqueBookRequests = combinedBookRequest.reduce((acc: BookRequest[], current: BookRequest) => {
                    const x = acc.find(item => item.id === current.id);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
    
                console.log('Unique Book Requests:', uniqueBookRequests);
    
                setTradeBook(uniqueBookRequests);
                setAllTradeBook(response.data.mybookrequest)
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
    
    
    console.log('book', tradeBook);
    console.log('allbook', allTradeBook);



    const handleToBookInfo = (BookId: number | null | undefined) => {
        if (BookId !== null && BookId !== undefined) {

            router.push(`/tradebook/${BookId.toString()}`)
        }
    }

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
                <div className="flex gap-3 items-center w-10/12 pl-10 mt-5">
                    <div
                    onClick={()=>setStatusAllbook(true)}
                    className={statusAllbook?"flex text-dark1 font-bold cursor-pointer duration-200":"flex text-gray-400 font-bold cursor-pointer duration-200"}>ทั้งหมด</div>
                    <div className="flex h-8 border-l border-dark1"></div>
                    <div
                    onClick={()=>setStatusAllbook(false)}
                    className={statusAllbook?"flex text-gray-400 font-bold cursor-pointer duration-200":"flex text-dark1 font-bold cursor-pointer duration-200"}>เฉพาะหนังสือที่มีการเสนอแลกเปลี่ยน</div>
                </div>
                {statusAllbook?
                    (allTradeBook.map((book) => (
                        <div key={book.id} className="flex bg-dark3 w-10/12 h-auto mt-10 rounded-3xl flex-col ">
                            <div className="flex w-full bg-dark1 text-white h-10 items-center justify-center rounded-t-3xl text-xl sm:text-2xl sm:h-12">{book.title}</div>
                            <div className="flex justify-around py-5 px-5 responsive-trade-book">
                                <div className="flex w-full justify-around">
                                    
                                    <div className="flex items-center justify-center rounded-sm w-24 h-36 shrink-0 relative">
                                        <img src={book.picture[0]} className="w-full h-full object-cover shadow shrink-0 scale-90 sm:scale-100" />
                                        {(book.status === 'trading' || book.status === 'pending' || book.status === 'traded' || book.status === 'decline' )&& 
                                            <div 
                                                style={{backgroundColor:'#57575780'}}
                                                className={"absolute top-0 left-0 w-24 h-36 flex justify-center items-center font-bold text-xl duration-300 scale-90 sm:scale-100"}>
                                                {book.status === 'trading' && <div className="flex text-green-400">TRADING</div>}
                                            </div>}
                                    </div>
                                    <div className="flex flex-col my-auto w-60 ">
                                        <div className="flex justify-center text-white sm:text-xl">วิธีการแลกเปลี่ยน</div>
                                        <div className="flex w-full justify-center scale-75 sm:scale-100"> 
                                            <div className="flex justify-center text-xl">{book.pickup !== null  && book.pickup !== undefined && book.pickup !== '' 
                                            &&<div className="flex flex-col w-24 h-28 shadow-xl rounded-2xl bg-white scale-90 relative">
                                                    <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-8 text-white">นัดรับ</div>
                                                    <Icon icon="tdesign:undertake-delivery" width="50" height="50" 
                                                    className='ml-2 mt-1'/>
                                                    <Icon icon="mdi:hand-extended-outline" width="50" height="50"
                                                    className='scale-x-[-1] absolute top-16 right-2' />
                                                </div>
                                            }</div>
                                            <div className="flex justify-center text-xl">{book.address !== null  && book.address !== undefined && book.address !== '' 
                                            &&<div className="flex flex-col w-24 h-28 shadow-xl rounded-2xl bg-white items-center scale-90 relative">
                                                    <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-8 text-white">จัดส่ง</div>
                                                    <Icon icon="iconoir:delivery-truck" width="70" height="70" />
                                                    <Icon icon="fluent:checkmark-12-filled" width="20" height="20" 
                                                    className=' absolute top-14 left-8'/>
                                                </div>
                                            }</div>
                                        </div>
                                    </div>
                                    <div className="flex border-l-2 border-gray-400 responsive-close-css"></div>
                                </div>
                                <div className="flex w-full justify-around">
                                    <div className="flex flex-col gap-5 my-auto">
                                        <div className="flex justify-center text-white sm:text-xl text-center ">จำนวนหนังสือ<br className='sm:hidden'/>ที่เสนอแลกเปลี่ยน</div>
                                        <div className="flex justify-center text-white sm:text-xl">{book.Trade_Trade_book_idToBook.length}</div>
                                        <div className="flex justify-center text-white sm:text-xl">เล่ม</div>
                                    </div>
                                    <div className="flex border-l-2 border-gray-400"></div>
                                    <button 
                                    onClick={() => handleToBookInfo(book.id)}
                                    className={book.status === 'trading' ? "flex ml-2 text-sm text-white bg-dark2 h-10 items-center justify-center w-36 rounded-full my-auto underline sm:text-xl sm:w-44"
                                    :"flex text-white ml-2 text-sm bg-dark2 h-10 items-center justify-center w-32 rounded-full my-auto underline sm:text-xl sm:w-44"}>{book.status === 'trading' ? 'ข้อมูลแลกเปลี่ยน' :'ดำเนินการต่อ'}</button>
                                </div>
                            </div>
                        </div>
                    )))
                    :(tradeBook.map((book) => (
                        <div key={book.id} className="flex bg-dark3 w-10/12 h-auto mt-10 rounded-3xl flex-col ">
                            <div className="flex w-full bg-dark1 text-white h-10 items-center justify-center rounded-t-3xl text-xl sm:text-2xl sm:h-12">{book.title}</div>
                            <div className="flex justify-around py-5 px-5 responsive-trade-book">
                                <div className="flex w-full justify-around">
                                    
                                    <div className="flex items-center justify-center rounded-sm w-24 h-36 shrink-0 relative">
                                        <img src={book.picture[0]} className="w-full h-full object-cover shadow shrink-0 scale-90 sm:scale-100" />
                                        {(book.status === 'trading' || book.status === 'pending' || book.status === 'traded' || book.status === 'decline' )&& 
                                            <div 
                                                style={{backgroundColor:'#57575780'}}
                                                className={"absolute top-0 left-0 w-24 h-36 flex justify-center items-center font-bold text-xl duration-300 scale-90 sm:scale-100"}>
                                                {book.status === 'trading' && <div className="flex text-green-400">TRADING</div>}
                                            </div>}
                                    </div>
                                    <div className="flex flex-col my-auto w-60 ">
                                        <div className="flex justify-center text-white sm:text-xl">วิธีการแลกเปลี่ยน</div>
                                        <div className="flex w-full justify-center scale-75 sm:scale-100"> 
                                            <div className="flex justify-center text-xl">{book.pickup !== null  && book.pickup !== undefined && book.pickup !== '' 
                                            &&<div className="flex flex-col w-24 h-28 shadow-xl rounded-2xl bg-white scale-90 relative">
                                                    <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-8 text-white">นัดรับ</div>
                                                    <Icon icon="tdesign:undertake-delivery" width="50" height="50" 
                                                    className='ml-2 mt-1'/>
                                                    <Icon icon="mdi:hand-extended-outline" width="50" height="50"
                                                    className='scale-x-[-1] absolute top-16 right-2' />
                                                </div>
                                            }</div>
                                            <div className="flex justify-center text-xl">{book.address !== null  && book.address !== undefined && book.address !== '' 
                                            &&<div className="flex flex-col w-24 h-28 shadow-xl rounded-2xl bg-white items-center scale-90 relative">
                                                    <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-8 text-white">จัดส่ง</div>
                                                    <Icon icon="iconoir:delivery-truck" width="70" height="70" />
                                                    <Icon icon="fluent:checkmark-12-filled" width="20" height="20" 
                                                    className=' absolute top-14 left-8'/>
                                                </div>
                                            }</div>
                                        </div>
                                    </div>
                                    <div className="flex border-l-2 border-gray-400 responsive-close-css"></div>
                                </div>
                                <div className="flex w-full justify-around">
                                    <div className="flex flex-col gap-5 my-auto">
                                        <div className="flex justify-center text-white sm:text-xl text-center ">จำนวนหนังสือ<br className='sm:hidden'/>ที่เสนอแลกเปลี่ยน</div>
                                        <div className="flex justify-center text-white sm:text-xl">{book.Trade_Trade_book_idToBook.length}</div>
                                        <div className="flex justify-center text-white sm:text-xl">เล่ม</div>
                                    </div>
                                    <div className="flex border-l-2 border-gray-400"></div>
                                    <button 
                                    onClick={() => handleToBookInfo(book.id)}
                                    className={book.status === 'trading' ? "flex ml-2 text-sm text-white bg-dark2 h-10 items-center justify-center w-36 rounded-full my-auto underline sm:text-xl sm:w-44"
                                    :"flex text-white ml-2 text-sm bg-dark2 h-10 items-center justify-center w-32 rounded-full my-auto underline sm:text-xl sm:w-44"}>{book.status === 'trading' ? 'ข้อมูลแลกเปลี่ยน' :'ดำเนินการต่อ'}</button>
                                </div>
                            </div>
                        </div>
                    )))
                }
            </div>}







            <Footer/>

                
            

            
        </>
        
    )
}

export default TradeBook