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

}

const TradeProcess3: React.FC<TradeProcess3Props> = ({ bookId, setStateProcess, setStatusAddress, addressPost, setAddressPost, placeToPic, setPlaceToPic, pickOrSend }) => {
  return (<>
        <style>
                    {`
                    body {
                        overflow: hidden;
                    }
                    `}
            </style>




            <div
            style={{minHeight: "800px",marginLeft:'250px'}}
            className="flex justify-center h-auto w-sceen z-30 mt-28 gap-10">
                <div className="flex flex-col z-30">
                    <div className="flex text-3xl font-bold mx-auto mb-5">Bookname1</div>
                    <div className="flex w-full">
                        <Image
                        src={bgExchangebook}
                        alt="Profile picture"
                        className=' mx-auto w-64 h-96 object-cover cursor-pointer bg-dark3 rounded-sm shadow-sm duration-300'
                        />
                    </div>
                    <div className="flex items-center gap-3 mx-auto mt-5">
                        <div className="flex">Owner</div>
                        <div className="flex">
                            <Image
                            src={bgExchangebook}
                            alt="Profile picture"
                            className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300'
                            />
                        </div>
                        <div className="flex">Username</div>
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
                        <div className="flex ml-16 mt-2 text-lg w-80 break-word h-52">{pickOrSend === 1 ? placeToPic:addressPost}</div>
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
                <div className="flex flex-col z-30">
                    <div className="flex text-3xl font-bold mx-auto mb-5">Bookname2</div>
                    <div className="flex w-full">
                        <Image
                        src={bgExchangebook}
                        alt="Profile picture"
                        className=' mx-auto w-64 h-96 object-cover cursor-pointer bg-dark3 rounded-sm shadow-sm duration-300'
                        />
                    </div>
                    <div className="flex items-center gap-3 mx-auto mt-5">
                        <div className="flex">Owner</div>
                        <div className="flex">
                            <Image
                            src={bgExchangebook}
                            alt="Profile picture"
                            className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300'
                            />
                        </div>
                        <div className="flex">Username</div>
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
                        <div className="flex ml-16 mt-2 text-lg w-80 break-word h-52">{pickOrSend === 1 ? placeToPic:addressPost}</div>
                    </div>
                </div>
            </div>








            <div className='fixed bottom-0 left-0 w-screen h-24 flex justify-between z-30'>
                    <button 
                    onClick={() => setStateProcess(1)}
                    className='w-32 h-10 border-2 border-white text-white rounded-full ml-20 mt-2 flex pl-1 items-center gap-2 z-50'>
                        <Icon icon="icons8:left-round" width="30" height="30" />
                            ย้อนกลับ
                    </button>
                    <button onClick={() =>( placeToPic || addressPost ?setStateProcess(3):null)} 
                    className='w-44 h-10 bg-dark1 text-white rounded-full mr-16 mt-2 flex justify-center items-center gap-2'>
                        ยืนยันการส่งคำขอ<Icon icon="carbon:checkmark-outline" width="30" height="30" />
                    </button>
            </div>
        </>
    )
}

export default TradeProcess3