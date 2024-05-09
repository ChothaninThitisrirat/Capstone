'use client'

import React from 'react'
import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import Image from 'next/image';
import PostBook1 from './PostBook1';
import PostBook2 from './PostBook2';
import PostBook3 from './PostBook3';
import bgExchangebook from '../../public/images/bgExchangebook.png';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


function PostBook() {
    const { data: session, status } = useSession()
    const router = useRouter()
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])
    const [statePage, setStatePage] = useState(0)
    const [showExchangeInfo1, setShowExchangeInfo1] = useState(false);
    const [showExchangeInfo2, setShowExchangeInfo2] = useState(false);
    const [bookSelect, setBookSelect] = useState('');
    

    useEffect(() => {
        if(statePage === 0 ){
            setShowExchangeInfo2(false);
            setTimeout(() => {
                setShowExchangeInfo1(true);
            }, 300);
        }else if(statePage === 1){
            setShowExchangeInfo1(false);
            setTimeout(() => {
                setShowExchangeInfo2(true);
            }, 300);
        }else{
            setShowExchangeInfo1(false);
            setShowExchangeInfo2(false);
        }
        console.log(bookSelect)
    }, [statePage]);



    return (
        <>
        <style>
            {`
            body {
                overflow: hidden;
            }
            `}
        </style>
            <div className='flex w-screen h-24 bg-dark1 shadow-lg z-30'>
                <div className="flex h-full w-auto items-center ml-20">

                    <div 
                    onClick={ statePage < 2 ?() => setStatePage(0):undefined}
                    className={statePage === 0 ?"flex items-center justify-center bg-orange-400 w-12 h-12 rounded-full duration-1000 cursor-pointer":statePage === 2 ? "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000":"flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 cursor-pointer"}>
                        <Icon icon="material-symbols:book-outline" width="30" height="30" className='text-white duration-500' />
                    </div>
                    {statePage === 0 && showExchangeInfo1 &&
                    <div className="flex items-center justify-center text-white text-lg ml-5 duration-500 absolute left-32">
                        เลือกหนังสือของคุณ</div>}
                    <Icon icon="icon-park-outline:right" width="40" height="40" className={statePage === 0 ?'text-white duration-500 ml-44':'text-white duration-500'}/>
                    <div 
                    onClick={ statePage === 0 && bookSelect !== '' ? () => setStatePage(1): statePage === 2 ? undefined:undefined}
                    className={statePage === 0 ? "flex items-center justify-center bg-gray-200 w-12 h-12 rounded-full duration-1000 cursor-pointer"
                    :statePage === 1 ? "flex items-center justify-center bg-orange-400 w-12 h-12 rounded-full duration-1000 text-white cursor-pointer": "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 text-white"}>
                        <Icon icon="ion:document-text-outline" width="30" height="30" />
                    </div>
                    {statePage === 1 && showExchangeInfo2 &&
                    <div className="flex items-center justify-center text-white text-lg ml-5 duration-500 absolute left-52">
                        ข้อมูลการแลกเปลี่ยน</div>}
                    <Icon icon="icon-park-outline:right" width="40" height="40" className={statePage === 1?'text-white duration-500 ml-40':'text-white'}/>
                    <div 
                    className={statePage < 2 ? "flex items-center justify-center bg-gray-200 w-12 h-12 rounded-full duration-1000" : "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 text-white"}>
                        <Icon icon="carbon:checkmark-outline" width="30" height="30" />
                    </div>
                    {statePage === 2 &&<div className="flex items-center justify-center text-white text-lg ml-5 duration-500">ดำเนินการสำเร็จ</div>}
                </div>
            </div>
            <Image
            src={bgExchangebook}
            alt="Profile picture"
            className='fixed z-0 opacity-30 w-screen h-screen object-cover left-0'
            />
            {statePage === 0 && <PostBook1 setStatePage={setStatePage} setBookSelect={setBookSelect} bookSelect={bookSelect}/>}
            {statePage === 1 && <PostBook2 setStatePage={setStatePage}/>}
            {statePage === 2 && <PostBook3 bookSelect={bookSelect}/>}
            


        </>
    )
}

export default PostBook