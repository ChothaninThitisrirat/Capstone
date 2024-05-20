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
                    ? <div className="text-4xl font-bold text-gray-500 mt-24">ยังไม่มีหนังสือที่อยากแลก</div>
                    :<div
                    className="flex w-full h-auto p-10 flex-wrap gap-20 mb-10 mt-5 library-container">
                    {wishlist.map((item, index) => (
                            <div
                            onClick={()=>handleToBookInfo(item.id)} // ต้องส่งค่าไปหน้า BookInfo
                            key={index} 
                            className='flex items-center justify-center rounded-sm border w-64 h-96 cursor-pointer shadow-sm hover:scale-105 duration-300 relative'>
                                <div className="flex flex-col absolute bottom-0 translate-y-12 text-base w-full">
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