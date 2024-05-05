'use client'

import { Icon } from '@iconify/react';
import { useState } from "react";
import Navbar from '@/Components/Navbar';
import TitleBar from '@/Components/TitleBar';
import Footer from '@/Components/Footer';
import PostNewBook from '@/Components/PostNewBook';
import React from 'react'
import propFooter from '../../public/images/propFooter.png';
import Image from 'next/image';

function Libraly() {
    const classBook = "flex items-center justify-center rounded-sm border w-64 h-96 cursor-pointer"
    const [book, setBook] = useState([]);
    const booktest = [{
        id: "book1",
        img: "https://picsum.photos/200/300",
    }, {
        id: "book2",
        img: "https://picsum.photos/200/300",
    }, {
        id: "book3",
        img: "https://picsum.photos/200/300",
    }, {
        id: "book4",
        img: "https://picsum.photos/200/300",
    }, {
        id: "book5",
        img: "https://picsum.photos/200/300",
    }, {
        id: "book6",
        img: "https://picsum.photos/200/300",
    }, {
        id: "book7",
        img: "https://picsum.photos/200/300",
    }, {
        id: "book8",
        img: "https://picsum.photos/200/300",
    }, {
        id: "book9",
        img: "https://picsum.photos/200/300",
    }, {
        id: "book10",
        img: "https://picsum.photos/200/300",
    }]

    return (<>
        <style>
            {`
            body {
                overflow-x: hidden;
            }
            `}
        </style>
            <Navbar />
            <TitleBar textTitle='คลังหนังสือของฉัน'/>
            <div
            style={{minHeight: "800px"}}
            className="flex justify-center h-auto w-sceen z-10 bg-none">
                <div
                className="flex w-full h-auto p-10 flex-wrap gap-20 mb-10 mt-5 libraly-container">
                    <div className="flex items-center justify-center rounded-sm border w-64 h-96 bg-slate-200 cursor-pointer hover:bg-slate-300">
                        <Icon icon="ic:baseline-plus" width="50" height="50"
                        className='text-gray-500'/>
                    </div>

                    {booktest.map((item, index) => (
                        <div key={index} className={classBook}>
                            {item.id}
                            <Image
                            src={propFooter}
                            alt="Profile picture"
                            className='w-9 h-9 object-cover rounded-full cursor-pointer bg-white'
                            />
                        </div>
                    ))}


                </div>
            </div>
            <Footer/>
{/* 
            <PostNewBook/> */}

            
        </>
        
    )
}

export default Libraly