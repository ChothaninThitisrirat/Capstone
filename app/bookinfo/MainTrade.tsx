'use client'

import React,{ useState, useEffect, useRef }  from 'react'
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Image from 'next/image';
import Link from 'next/link';
import BookInfo from './BookInfo';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SlideBookMini from '@/Components/SlideBookMini';
import TradeProcess1 from './TradeProcess1'
import TradeProcess2 from './TradeProcess2'
import TradeProcess3 from './TradeProcess3'
import TradeProcess4 from './TradeProcess4'
import bgExchangebook from '../../public/images/bgExchangebook.png';
import AddAddress from '@/Components/AddAddress';
import { useSession } from 'next-auth/react';

interface MainTradeProps {
    bookId:string;
    setTrade: (state: boolean) => void;
    bookInfo: any
}


const MainTrade: React.FC<MainTradeProps> = ({ bookId, setTrade, bookInfo }) => {
    const { data: session, status } = useSession()
    const [stateProcess, setStateProcess] = useState(0)
    const [showExchangeInfo1, setShowExchangeInfo1] = useState(false);
    const [showExchangeInfo2, setShowExchangeInfo2] = useState(false);
    const [showExchangeInfo3, showShowExchangeInfo3] = useState(false);
    const [addressPost , setAddressPost] = useState('') //data
    const [placeToPic, setPlaceToPic] = useState('') //data
    const [ pickOrSend, setPickOrSend ] = useState(0) //1 = pick, 2 = send
    const [ pickFormOpen, setPickFormOpen ] = useState(false) //form pick
    const [ sendFormOpen, setSendFormOpen ] = useState(false) //form send
    const [ cssSendPickNext, setCssSendPickNext ] = useState(false); //css fixed send/pick
    const [statusAddress, setStatusAddress] = useState(false);
    const [idTrade, setIdTrade] = useState<number>(0);
    const [bookSelect, setBookSelect] = useState<number[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])
    
    useEffect(() => {
        if(stateProcess === 0 ){
            showShowExchangeInfo3(false);
            setShowExchangeInfo2(false);
            setTimeout(() => {
                setShowExchangeInfo1(true);
            }, 300);
        }else if(stateProcess === 1){
            showShowExchangeInfo3(false);
            setShowExchangeInfo1(false);
            setTimeout(() => {
                setShowExchangeInfo2(true);
            }, 300);
        }else if(stateProcess === 2 ){
            setShowExchangeInfo1(false);
            setShowExchangeInfo2(false);
            setTimeout(() => {
                showShowExchangeInfo3(true);
            }, 300);
        }else{
            setShowExchangeInfo1(false);
            setShowExchangeInfo2(false);
        }
        
    }, [stateProcess]);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);







    return (
        <>
        <style>
            {`
            body {
                overflow-y: hidden;
            }
            `}
        </style>

        <Image
        src={bgExchangebook}
        alt="picture"
        className='fixed z-10 opacity-30 w-screen h-screen object-cover left-0'
        />
        <div className="flex flex-col sm:flex-row">
            <div 
            className={`left-0 top-0 py-10 sm:py-0 w-full sm:h-screen bg-dark1 z-20 duration-500 flex sm:flex-col justify-center items-center ${stateProcess < 2 ? 'sm:w-[450px]' : 'sm:w-[250px]'}`}>
                { stateProcess < 2 && 
                <>
                    <div className="flex">
                        <img
                        src={bookInfo.bookinfo.picture[0]}
                        alt="Profile picture"
                        className=' w-32 h-44 sm:w-64 sm:h-96 object-cover cursor-pointer bg-white rou'
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex text-xl sm:text-3xl font-bold justify-center text-white w-auto word-break items-center h-auto mt-5">
                            {bookInfo.bookinfo.title}
                        </div>
                        <div className="flex items-center gap-3 sm:mx-auto mt-5 mx-3">
                            <div className="flex text-white">Owner</div>
                            <div className="flex">
                                <img
                                src={bookInfo.user.profile_picture}
                                alt="Profile picture"
                                className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300 '
                                />
                            </div>
                            <div className="flex text-white ">{bookInfo.user.username}</div>
                        </div>
                    </div>
                </>}
            </div>

            {statusAddress && <AddAddress setStatusAddress={setStatusAddress}/>}


            <div
            className='flex w-full h-auto z-30 sm:mt-5 sm:pt-5 flex-col'>
                <div className="flex h-24 w-auto items-center sm:ml-20 z-30 relative scale-75 sm:scale-100 -translate-x-5 sm:translate-x-0">

                    {/* nav 1 */}
                    <div 
                    onClick={ stateProcess < 3 ?() => setStateProcess(0):undefined}
                    className={stateProcess === 0 ?"flex items-center justify-center bg-orange-400 w-12 h-12 rounded-full duration-1000 cursor-pointer shrink-0"
                    :stateProcess === 3 ? "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000":"flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 cursor-pointer shrink-0"}>
                        <Icon icon="material-symbols:book-outline" width="30" height="30" className='text-white duration-500' />
                    </div>
                    {stateProcess === 0 && showExchangeInfo1 &&
                    <div 
                    className="flex items-center justify-center text-lg ml-5 duration-500 absolute left-12">
                        เลือกหนังสือของคุณ</div>}
                    <Icon icon="icon-park-outline:right" width="40" height="40" className={stateProcess === 0 ?' duration-500 ml-44 shrink-0':' duration-500  shrink-0'}/>

                    {/* nav 2 */}
                    <div 
                    onClick={ stateProcess === 0 && bookSelect.length !== 0 ? () => setStateProcess(1): stateProcess === 2 && (addressPost !== '' || placeToPic !== '') ? () => setStateProcess(1):undefined}
                    className={stateProcess === 0 ? "flex items-center justify-center bg-gray-200 w-12 h-12 rounded-full duration-1000 cursor-pointer shrink-0"
                    :stateProcess === 1 ? "flex items-center justify-center bg-orange-400 w-12 h-12 rounded-full duration-1000 text-white cursor-pointer shrink-0": "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 text-white shrink-0"}>
                        <Icon icon="carbon:delivery-parcel" width="35" height="35" />
                    </div>

                    {stateProcess === 1 && showExchangeInfo2 &&
                    <div 
                    className="flex items-center justify-center text-lg ml-5 duration-500 absolute left-36">
                        วิธีการแลกเปลี่ยน</div>}
                    <Icon icon="icon-park-outline:right" width="40" height="40" className={stateProcess === 1?' duration-500 ml-40  shrink-0':'shrink-0'}/>


                    {/* nav 3 */}
                    <div 
                    onClick={ stateProcess === 0 && bookSelect.length !== 0 && (addressPost !== '' || placeToPic !== '')? () => setStateProcess(2): stateProcess === 1 && (addressPost !== '' || placeToPic !== '') ? () => setStateProcess(2):undefined}
                    className={stateProcess <= 1 ? "flex items-center justify-center bg-gray-200 w-12 h-12 rounded-full duration-1000 cursor-pointe shrink-0"
                    :stateProcess === 2 ? "flex items-center justify-center bg-orange-400 w-12 h-12 rounded-full duration-1000 text-white cursor-pointer shrink-0": "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 text-white shrink-0"}>
                        <Icon icon="ion:document-text-outline" width="30" height="30" />
                    </div>
                    {stateProcess === 2 && showExchangeInfo3 &&
                    <div 
                    className="flex items-center justify-center text-lg ml-5 duration-500 absolute left-56">
                        ตรวจสอบความถูกต้อง</div>}
                    <Icon icon="icon-park-outline:right" width="40" height="40" className={stateProcess === 2?' duration-500 ml-44 shrink-0':' shrink-0'}/>



                    <div 
                    className={stateProcess < 3 ? "flex items-center justify-center bg-gray-200 w-12 h-12 rounded-full duration-1000 shrink-0" : "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 text-white shrink-0"}>
                        <Icon icon="carbon:checkmark-outline" width="30" height="30" />
                    </div>
                    {stateProcess === 3 &&<div className="flex items-center justify-center text-lg ml-5 duration-500">ดำเนินการสำเร็จ</div>}
                </div>
            
       
                <div className="flex w-full justify-center">
                    {stateProcess === 0 && <TradeProcess1  setTrade={setTrade} setStateProcess={setStateProcess} 
                                                            bookId={bookId} bookSelect={bookSelect} 
                                                            setBookSelect={setBookSelect}/>}
                    {stateProcess === 1 && <TradeProcess2  setTrade={setTrade} setStateProcess={setStateProcess} 
                                                            bookId={bookId} setStatusAddress={setStatusAddress} 
                                                            addressPost={addressPost} setAddressPost={setAddressPost} 
                                                            placeToPic={placeToPic} setPlaceToPic={setPlaceToPic} 
                                                            pickOrSend={pickOrSend} setPickOrSend={setPickOrSend} 
                                                            pickFormOpen={pickFormOpen} setPickFormOpen={setPickFormOpen}
                                                            sendFormOpen={sendFormOpen} setSendFormOpen={setSendFormOpen}
                                                            cssSendPickNext={cssSendPickNext} setCssSendPickNext={setCssSendPickNext}
                                                            bookInfo={bookInfo}/>}
                    {stateProcess === 2 && <TradeProcess3  setTrade={setTrade} setStateProcess={setStateProcess} 
                                                            bookId={bookId} setStatusAddress={setStatusAddress} 
                                                            addressPost={addressPost} setAddressPost={setAddressPost} 
                                                            placeToPic={placeToPic} setPlaceToPic={setPlaceToPic} 
                                                            pickOrSend={pickOrSend} bookInfo={bookInfo}  bookSelect={bookSelect} 
                                                            idTrade={idTrade} setIdTrade={setIdTrade}/>}
                    {stateProcess === 3 && <TradeProcess4  setTrade={setTrade} setStateProcess={setStateProcess}
                                                            bookId={bookId} setStatusAddress={setStatusAddress} 
                                                            addressPost={addressPost} setAddressPost={setAddressPost} 
                                                            placeToPic={placeToPic} setPlaceToPic={setPlaceToPic} pickOrSend={pickOrSend}
                                                            bookInfo={bookInfo}  bookSelect={bookSelect} idTrade={idTrade}/>}
                </div>
            </div>
        </div>
        

        

        
        </>
    )
}

export default MainTrade