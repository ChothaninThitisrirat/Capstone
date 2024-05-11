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

interface Book {
    id: number;
    title: string;
    picture: string;
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
                const response = await axios.get(`/api/library/${userId}`);
                setBook(response.data.library);
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
            <Navbar backGroundOn={true}/>
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
                className="flex w-full h-auto p-10 flex-wrap gap-20 mb-10 mt-5 library-container">
                    <div 
                    onClick={() => setStateAddBook(true)}
                    className="flex items-center justify-center rounded-sm border w-64 h-96 bg-slate-200 cursor-pointer shadow-sm hover:bg-slate-300  hover:scale-105 duration-300">
                        <Icon icon="ic:baseline-plus" width="50" height="50"
                        className='text-gray-500'/>
                    </div>
                    {book.map((item, index) => (
                        <div key={index} 
                        className='flex items-center justify-center rounded-sm border w-64 h-96 cursor-pointer shadow-sm hover:scale-105 duration-300 relative'>
                            <div className="flex absolute bottom-0 translate-y-10 text-base">{item.title}</div>
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