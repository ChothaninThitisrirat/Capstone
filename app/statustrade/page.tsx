'use client'

import { useState, useEffect } from "react";
import Navbar from '@/Components/Navbar';
import TitleBar from '@/Components/TitleBar';
import Footer from '@/Components/Footer';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { Icon } from '@iconify/react';
import HashLoader from "react-spinners/HashLoader";
import StatusTrade from '@/Components/StatusTrade';
import UserReview from '@/Components/UserReview';

interface Book {
    Book_Trade_book_idToBook:{
        id: number;
        title: string;
        picture: string[];
    }
    id: number;
    status: string;
}


function statustrade() {



    const [loading, setLoading] = useState(true)
    const [ loadcompo, setLoadcompo] = useState(false)
    const [ loadReview, setLoadReview] = useState(false)
    const { data: session, status } = useSession()
    const userId  = session?.user.id;
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    const [stateOpen, setStateOpen] = useState(false)
    const [popUpReviewUser, setPopUpReviewUser] = useState(false) //
    const [reloadInfo, setReloadInfo] = useState(false) 
    
    const [classAddBookbg, setClassAddBookbg] = useState('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl hidden')
    const [classAddBook, setClassAddBook] = useState({
        transform:'translateY(100%)',
        visibility: "hidden",
        transitionDuration: '0.3s'
    })
    const [classReviewUser, setClassReviewUser] = useState({
        transform:'translateY(100%)',
        visibility: "hidden",
        transitionDuration: '0.3s'
    })

    const [book, setBook] = useState<Book[] | null>([]);
    const [tradeId, setTradeId] = useState<number>(0)

    

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

    useEffect(() => {
        if (popUpReviewUser) {
            setClassAddBookbg('visible fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl')
            setClassReviewUser({
                transform:'translateY(0%)',
                visibility: "visible",
                transitionDuration: '0.3s'
            })
        } else {
            setClassAddBookbg('hidden fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl')
            setClassReviewUser({
                transform:'translateY(100%)',
                visibility: "hidden",
                transitionDuration: '0.3s'
            })
        }   
    }, [popUpReviewUser])

    useEffect(() => {
        setLoadcompo(false);
    
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/trade/myrequest/${userId}`);
                console.log(response.data)
                if(response.data.myrequest !== null){
                    setBook(response.data.myrequest.reverse());
                }else{
                    setBook(null)
                }
                setLoading(false);
            
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        if (userId !== undefined) {
        fetchData(); 
        }
    }, [userId, loadcompo]);
    


    const handleStatusCheck = (trade: any) => {
        
        if (trade.status !== 'decline'){
            setReloadInfo((p)=>!p)
            setStateOpen(true)
            setTradeId(trade.id)
        }
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
        <Navbar backGroundOn={true} withTitle={true}/>
        <TitleBar textTitle='สถานะคำขอแลกเปลี่ยน'/>
        {loading ?<div className="flex justify-center h-screen mt-52">
                    <HashLoader
                        className="ml-1 duration-300 "
                        color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
                </div>
        :
        (book === null)  
        ?<div className="flex justify-center items-center h-auto mt-40 mb-96 text-xl font-bold text-gray-400 sm:mt-40 sm:py96 sm:text-3xl">
            ยังไม่มีหนังสือที่เทรดอยู่!
        </div>
            :<div
        style={{minHeight: "800px"}}
        className="flex justify-center h-auto w-sceen z-10 bg-none">
            <div
            className="flex w-full h-auto p-10 flex-wrap justify-between mb-10 mt-5 max-w-[1700px] gap-5 library-container sm:justify-start sm:w-auto sm:gap-20">
                {book.map((item, index) => (
                    <div key={index} 
                    onClick={() => handleStatusCheck(item)}
                    
                    className='flex items-center justify-center rounded-sm border w-40 h-60 cursor-pointer shadow-sm hover:scale-105 duration-300 relative sm:w-64 sm:h-96'>
                        <div className="flex absolute bottom-0 translate-y-16 text-base font-bold">
                            {item.Book_Trade_book_idToBook.title}
                        </div>
                        <div className="flex absolute top-0 -translate-y-5 text-base w-full">
                                <div className="flex w-full justify-start gap-2">
                                    <div className="flex text-xs text-gray-400 font-bold"># {item.id}</div>
                                </div>
                            </div>
                        <img
                        src={item.Book_Trade_book_idToBook.picture[0]}
                        alt="Profile picture"
                        className='w-full h-full object-cover cursor-pointer bg-white'
                        />
                        {(item.status === 'trading' || item.status === 'pending' || item.status === 'traded' || item.status === 'decline' )&& 
                        <div 
                            style={{backgroundColor:'#57575780'}}
                            className={"absolute top-0 left-0 w-40 h-60 flex justify-center items-center font-bold text-2xl duration-300 sm:w-64 sm:h-96"}>
                            {item.status === 'trading' && <div className="flex text-green-400">TRADING</div>}
                            {item.status === 'pending' && <div className="flex text-orange-300">PENDING</div>}
                            {item.status === 'traded' && <div className="flex">TRADED</div>}
                            {item.status === 'decline' && <div className="flex text-red-500">DECLINED</div>}
                        </div>}
                    </div>
                ))}


            </div>
        </div>}
        
        <Footer/>
        <div className={classAddBookbg}></div>
        <StatusTrade setStateOpen={setStateOpen} classAddBook={classAddBook} tradeId={tradeId} setLoadcompo={setLoadcompo} setPopUpReviewUser={setPopUpReviewUser} reloadInfo={reloadInfo}/>
        <UserReview classReviewUser={classReviewUser} setPopUpReviewUser={setPopUpReviewUser} tradeId={tradeId} tradebook={false} setLoadReview={setLoadReview}/>
        </>
    )
}

export default statustrade