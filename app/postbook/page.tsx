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
import axios from 'axios';

interface Book {
    id: number;
    title: string;
    picture: string;
}

function PostBook() {
    const { data: session, status } = useSession()
    const router = useRouter()   
    const userId: number | undefined = session?.user.id
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])
    
    useEffect(() => {
        const fetchData = async (userId:any)=>{
            try{
                const response = await axios.get(`/api/user/${userId}/contact`)
                if(response.data.contact.line === null || response.data.contact.line.replace(/\s+/g, '') === '' && response.data.contact.instagram === null || response.data.contact.instagram.replace(/\s+/g, '') === '' && response.data.contact.facebook === null || response.data.contact.facebook.replace(/\s+/g, '') === ''){
                    router.push('/editprofile')
                    alert('กรุณากรอกข้อมูลการติดต่อก่อนใช้งาน')
                }
            }
            catch(err){
                console.log(err)
            }
        }
        if (userId !== undefined) {
            fetchData(userId)
        }
        
    }, [userId])
    
    const [statePage, setStatePage] = useState(0)
    const [showExchangeInfo1, setShowExchangeInfo1] = useState(false);
    const [showExchangeInfo2, setShowExchangeInfo2] = useState(false);
    const [bookSelect, setBookSelect] = useState<number | null>(null);
    
    const [ loadcompo, setLoadcompo] = useState(false)
    const [book, setBook] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true)
 
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


    
    useEffect(() => {
        console.log('userId', userId);
        setLoadcompo(false);
    
        const fetchData = async () => {
            try {
                const response = await axios.get<{ library: Book[] }>(`/api/library/${userId}`);

                const filteredBooks = response.data.library.filter((book: any) => !book.isPost_trade).sort((a, b) => b.id - a.id);
                console.log('filteredBooks', filteredBooks);
                setBook(filteredBooks);
                
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

    return (
        <>
        <style>
            {`
            body {
                overflow: hidden;
            }
            `}
        </style>
            <div className='flex w-screen h-20 sm:h-24 bg-dark1 shadow-lg z-30 '>
                <div className="flex h-full w-auto items-center sm:ml-20 scale-75 sm:scale-100">

                    <div 
                    onClick={ statePage < 2 ?() => setStatePage(0):undefined}
                    className={statePage === 0 ?"flex items-center justify-center bg-orange-400 w-12 h-12 rounded-full duration-1000 cursor-pointer":statePage === 2 ? "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000":"flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 cursor-pointer"}>
                        <Icon icon="material-symbols:book-outline" width="30" height="30" className='text-white duration-500' />
                    </div>
                    {statePage === 0 && showExchangeInfo1 &&
                    <div className="flex items-center justify-center text-white text-lg ml-5 duration-500 absolute left-14 ">
                        เลือกหนังสือของคุณ</div>}
                    <Icon icon="icon-park-outline:right" width="40" height="40" className={statePage === 0 ?'text-white duration-500 ml-44':'text-white duration-500'}/>
                    <div 
                    onClick={ statePage === 0 && bookSelect !== null ? () => setStatePage(1): statePage === 2 ? undefined:undefined}
                    className={statePage === 0 ? "flex items-center justify-center bg-gray-200 w-12 h-12 rounded-full duration-1000 cursor-pointer"
                    :statePage === 1 ? "flex items-center justify-center bg-orange-400 w-12 h-12 rounded-full duration-1000 text-white cursor-pointer": "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 text-white"}>
                        <Icon icon="ion:document-text-outline" width="30" height="30" />
                    </div>
                    {statePage === 1 && showExchangeInfo2 &&
                    <div className="flex items-center justify-center text-white text-lg ml-5 duration-500 absolute left-32">
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
            {statePage === 0 && <PostBook1 setStatePage={setStatePage} setBookSelect={setBookSelect} bookSelect={bookSelect} 
            setLoadcompo={setLoadcompo} book={book} loading={loading}/>}
            {statePage === 1 && <PostBook2 setStatePage={setStatePage} bookSelect={bookSelect} book={book}/>}
            {statePage === 2 && <PostBook3 bookSelect={bookSelect} book={book}/>}
            


        </>
    )
}

export default PostBook