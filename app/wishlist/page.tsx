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


function WishList() {
    const [wishlist, setWishlist] = useState([{ book_id:'', img: ''}]);
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
    const booktest = [{
        book_id: "book1",
        img: "https://picsum.photos/200/300",
    }, {
        book_id: "book2",
        img: "https://picsum.photos/200/300",
    }, {
        book_id: "book3",
        img: "https://picsum.photos/200/300",
    }, {
        book_id: "book4",
        img: "https://picsum.photos/200/300",
    }, {
        book_id: "book5",
        img: "https://picsum.photos/200/300",
    }, {
        book_id: "book6",
        img: "https://picsum.photos/200/300",
    }, {
        book_id: "book7",
        img: "https://picsum.photos/200/300",
    }, {
        book_id: "book8",
        img: "https://picsum.photos/200/300",
    }, {
        book_id: "book9",
        img: "https://picsum.photos/200/300",
    }, {
        book_id: "book10",
        img: "https://picsum.photos/200/300",
    }]

    return (
        <>
        <style>
                {`body {
                    overflow-x: hidden;
                }`}
            </style>
            <Navbar backGroundOn={true}/>
            <TitleBar textTitle="หนังสือที่อยากแลก"/>
            <div
                style={{minHeight: "800px"}}
                className="flex justify-center h-auto w-sceen z-10 bg-none">
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
                        <div key={index} className={classBook}>
                            {item.book_id}
                            <Image
                                src={propFooter}
                                alt="Profile picture"
                                className='w-9 h-9 object-cover rounded-full cursor-pointer bg-white'
                            />
                        </div>
                    ))}

                </div>
                }
                
            </div>

            <Footer/>
        </>
    )
}

export default WishList