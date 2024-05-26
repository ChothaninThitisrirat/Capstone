'use client'

import React, { useState, useEffect } from "react";
import Navbar from '@/Components/Navbar'
import TitleBar from '@/Components/TitleBar'
import Footer from '@/Components/Footer'
import Image from 'next/image'
import axios from "axios";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import propFooter from '../../public/images/propFooter.png';
import HashLoader from "react-spinners/HashLoader";

interface Book {
    id: number;
    title: string;
    picture: string;
    status: string;
    isPost_trade: boolean;
}

function WishList() {
    const [wishlist, setWishlist] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession()

    const router = useRouter()
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    const userId: number | undefined =session?.user.id
    console.log('userId',userId);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`/api/wishlist/${userId}`);
            console.log(userId,'response.data.wishlist = ', response.data);
            if (response.data.wishlist !== undefined && response.data.wishlist.length > 0) {
                setWishlist(response.data.wishlist.reverse());
            } else {
                setWishlist([]);
            }
            setLoading(false);
        } catch (error) {
            console.log("error", error);
        }
        };
        if (userId !== undefined) {
            fetchData();
        }
        
    }, [userId]);

    const classBook = "flex items-center justify-center rounded-sm border w-64 h-96 cursor-pointer shadow-sm hover:scale-105 duration-300"

    const handleToBookInfo = (BookId: number | null | undefined) => {
        if (BookId !== null && BookId !== undefined) {

            router.push(`/bookinfo/${BookId.toString()}`)
        }
    }









    return (
        <>
        <style>
                {`body {
                    overflow-x: hidden;
                }`}
            </style>
            <Navbar backGroundOn={true} withTitle={true}/>
            <TitleBar textTitle="หนังสือที่อยากแลก"/>
            <div
                style={{minHeight: "800px"}}
                className="flex justify-center h-auto w-sceen z-10 bg-none pb-20 pt-50">
                {loading
                ?<div className="flex justify-center h-screen mt-52">
                    <HashLoader
                        className="ml-1 duration-300 "
                        color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
                </div>
                :wishlist.length === 0
                    ? <div className="flex justify-center items-center h-auto mt-40 mb-96 text-xl font-bold text-gray-400 sm:mt-40 sm:py96 sm:text-3xl">ยังไม่มีหนังสือที่อยากแลก</div>
                    :<div
                    className="flex w-full h-auto p-10 flex-wrap gap-5 justify-between mb-10 mt-5 max-w-[1700px] library-container sm:justify-start sm:w-auto sm:gap-20">
                    {wishlist.map((item, index) => (
                            <div
                            onClick={()=>handleToBookInfo(item.id)} // ต้องส่งค่าไปหน้า BookInfo
                            key={index} 
                            className='flex items-center justify-center rounded-sm border w-40 h-60 cursor-pointer shadow-sm hover:scale-105 duration-300 relative sm:w-64 sm:h-96'>
                                <div className="flex flex-col absolute bottom-0 translate-y-8 text-base w-full sm:translate-y-12">
                                    <div className="flex w-full justify-center">{item.title}</div>
                                </div>
                                <img
                                src={item.picture[0]}
                                alt="Profile picture"
                                className='w-full h-full object-cover cursor-pointer bg-white'
                                />
                            </div>
                        ))}
                </div>}
                
            </div>

            <Footer/>
        </>
    )
}

export default WishList