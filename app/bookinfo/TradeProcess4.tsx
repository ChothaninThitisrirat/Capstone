'use client'

import React,{ useState, useEffect, use }  from 'react'
import { Icon } from "@iconify/react";
import Image from 'next/image';
import PostNewBook from '@/Components/PostNewBook';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import bgExchangebook from '../../public/images/bgExchangebook.png';
import { setTimeout } from 'timers';
import AddAddress from '@/Components/AddAddress';
import axios from 'axios';

interface TradeProcess3Props {
    bookId:string
    setStateProcess: (state: number) => void;
    setTrade: (state: boolean) => void;
    setStatusAddress: (state: boolean) => void;
    setAddressPost: (state: string) => void;
    addressPost:string;
    placeToPic:string;
    setPlaceToPic: (state: string) => void;
    pickOrSend: number;
    bookInfo: any;
    bookSelect: any;
    idTrade: number;

}

const TradeProcess3: React.FC<TradeProcess3Props> = ({ bookId, setStateProcess, setStatusAddress, addressPost, setAddressPost, placeToPic, setPlaceToPic, pickOrSend, bookInfo, bookSelect, idTrade }) => {
    
    const router = useRouter()
    

    const handleStatusTrade = () => {

        return () => {
            router.push('/statustrade')
        }
    }
    const handleHome = () => {
        return () => {
            window.location.reload()
        }
    }

    const [ bookSelectTrade, setBookSelectTrade ] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (bookSelect) {
                try {
                    
                    const response = await axios.get(`/api/book/${bookSelect}`);
                    console.log('response.data.message',response.data.message);
                    
                    if (response.data.book !== null){
                        setBookSelectTrade(response.data);
                    }else{
                    }
                } catch (error) {
                    console.error('Error fetching address data:', error);
                }
            }
        };
        if(bookSelect){
            fetchData();
        }
    }, [bookSelect]);
    return (<>
        <style>
                    {`
                    body {
                        overflow: hidden;
                    }
                    `}
            </style>




            <div
            style={{minHeight: "800px"}}
            className="flex flex-col items-center h-auto w-sceen z-30 scale-75 sm:scale-100 -translate-y-32 sm:translate-y-0">
                <Icon icon="carbon:checkmark-outline" width="70" height="70" className='text-green-400 z-30 mt-5'/>
                <div className="flex z-30  mt-2 text-3xl">ดำเนินการส่งคำขอเสร็จสิ้น</div>
                <div className="flex z-30  mt-3 text-xl">B-Trade ID #{idTrade}</div>
                <div className="flex gap-5 sm:gap-20 mt-8">
                    <div className="flex flex-col z-30">
                        <div className="flex text-3xl font-bold mx-auto mb-5">{bookInfo.bookinfo.title}</div>
                        <div className="flex w-full">
                            <img
                            src={bookInfo.bookinfo.picture[0]}
                            alt="Picture"
                            className=' mx-auto w-56 h-80 object-cover bg-dark3 rounded-sm shadow-sm duration-300 shrink-0'
                            />
                        </div>
                        <div className="flex items-center gap-3 mx-auto mt-5">
                            <div className="flex">Owner</div>
                            <div className="flex">
                                <img
                                src={bookInfo.user.profile_picture}
                                alt="Profile picture"
                                className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300 shrink-0'
                                />
                            </div>
                            <div className="flex">{bookInfo.user.username}</div>
                        </div>
                    </div>

                    <div className="flex flex-col z-30 mt-40 gap-10">
                        <Icon icon="fontisto:arrow-h" width="100" height="100" 
                        className='mx-auto text-dark1'/>
                    </div>
                    <div className="flex flex-col z-30">
                        <div className="flex text-3xl font-bold mx-auto mb-5">{bookSelectTrade?.bookinfo.title}</div>
                        <div className="flex w-full">
                            <img
                            src={bookSelectTrade?.bookinfo.picture[0]}
                            alt="Profile picture"
                            className=' mx-auto w-56 h-80 object-cover bg-dark3 rounded-sm shadow-sm duration-300 shrink-0'
                            />
                        </div>
                        <div className="flex items-center gap-3 mx-auto mt-5">
                            <div className="flex">Owner</div>
                            <div className="flex">
                                <img
                                src={bookSelectTrade?.user.profile_picture}
                                alt="Profile picture"
                                className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300 shrink-0'
                                />
                            </div>
                            <div className="flex">{bookSelectTrade?.user.username}</div>
                        </div>
                    </div>
                </div>
                <div 
                onClick={handleStatusTrade()}
                className="flex rounded-full border-2 border-dark1 w-56 h-10 justify-center items-center text-dark1 text-lg cursor-pointer z-30 mt-5">สถานะการแลกเปลี่ยน</div>
                <div 
                onClick={handleHome()}
                className="flex rounded-full w-48 h-10 justify-center items-center text-white bg-dark2 text-lg cursor-pointer z-30 mt-3">กลับสู่หน้าหลัก</div>
            </div>








        </>
    )
}

export default TradeProcess3