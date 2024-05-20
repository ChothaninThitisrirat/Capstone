'use client'

import {useState,useEffect} from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';     
import { useSession } from 'next-auth/react'
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import Loadable from 'next/dist/shared/lib/loadable.shared-runtime';


interface PostNewBookProp {
    setStateOpen: (style: boolean) => void;
    classAddBook: any;
    bookId: number;
    bookStatus: string;
}
interface BookInfoShow {
    bookinfo: {
        id: number;
        title: string; //
        description: string; //
        picture: string[]; //
        pickup: string; //
        address: string; //
        datetime: Date; //
    };
    count_review_book_agg: {
        book_id: number;//
    };
    avg_review_book_agg: {
        score: number | null;//
    };
    category: string[];
    user: {
        id: number; 
        username: string;
        profile_picture: string;
    };
    count_user_book: {
        user_id: number;//
    };
    avg_user_score: {
        score: number | null;//
    };
    count_user_review: {
        user_id: number;//
    };
    review_book: any[];
    otherbook: any[];
}
const Pending: React.FC<PostNewBookProp> = ({setStateOpen, classAddBook, bookId, bookStatus}) =>{
    const [bookInfo, setBookInfo] = useState<BookInfoShow>()

    const [bookSelectTrade, setBookSelectTrade] = useState<BookInfoShow>()

    const [loading, setLoading] = useState(true)
    const [pickOrSend, setPickOrSend] = useState(1)
    const [placeToPic, setPlaceToPic] = useState('')
    const [addressPost, setAddressPost] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            if (bookId) {
                try {
                    const response = await axios.get(`/api/book/${bookId}`);
                    console.log('response.data',response.data.bookinfo.isPost_trade);
                    const response2 = await axios.get(`/api/book/${bookId}`);
                    if (response.data.bookinfo.isPost_trade){
                        setBookInfo(response.data);
                        setBookSelectTrade(response.data)
                        setLoading(false)
                    }else{
                        setLoading(false)
                    }
                } catch (error) {
                        setLoading(false)
                    console.error('Error fetching address data:', error);
                }
            }
        };
        if(bookId){
            fetchData();
        }
        
    }, [bookId]);


    return (
    <>
        {loading ?<div className="flex justify-center h-screen mt-52">
                        <HashLoader
                            className="ml-1 duration-300 "
                            color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
                    </div>
        :
        <div
        style={classAddBook}
        className="fixed flex top-0 left-0 z-50 h-screen w-screen items-center justify-center">
            <div 
            style={{borderRadius: "30px"}}
            className="flex flex-col w-auto h-auto bg-white p-10 border border-gray-300 items-center justify-center relative px-20">
                <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 rounded-full bg-white w-9 h-9"></div>
                <Icon 
                onClick={() => setStateOpen(false)}
                icon="carbon:close-filled" width="45" height="45"
                className=' absolute top-0 right-0 translate-x-3 -translate-y-3 text-gray-300 cursor-pointer hover:text-red-500'/>
                <div className="text-5xl font-bold w-full flex items-center justify-center text-dark1 mt-10">
                    {bookStatus === 'pending' && 'Pending'}
                </div>



                <div
                className="flex justify-center h-auto w-sceen z-30 mt-16 gap-20">
                    <div className="flex flex-col z-30 w-80 items-center">
                        <div className="flex text-3xl font bold w-72 justify-center h-auto break-words mb-5">
                            {bookInfo?.bookinfo.title}
                        </div>
                        <div className="flex">
                            <img
                            src={bookInfo?.bookinfo.picture[0]}
                            alt="Profile picture"
                            className=' w-64 h-96 object-cover cursor-pointer '
                            />
                        </div>
                        
                        <div className="flex items-center gap-3 mx-auto mt-5">
                            <div className="flex ">Owner</div>
                            <div className="flex">
                                <img
                                src={bookInfo?.user.profile_picture}
                                alt="Profile picture"
                                className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300'
                                />
                            </div>
                            <div className="flex ">{bookInfo?.user.username}</div>
                        </div>

                        <div className="flex relative w-96 mt-10">
                            <div className="flex">
                                <Icon
                                    icon="mdi:address-marker-outline"
                                    width="40"
                                    height="40"
                                    className="absolute top-0 left-3"
                                />
                            </div>
                            <div className="flex ml-16 mt-2 text-lg w-80 break-word h-52 mr-10">
                                {pickOrSend === 1 ? placeToPic:bookInfo?.bookinfo.address}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col z-30 mt-28 gap-10">
                        <Icon icon="uil:exchange" width="100" height="100" 
                        className='mx-auto'/>
                        {pickOrSend === 1
                        ?<div className="flex flex-col w-28 h-32 shadow-xl rounded-2xl bg-white relative">
                            <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-10 text-white">นัดรับ</div>
                            <Icon icon="tdesign:undertake-delivery" width="50" height="50" 
                            className='ml-2 mt-1'/>
                            <Icon icon="mdi:hand-extended-outline" width="50" height="50"
                            className='scale-x-[-1] absolute top-16 right-2' />
                        </div>
                        :<div className="flex flex-col w-28 h-32 shadow-xl rounded-2xl bg-white items-center relative">
                            <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-10 text-white">จัดส่ง</div>
                            <Icon icon="iconoir:delivery-truck" width="70" height="70" />
                            <Icon icon="fluent:checkmark-12-filled" width="20" height="20" 
                            className=' absolute top-16 left-10'/>
                        </div>}
                    </div>

                    <div className="flex flex-col z-30 w-80 items-center">
                    <div className="flex text-3xl font bold w-72 justify-center h-auto break-words mb-5">
                            {bookSelectTrade?.bookinfo.title}
                        </div>
                        <div className="flex">
                            <img
                            src={bookSelectTrade?.bookinfo.picture[0]}
                            alt="Profile picture"
                            className=' w-64 h-96 object-cover cursor-pointer '
                            />
                        </div>
                        
                        <div className="flex items-center gap-3 mx-auto mt-5">
                            <div className="flex ">Owner</div>
                            <div className="flex">
                                <img
                                src={bookSelectTrade?.user.profile_picture}
                                alt="Profile picture"
                                className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300'
                                />
                            </div>
                            <div className="flex ">{bookSelectTrade?.user.username}</div>
                        </div>

                        <div className="flex relative w-96 mt-10">
                            <div className="flex">
                                <Icon
                                    icon="mdi:address-marker-outline"
                                    width="40"
                                    height="40"
                                    className="absolute top-0 left-3"
                                />
                            </div>
                            <div className="flex ml-16 mt-2 text-lg w-80 break-word h-52 mr-10">{pickOrSend === 1 ? placeToPic:addressPost}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>}
    </>
    )
}

export default Pending