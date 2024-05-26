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
import HashLoader from "react-spinners/HashLoader";
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
    setIdTrade: (state: number) => void;

}

const TradeProcess3: React.FC<TradeProcess3Props> = ({ bookId, setStateProcess, setStatusAddress, addressPost, setAddressPost, placeToPic, setPlaceToPic, pickOrSend, bookInfo, bookSelect, setIdTrade }) => {
    
    const [ bookSelectTrade, setBookSelectTrade ] = useState<any>(null)
    const [loading, setLoading] = useState(false)

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
    

    const handleRequestTrade = async () => {
        setLoading(true)
        if( placeToPic || addressPost ){
            try {
                const response = await axios.post(`/api/trade`, {
                    book_id: bookId,
                    req_book_id: bookSelect,
                    owner_id: bookInfo.user.id,
                    req_user_id: bookSelectTrade.user.id,
                    pickup_req: pickOrSend === 1 ? placeToPic : null,
                    req_address: pickOrSend === 2 ? addressPost : null
                });
                console.log('response.data.message',response.data.trade.id);
                setIdTrade(response.data.trade.id)
                setTimeout(() => {
                    setLoading(false)
                    setStateProcess(3)
                },500)
            } catch (error) {
                alert('คุณได้ส่งคำขอแล้ว')
                console.error('Error fetching address data:', error);
            }
        }
        
    }


    return (<>


            <div
            style={{minHeight: "800px"}}
            className="flex sm:justify-center h-screen sm:h-full w-full z-30 sm:mt-28 flex-col items-center sm:items-start sm:flex-row overflow-y-auto sm:overflow-hidden close-scrollbar pb-[600px]">
                <div className="flex flex-col sm:flex-row w-full h-screen sm:h-full sm:justify-center sm:items-start items-center z-10 sm:gap-20 ">        
                    <div className="flex flex-col z-30 w-80 items-center ">
                        <div className="flex text-3xl font bold w-72 justify-center h-auto break-words mb-5">
                            {bookInfo.bookinfo.title}
                        </div>
                        <div className="flex">
                            <img
                            src={bookInfo.bookinfo.picture[0]}
                            alt="Profile picture"
                            className='w-40 h-60 sm:w-64 sm:h-96 object-cover cursor-pointer '
                            />
                        </div>
                        
                        <div className="flex items-center gap-3 mx-auto mt-5">
                            <div className="flex ">Owner</div>
                            <div className="flex">
                                <img
                                src={bookInfo.user.profile_picture}
                                alt="Profile picture"
                                className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300'
                                />
                            </div>
                            <div className="flex ">{bookInfo.user.username}</div>
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
                            <div className="flex ml-16 mt-2 text-lg w-80 break-word h-24 sm:h-52 mr-10">
                                {pickOrSend === 1 ? placeToPic:bookInfo.bookinfo.address}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col z-30 sm:mt-28 sm:gap-10 scale-75 sm:scale-100">
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
                            className='w-40 h-60 sm:w-64 sm:h-96 object-cover cursor-pointer '
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
                            <div className="flex ml-16 mt-2 text-lg w-80 break-word h-24 sm:h-52 mr-10">{pickOrSend === 1 ? placeToPic:addressPost}</div>
                        </div>
                    </div>
                </div>
            </div>








            <div className='fixed bottom-0 left-0 w-screen h-24 flex justify-between z-30'>
                    <button 
                    onClick={() => setStateProcess(1)}
                    className='w-32 h-10 border-2 border-gray-500 sm:border-white text-gray-500 sm:text-white rounded-full ml-3 sm:ml-20 mt-2 flex pl-1 items-center gap-2 z-50'>
                        <Icon icon="icons8:left-round" width="30" height="30" />
                            ย้อนกลับ
                    </button>
                    <button onClick={handleRequestTrade} 
                    className='w-44 h-10 bg-dark1 text-white rounded-full mr-3 sm:mr-16 mt-2 flex justify-center items-center gap-2'>
                        ยืนยันการส่งคำขอ
                        {loading
                            ? <HashLoader
                            className="ml-1 mr-2"
                            color='#fff' loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader"/>
                            :<Icon icon="carbon:checkmark-outline" width="30" height="30" />}
                    </button>
            </div>
        </>
    )
}

export default TradeProcess3