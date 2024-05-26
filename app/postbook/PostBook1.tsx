'use client'

import React from 'react'
import { useState, useEffect } from "react";
import Image from 'next/image';
import { Icon } from '@iconify/react';
import PostNewBook from '@/Components/PostNewBook';
import { useRouter } from 'next/navigation'
import bgExchangebook from '../../public/images/bgExchangebook.png';
import propFooter from '../../public/images/propFooter.png';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import HashLoader from "react-spinners/HashLoader";


interface PostBook1Props {
    setStatePage: (style: number) => void;
    setBookSelect: (style: number | null) => void;
    bookSelect: number | null;
    setLoadcompo: (state: boolean) => void;
    book: any;
    loading: boolean;
}

interface BookProp {
    id: number;
    title: string;
    picture: string;
    status: string;
}
const PostBook1: React.FC<PostBook1Props> = ({setStatePage, setBookSelect, bookSelect, setLoadcompo, book, loading}) =>{

    const classBook = "flex items-center justify-center rounded-sm border w-40 h-60 mb-5 sm:mb-12 cursor-pointer shadow-sm duration-300 relative sm:w-64 sm:h-96"
    const [stateAddBook, setStateAddBook] = useState(false)
    const [classAddBookbg, setClassAddBookbg] = useState('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl hidden')
    const [classAddBook, setClassAddBook] = useState({
        transform:'translateY(100%)',
        visibility: "hidden",
        transitionDuration: '0.3s'
    })
    
    const [bookProp, setBookProp] = useState<BookProp[]>([]);




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
        setBookProp(book)
    }, [book])

    const router = useRouter();

    const handleCancel = () => {
        router.back();
    };

    const handlesetBookSelect = (itemId:number) => {
        if (bookSelect === itemId) {
            setBookSelect(null);
            return;
        }else{
            setBookSelect(itemId);
        }
    };

    const handleChangeState = ()=>{
        if (bookSelect !== null) {
            setStatePage(1);
        }
    }



    return (
        <>
            {loading ?<div className="flex justify-center h-screen mt-52">
                        <HashLoader
                            className="ml-1 duration-300 "
                            color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
                    </div>
            :<div
            style={{minHeight: "800px"}}
            className="flex justify-center h-auto w-sceen z-10 bg-none">
                <div
                className="flex w-full h-auto p-10 flex-wrap justify-between mb-10 mt-5 max-w-[1700px] gap-5 library-container sm:justify-start sm:w-auto sm:gap-20
                gap-y-14 overflow-y-auto close-scrollbar z-10 library-container pb-52 sm:pt-20">
                    <div 
                    onClick={() => setStateAddBook(true)}
                    className="flex items-center justify-center rounded-sm border w-40 h-60 bg-slate-200 cursor-pointer shadow-sm hover:bg-slate-300  hover:scale-105 duration-300 sm:w-64 sm:h-96">
                        <Icon icon="ic:baseline-plus" width="50" height="50"
                        className='text-gray-500'/>
                    </div>

                    {bookProp.map((item, index) => (
                        <div 
                        key={index}
                        className='flex flex-col'>
                            <div 
                            key={index} 
                            onClick={()=>handlesetBookSelect(item.id)}
                            className={classBook+' '+(bookSelect === item.id ?' scale-105' : '')}>
                                
                                <div className="flex absolute top-0 -translate-y-5 text-base w-full">
                                    <div className="flex w-full justify-start gap-2">
                                        {item.status === 'trading' && <div className="flex text-xs text-orange-800 font-bold">[ TRADING ]</div>}
                                    </div>
                                </div>
                                <img
                                src={ item.picture[0] !== '' ? item.picture[0] : 'https://picsum.photos/200/300'}
                                alt="Profile picture"
                                className={'w-full h-full object-cover cursor-pointer bg-white'+' '+(bookSelect === item.id ?' border-4 border-dark2' : '')}
                                />
                                

                            </div>
                            <div className='flex mx-auto sm:mt-5'>{item.title}</div>
                        </div>
                    ))}
                </div>
            </div>}
            <div className={classAddBookbg}></div>
            <PostNewBook setStateAddBook={setStateAddBook} classAddBook={classAddBook} setLoadcompo={setLoadcompo}/>
            <div className='fixed bottom-0 left-0 w-screen h-24 z-20 flex justify-between scale-90 sm:scale-100'>
                    <button onClick={handleCancel} className='w-20 h-10 border-2 border-red-500 rounded-full sm:ml-20 mt-2 hover:bg-red-100'>ยกเลิก</button>
                    <button onClick={handleChangeState} 
                    className={bookSelect === null
                    ?'w-40 h-10 border-2 border-gray-500 text-gray-500 rounded-full sm:mr-16 mt-2 flex justify-center items-center gap-2'
                    :'w-40 h-10 bg-dark1 text-white rounded-full ms:mr-16 mt-2 flex justify-center items-center gap-2'}>
                        ดำเนินการต่อ<Icon icon="icons8:right-round" width="30" height="30" />
                    </button>
            </div>
        </>
    )
}

export default PostBook1