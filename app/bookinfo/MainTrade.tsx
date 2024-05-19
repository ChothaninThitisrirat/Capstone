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

interface MainTradeProps {
    bookId:string;
    setTrade: (state: boolean) => void;
}

const MainTrade: React.FC<MainTradeProps> = ({ bookId, setTrade }) => {
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
    const [bookSelect, setBookSelect] = useState<string>('');
    

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

        console.log( 'stateProcess',stateProcess,'bookSelect', bookSelect,addressPost,placeToPic)
        
    }, [stateProcess,bookSelect]);


    return (
        <>
        <style>
            {`
            body {
                overflow: hidden;
            }
            `}
        </style>

        <Image
        src={bgExchangebook}
        alt="picture"
        className='fixed z-10 opacity-30 w-screen h-screen object-cover left-0'
        />
        <div 
        style={ stateProcess < 2 ?{width:'450px'}:{width:'250px'}}
        className="fixed left-0 top-0 h-screen bg-dark1 z-20 duration-500"></div>

        {statusAddress && <AddAddress setStatusAddress={setStatusAddress}/>}


        <div 
        style={{paddingLeft:'500px'}}
        className='flex w-auto h-24 z-30 pt-5'>
            <div className="flex h-full w-auto items-center ml-20 z-30">

                {/* nav 1 */}
                <div 
                onClick={ stateProcess < 3 ?() => setStateProcess(0):undefined}
                className={stateProcess === 0 ?"flex items-center justify-center bg-orange-400 w-12 h-12 rounded-full duration-1000 cursor-pointer"
                :stateProcess === 3 ? "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000":"flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 cursor-pointer"}>
                    <Icon icon="material-symbols:book-outline" width="30" height="30" className='text-white duration-500' />
                </div>
                {stateProcess === 0 && showExchangeInfo1 &&
                <div 
                style={{left:'625px'}}
                className="flex items-center justify-center text-lg ml-5 duration-500 absolute">
                    เลือกหนังสือของคุณ</div>}
                <Icon icon="icon-park-outline:right" width="40" height="40" className={stateProcess === 0 ?' duration-500 ml-44':' duration-500'}/>

                {/* nav 2 */}
                <div 
                onClick={ stateProcess === 0 && bookSelect.length !== 0 ? () => setStateProcess(1): stateProcess === 2 && (addressPost !== '' || placeToPic !== '') ? () => setStateProcess(1):undefined}
                className={stateProcess === 0 ? "flex items-center justify-center bg-gray-200 w-12 h-12 rounded-full duration-1000 cursor-pointer"
                :stateProcess === 1 ? "flex items-center justify-center bg-orange-400 w-12 h-12 rounded-full duration-1000 text-white cursor-pointer": "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 text-white"}>
                    <Icon icon="carbon:delivery-parcel" width="35" height="35" />
                </div>

                {stateProcess === 1 && showExchangeInfo2 &&
                <div 
                style={{left:'710px'}}
                className="flex items-center justify-center text-lg ml-5 duration-500 absolute">
                    วิธีการแลกเปลี่ยน</div>}
                <Icon icon="icon-park-outline:right" width="40" height="40" className={stateProcess === 1?' duration-500 ml-40':''}/>


                {/* nav 3 */}
                <div 
                onClick={ stateProcess === 0 && bookSelect.length !== 0 && (addressPost !== '' || placeToPic !== '')? () => setStateProcess(2): stateProcess === 1 && (addressPost !== '' || placeToPic !== '') ? () => setStateProcess(2):undefined}
                className={stateProcess <= 1 ? "flex items-center justify-center bg-gray-200 w-12 h-12 rounded-full duration-1000 cursor-pointer"
                :stateProcess === 2 ? "flex items-center justify-center bg-orange-400 w-12 h-12 rounded-full duration-1000 text-white cursor-pointer": "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 text-white"}>
                    <Icon icon="ion:document-text-outline" width="30" height="30" />
                </div>
                {stateProcess === 2 && showExchangeInfo3 &&
                <div 
                style={{left:'800px'}}
                className="flex items-center justify-center text-lg ml-5 duration-500 absolute">
                    ตรวจสอบความถูกต้อง</div>}
                <Icon icon="icon-park-outline:right" width="40" height="40" className={stateProcess === 2?' duration-500 ml-44':''}/>



                <div 
                className={stateProcess < 3 ? "flex items-center justify-center bg-gray-200 w-12 h-12 rounded-full duration-1000" : "flex items-center justify-center bg-green-400 w-12 h-12 rounded-full duration-1000 text-white"}>
                    <Icon icon="carbon:checkmark-outline" width="30" height="30" />
                </div>
                {stateProcess === 3 &&<div className="flex items-center justify-center text-lg ml-5 duration-500">ดำเนินการสำเร็จ</div>}
            </div>
        </div>


        {stateProcess === 0 && <TradeProcess1  setTrade={setTrade} setStateProcess={setStateProcess} bookId={bookId} bookSelect={bookSelect} setBookSelect={setBookSelect}/>}
        {stateProcess === 1 && <TradeProcess2  setTrade={setTrade} setStateProcess={setStateProcess} 
                                                bookId={bookId} setStatusAddress={setStatusAddress} 
                                                addressPost={addressPost} setAddressPost={setAddressPost} 
                                                placeToPic={placeToPic} setPlaceToPic={setPlaceToPic} 
                                                pickOrSend={pickOrSend} setPickOrSend={setPickOrSend} 
                                                pickFormOpen={pickFormOpen} setPickFormOpen={setPickFormOpen}
                                                sendFormOpen={sendFormOpen} setSendFormOpen={setSendFormOpen}
                                                cssSendPickNext={cssSendPickNext} setCssSendPickNext={setCssSendPickNext}/>}
        {stateProcess === 2 && <TradeProcess3  setTrade={setTrade} setStateProcess={setStateProcess} 
                                                bookId={bookId} setStatusAddress={setStatusAddress} 
                                                addressPost={addressPost} setAddressPost={setAddressPost} 
                                                placeToPic={placeToPic} setPlaceToPic={setPlaceToPic} pickOrSend={pickOrSend}/>}
        {stateProcess === 3 && <TradeProcess4  setTrade={setTrade} setStateProcess={setStateProcess}
                                                bookId={bookId} setStatusAddress={setStatusAddress} 
                                                addressPost={addressPost} setAddressPost={setAddressPost} 
                                                placeToPic={placeToPic} setPlaceToPic={setPlaceToPic} pickOrSend={pickOrSend}/>}

        

        

        
        </>
    )
}

export default MainTrade