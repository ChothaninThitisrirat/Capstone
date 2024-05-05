'use client'

import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";
import Navbar from '@/Components/Navbar';
import TitleBar from '@/Components/TitleBar';
import Footer from '@/Components/Footer';
import PostNewBook from '@/Components/PostNewBook';
import React from 'react'
import propFooter from '../../public/images/propFooter.png';
import Image from 'next/image';

function Library() {
    const classBook = "flex items-center justify-center rounded-sm border w-64 h-96 cursor-pointer"
    const [stateAddBook, setStateAddBook] = useState(false)
    const [classAddBookbg, setClassAddBookbg] = useState('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl visible')
    const [classAddBook, setClassAddBook] = useState({
        transform:'translateY(100%)',
        visibility: "hidden",
        transitionDuration: '0.3s'
    })

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


    useEffect(() => {
        if (stateAddBook) {
            setClassAddBookbg('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl visible')
            setClassAddBook({
                transform:'translateY(0%)',
                visibility: "visible",
                transitionDuration: '0.3s'
            })
        } else {
            setClassAddBookbg('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl invisible')
            setClassAddBook({
                transform:'translateY(100%)',
                visibility: "hidden",
                transitionDuration: '0.3s'
            })
        }   
    }, [stateAddBook])
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
            <Navbar />
            <TitleBar textTitle='คลังหนังสือของฉัน'/>
            <div
            style={{minHeight: "800px"}}
            className="flex justify-center h-auto w-sceen z-10 bg-none">
                <div
                className="flex w-full h-auto p-10 flex-wrap gap-20 mb-10 mt-5 library-container">
                    <div 
                    onClick={() => setStateAddBook(true)}
                    className="flex items-center justify-center rounded-sm border w-64 h-96 bg-slate-200 cursor-pointer hover:bg-slate-300">
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
            <div className={classAddBookbg}></div>
            <PostNewBook setStateAddBook={setStateAddBook} classAddBook={classAddBook}/>
                
            

            
        </>
        
    )
}

export default Library