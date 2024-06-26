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

function Library() {
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



    const [stateAddBook, setStateAddBook] = useState(false)
    const [classAddBookbg, setClassAddBookbg] = useState('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl hidden')
    const [classAddBook, setClassAddBook] = useState({
        transform:'translateY(100%)',
        visibility: "hidden",
        transitionDuration: '0.3s'
    })

    const [book, setBook] = useState<Book[]>([]);

    useEffect(() => {
        if (stateAddBook) {
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
    }, [stateAddBook])

    useEffect(() => {
        console.log('userId', userId);
        setLoadcompo(false);

        const fetchData = async () => {
            try {
                const response = await axios.get<{ library: Book[] }>(`/api/library/${userId}`);

                const sortedLibrary = response.data.library.sort((a, b) => b.id - a.id);
                
                setBook(sortedLibrary);
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


    const handleToBookInfo = (BookId: number | null | undefined) => {
        if (BookId !== null && BookId !== undefined) {

            router.push(`/bookinfo/${BookId.toString()}`)
        }
    }

    return (<>
        <style>
            {stateAddBook
            ?`body {
                overflow: hidden;
            }`
            :`body {
                overflow-x: hidden;
            }`}
        </style>
            <Navbar backGroundOn={true} withTitle={true}/>
            <TitleBar textTitle='คลังหนังสือของฉัน'/>
            {loading ?<div className="flex justify-center h-screen mt-52">
                        <HashLoader
                            className="ml-1 duration-300 "
                            color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
                    </div>
            :<div
            style={{minHeight: "800px"}}
            className="flex justify-center h-auto w-sceen z-10 bg-none">
                <div
                className="flex w-full h-auto p-10 flex-wrap justify-between mb-10 mt-5 max-w-[1700px] gap-5 library-container sm:justify-start sm:w-auto sm:gap-20">
                    <div 
                    onClick={() => setStateAddBook(true)}
                    className="flex items-center justify-center rounded-sm border w-40 h-60 bg-slate-200 cursor-pointer shadow-sm hover:bg-slate-300  hover:scale-105 duration-300 sm:w-64 sm:h-96">
                        <Icon icon="ic:baseline-plus" width="50" height="50"
                        className='text-gray-500'/>
                    </div>
                    {book.map((item, index) => (
                        <div
                        onClick={()=>handleToBookInfo(item.id)} // ต้องส่งค่าไปหน้า BookInfo
                        key={index}
                        className='flex items-center justify-center rounded-sm border w-40 h-60 mb-12 cursor-pointer shadow-sm hover:scale-105 duration-300 relative sm:w-64 sm:h-96'>
                            <div className="flex absolute top-0 -translate-y-5 text-base w-full">
                                <div className="flex w-full justify-start gap-2">
                                    {item.isPost_trade &&<div className="flex text-xs text-green-600 font-bold">[ POST ]</div>}
                                    {item.status === 'trading' && <div className="flex text-xs text-orange-800 font-bold">[ TRADING ]</div>}
                                </div>
                            </div>
                            <div className="flex flex-col absolute bottom-0 translate-y-8 text-base w-full sm:translate-y-12">
                                <div className="flex w-full justify-center ">{item.title}</div>
                            </div>
                            <img
                            src={item.picture[0]}
                            alt="Profile picture"
                            className='w-full h-full object-cover cursor-pointer bg-white'
                            />
                        </div>
                    ))}


                </div>
            </div>}
            <Footer/>
            <div className={classAddBookbg}></div>
            <PostNewBook setStateAddBook={setStateAddBook} classAddBook={classAddBook} setLoadcompo={setLoadcompo} />
                
            

            
        </>
        
    )
}

export default Library