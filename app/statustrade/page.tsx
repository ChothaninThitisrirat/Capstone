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

interface Book {
    Book_Trade_book_idToBook:any
    status: string;
}


function statustrade() {

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

    const [stateOpen, setStateOpen] = useState(false)
    const [classAddBookbg, setClassAddBookbg] = useState('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl hidden')
    const [classAddBook, setClassAddBook] = useState({
        transform:'translateY(100%)',
        visibility: "hidden",
        transitionDuration: '0.3s'
    })

    const [book, setBook] = useState<Book[]>([]);
    const [bookId, setBookId] = useState(44)
    const [bookStatus, setBookStatus] = useState('')



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
        console.log('userId', userId);
        setLoadcompo(false);
    
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/trade/myrequest/${userId}`);
                console.log(response.data)
                setBook(response.data.myrequest);
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
    
    console.log('book', book);

    const handleStatusCheck = (book: any) => {
        setStateOpen(true)
        setBookId(book.Book_Trade_book_idToBook.id)
        setBookStatus(book.status)
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
        :<div
        style={{minHeight: "800px"}}
        className="flex justify-center h-auto w-sceen z-10 bg-none">
            <div
            className="flex w-full h-auto p-10 flex-wrap gap-20 mb-10 mt-5 library-container">
                {book.map((item, index) => (
                    <div key={index} 
                    onClick={() => handleStatusCheck(item)}
                    
                    className='flex items-center justify-center rounded-sm border w-64 h-96 cursor-pointer shadow-sm hover:scale-105 duration-300 relative'>
                        <div className="flex absolute bottom-0 translate-y-10 text-base">
                            {item.Book_Trade_book_idToBook.title}
                            {item.status}
                        </div>
                        <img
                        src={item.Book_Trade_book_idToBook.picture[0]}
                        alt="Profile picture"
                        className='w-full h-full object-cover cursor-pointer bg-white'
                        />
                        {(item.status === 'trading' || item.status === 'pending' || item.status === 'traded' || item.status === 'approved' || item.status === 'declined' )&& 
                        <div 
                            style={{backgroundColor:'#57575780'}}
                            className={"absolute top-0 left-0 w-64 h-96 flex justify-center items-center font-bold text-2xl duration-300"}>
                            {item.status === 'trading' && <div className="flex text-yellow-400">TRADING</div>}
                            {item.status === 'pending' && <div className="flex text-orange-300">PENDING</div>}
                            {item.status === 'traded' && <div className="flex">TRADED</div>}
                            {item.status === 'approved' && <div className="flex text-green-400">APPROVED</div>}
                            {item.status === 'declined' && <div className="flex text-red-500">DECLINED</div>}
                        </div>}
                    </div>
                ))}


            </div>
        </div>}
        <Footer/>
        <div className={classAddBookbg}></div>
        <StatusTrade setStateOpen={setStateOpen} classAddBook={classAddBook} bookId={bookId} bookStatus={bookStatus}/>
        </>
    )
}

export default statustrade