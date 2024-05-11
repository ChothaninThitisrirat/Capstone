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


interface PostBook1Props {
    setStatePage: (style: number) => void;
    setBookSelect: (style: string) => void;
    bookSelect: string;
}

const PostBook1: React.FC<PostBook1Props> = ({setStatePage, setBookSelect, bookSelect}) =>{
    const classBook = "flex items-center justify-center rounded-sm border w-64 h-96 cursor-pointer shadow-sm duration-300 relative bg-dark3"
    const [stateAddBook, setStateAddBook] = useState(false)
    const [ loadcompo, setLoadcompo] = useState(false)
    const [classAddBookbg, setClassAddBookbg] = useState('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl hidden')
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

    const { data: session, status } = useSession()
    const userId: number | undefined = session?.user.id
    const router = useRouter();

    const handleCancel = () => {
        router.back();
    };

    const handlesetBookSelect = (itemId:string) => {
        if (bookSelect === itemId) {
            setBookSelect('');
            return;
        }else{
            setBookSelect(itemId);
        }
    };

    const handleChangeState = ()=>{
        if (bookSelect !== '') {
            setStatePage(1);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/library/${userId}`);
                console.log('response.data = ', response.data);
                
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);



    return (
        <>
            <div
            style={{minHeight: "800px"}}
            className="flex justify-center h-auto w-sceen z-10 bg-none">
                <div
                className="flex w-full h-screen p-10 flex-wrap gap-20 gap-y-14 mb-10 overflow-y-auto close-scrollbar z-10 library-container">
                    <div 
                    onClick={() => setStateAddBook(true)}
                    className="flex items-center justify-center rounded-sm border w-64 h-96 bg-slate-200 cursor-pointer shadow-sm hover:bg-slate-300  hover:scale-105 duration-300">
                        <Icon icon="ic:baseline-plus" width="50" height="50"
                        className='text-gray-500'/>
                    </div>

                    {booktest.map((item, index) => (
                        <div 
                        key={index} 
                        onClick={()=>handlesetBookSelect(item.id)}
                        className={bookSelect === item.id ? classBook+' '+' scale-105 border-4 border-dark2' : classBook}>
                            <div className=' absolute'>{item.id}</div>
                            
                            <Image
                            src={bgExchangebook}
                            alt="Profile picture"
                            className='w-64 h-96 object-cover cursor-pointer'
                            
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={classAddBookbg}></div>
            <PostNewBook setStateAddBook={setStateAddBook} classAddBook={classAddBook} setLoadcompo={setLoadcompo}/>
            <div className='fixed bottom-0 left-0 w-screen h-24 z-20 flex justify-between'>
                    <button onClick={handleCancel} className='w-20 h-10 border-2 border-red-500 rounded-full ml-20 mt-2 hover:bg-red-100'>ยกเลิก</button>
                    <button onClick={handleChangeState} 
                    className={bookSelect === '' 
                    ?'w-40 h-10 border-2 border-gray-500 text-gray-500 rounded-full mr-16 mt-2 flex justify-center items-center gap-2'
                    :'w-40 h-10 bg-dark1 text-white rounded-full mr-16 mt-2 flex justify-center items-center gap-2'}>
                        ดำเนินการต่อ<Icon icon="icons8:right-round" width="30" height="30" />
                    </button>
            </div>
        </>
    )
}

export default PostBook1