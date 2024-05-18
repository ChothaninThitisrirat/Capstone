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


interface TradeProcess2Props {
    bookId:string
    setStateProcess: (state: number) => void;
    setTrade: (state: boolean) => void;
    setStatusAddress: (state: boolean) => void;
    setAddressPost: (state: string) => void;
    addressPost:string;
    placeToPic:string;
    setPlaceToPic: (state: string) => void;
    pickOrSend:number;
    setPickOrSend: (state: number) => void;
    pickFormOpen: boolean;
    setPickFormOpen: (state: boolean) => void;
    sendFormOpen: boolean;
    setSendFormOpen: (state: boolean) => void;
    cssSendPickNext: boolean;
    setCssSendPickNext: (state: boolean) => void;

}

const TradeProcess: React.FC<TradeProcess2Props> = ({ 
    bookId, setStateProcess, setStatusAddress, 
    addressPost, setAddressPost, 
    placeToPic, setPlaceToPic, 
    pickOrSend, setPickOrSend,
    pickFormOpen, setPickFormOpen,
    sendFormOpen, setSendFormOpen,
    cssSendPickNext, setCssSendPickNext}) => {


    
    
    

    
    const [dropDownAddress, setDropDownAddress] = useState(false);
    
    const { data: session, status } = useSession()
    const userId: number | undefined = session?.user.id
    const router = useRouter();




    const handleGoBack=()=>{
        if (pickOrSend === 0){
            setStateProcess(0)
        }else{
            setCssSendPickNext(false)
            setDropDownAddress(false)
            setPlaceToPic('')
            setAddressPost('')
            setPickOrSend(0)
        }
    }

    const handlePick =()=>{
        setPickOrSend(1)
        setSendFormOpen(false)
        setTimeout(() => {
            setPickFormOpen(true)
        }, 1500);
        
    }

    const handleSend =()=>{
        setPickOrSend(2)
        setPickFormOpen(false)
        setTimeout(() => {
            setSendFormOpen(true)
        }, 1500);
        
    }


    useEffect(() => {
        if(pickOrSend === 0){
            setPickFormOpen(false)
            setSendFormOpen(false)
        }
    }, [pickOrSend]);


    const handleNextStep = () => {
        console.log('placeToPic',placeToPic,'cssSendPickNext',cssSendPickNext)
        if (placeToPic || addressPost ){
            setStateProcess(2)
            setCssSendPickNext(true)
        }
    }














return (
    <>
        <style>
                {`
                body {
                    overflow: hidden;
                }
                `}
        </style>




        <div
        style={{minHeight: "800px",marginLeft:'450px'}}
        className="flex justify-center h-auto w-sceen z-10 bg-none">
            <div className="flex flex-col w-full h-screen items-center close-scrollbar z-10 translate-y-52">
                <div className={pickOrSend === 0?"flex text-3xl mb-10"
                :"flex text-3xl mb-10 opacity-0 duration-300"}>กรุณาเลือกช่องทางการแลกเปลี่ยน</div>
                <div className={pickOrSend === 0?"flex scale-125 duration-1000 z-30":"flex duration-1000 z-0" }>

                    <div 
                    onClick={handlePick}
                    className= {pickOrSend === 0 ?"flex flex-col items-center h-40 cursor-pointer"
                                :(pickOrSend === 1 ?(cssSendPickNext ?"flex flex-col items-center h-40 cursor-pointer z-10 positionFixedpick"
                                    :"flex flex-col items-center h-40 pickUpSelectAnimation cursor-pointer z-10")
                                :(cssSendPickNext ?"flex flex-col items-center h-40 z-0 cursor-pointer positionFixedNonpick"
                                :"flex flex-col items-center h-40 pickUpNonSelectAnimation z-0 cursor-pointer"))}>
                        <div className="flex flex-col w-36 h-40 shadow-xl rounded-2xl bg-white relative cursor-pointer">
                            <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-12 text-white text-xl">นัดรับ</div>
                            <Icon icon="tdesign:undertake-delivery" width="65" height="65" 
                            className='ml-2 mt-2'/>
                            <Icon icon="mdi:hand-extended-outline" width="65" height="65"
                            className='scale-x-[-1] absolute top-20 right-2 mt-2' />
                        </div>
                    </div>
                    
                    <div className={pickOrSend === 0?"flex w-0.5 h-40 bg-gray-300 mx-5 duration-300":"flex w-0.5 h-40 bg-gray-300 mx-5 invisible"}></div>

                    <div 
                    onClick={handleSend}
                    className={pickOrSend === 0 ?"flex flex-col items-center h-40"
                                :(pickOrSend === 2 ?(cssSendPickNext ? "flex flex-col items-center h-40 z-30 positionFixedsend"
                                    :"flex flex-col items-center h-40 sendSelectAnimation z-30")
                                :(cssSendPickNext ? "flex flex-col items-center h-40  z-0 positionFixedNonsend"
                                :"flex flex-col items-center h-40 sendNonSelectAnimation z-0" ))}>
                        <div className="flex flex-col w-36 h-40 shadow-xl rounded-2xl bg-white relative cursor-pointer items-center">
                            <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-12 text-white text-xl">จัดส่ง</div>
                            <Icon icon="iconoir:delivery-truck" width="100" height="100" />
                            <Icon icon="fluent:checkmark-12-filled" width="30" height="30"
                            className=' absolute top-16 left-12 translate-y-4'/>
                        </div>
                    </div>
                </div>




                <div 
                style={{top:'-150px'}}
                className={pickFormOpen ?" relative w-9/12 duration-700 z-10 ":" relative w-9/12 invisible translate-y-10 duration-700 z-10"}>
                    <div className="flex items-center">
                        <div className="flex text-3xl font-bold">สถานที่นัดรับของ</div>
                        <div className="flex w-10 h-10 bg-black rounded-full ml-4"></div>
                        <div className="flex text-2xl ml-2 text-gray-500">Username</div>
                    </div>
                    <div className="flex mt-5 w-full">
                        <Icon
                            icon="mdi:address-marker-outline"
                            width="40"
                            height="40"
                            style={{ color:"#333" }}
                            className="mb-2"
                        />
                        <textarea 
                        className="flex text-lg w-full resize-none h-28 close-scrollbar p-2 ">
                            dawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdaddawdawdawdawdawddawdawdawdawdawdwdawdawwdad
                        </textarea>
                    </div>
                    <div className="flex text-3xl font-bold mt-10">สถานที่นัดรับของคุณ</div>
                    <div className="flex relative">
                        <Icon
                            icon="mdi:address-marker-outline"
                            width="40"
                            height="40"
                            style={{ color: placeToPic?"#333":"#A7A7A7" }}
                            className="absolute bottom-2 left-2"
                        />
                        <input 
                        value={placeToPic}
                        onChange={(e)=>setPlaceToPic(e.target.value)}
                        type="text" 
                        className='w-full border-b mt-8 border-gray-400 px-12 pl-16 text-lg pb-2'/>
                    </div>
                </div>


                <div 
                style={{top:'-500px'}}
                className={sendFormOpen ?" relative w-9/12 duration-700 ":" relative w-9/12 translate-y-10 invisible duration-700"}>
                <div className="flex text-3xl font-bold flex-col">กรุณาเลือกสถานที่จัดส่งของคุณ</div>
                    <div
                    style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}
                    className="flex flex-col w-10/12 bg-white h-40 mt-8 rounded-3xl mx-auto relative">
                        <div className="flex w-full h-16 bg-dark2 rounded-t-3xl text-white text-xl items-center px-10 ">
                            Address
                        </div>
                        <div  
                        onClick={() => setDropDownAddress(!dropDownAddress)}
                        className="flex h-full w-full justify-between items-center px-10 cursor-pointer">
                            <div 
                            className={addressPost !== '' ?"flex h-full w-full overflow-y-auto close-scrollbar text-xl items-center":"flex h-full w-full overflow-y-auto close-scrollbar text-xl items-center text-gray-400"}>
                                {addressPost !== '' ? addressPost : 'โปรดเลือกที่อยู่จัดส่ง'}
                            </div>
                            { dropDownAddress && <DropDownAddress setAddressPost={setAddressPost} dropDownAddress={dropDownAddress} setDropDownAddress={setDropDownAddress}/> }
                            <Icon 
                            className='text-gray-500'
                            icon="mingcute:down-line" width="50" height="50" />
                        </div>
                    </div>
                    <div 
                    style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}
                    onClick={()=>setStatusAddress(true)}
                    className="flex w-10/12 h-36 mt-8 rounded-3xl mx-auto shadow bg-dark2 text-white justify-center items-center cursor-pointer">
                        <Icon icon="ic:outline-plus" width="50" height="50" />
                    </div>
                    
                    
                </div>




            </div>
        </div>

        







        <div className='fixed bottom-0 left-0 w-screen h-24 flex justify-between z-30'>
                <button 
                onClick={() => handleGoBack()}
                className='w-32 h-10 border-2 border-white text-white rounded-full ml-20 mt-2 flex pl-1 items-center gap-2 z-50'>
                    <Icon icon="icons8:left-round" width="30" height="30" />
                        ย้อนกลับ
                </button>
                <button onClick={handleNextStep} 
                className={pickOrSend === 0 ? "hidden duration-300" :(placeToPic || addressPost
                ?'w-40 h-10 bg-dark1 text-white rounded-full mr-16 mt-2 flex justify-center items-center gap-2'
                :'w-40 h-10 border-2 border-gray-500 text-gray-500 rounded-full mr-16 mt-2 flex justify-center items-center gap-2')}>
                    ดำเนินการต่อ<Icon icon="icons8:right-round" width="30" height="30" />
                </button>
        </div>
    </>


  )
}




interface DropDownAddressProps {
    setAddressPost: (style: string) => void;
    setDropDownAddress: (style: boolean) => void;
    dropDownAddress:boolean
}

const DropDownAddress: React.FC<DropDownAddressProps> = ({setAddressPost, setDropDownAddress, dropDownAddress}) =>{
    const [dataAddress, setDataAddress] = useState([{
        id:1,
        address:'1-เลขที่ 37/5 ม.3 ต.วังตะกู อ.เมื่อง จ.นครปฐม 73000'
    },{
        id:2,
        address:'2-เลขที่ 37/5 ม.3 ต.วังตะกู อ.เมื่อง จ.นครปฐม 73000'
    },{
        id:3,
        address:'3-เลขที่ 37/5 ม.3 ต.วังตะกู อ.เมื่อง จ.นครปฐม 73000'
    },{
        id:3,
        address:'4-เลขที่ 37/5 ม.3 ต.วังตะกู อ.เมื่อง จ.นครปฐม 73000'
    }]);
    return (
            <div 
            onClick={() => setDropDownAddress(!dropDownAddress)}
            className="absolute top-36 left-1/2 -translate-x-1/2 w-10/12 h-60 bg-white rounded-b-xl shadow-lg z-0 overflow-y-auto overflow-x-hidden close-scrollbar text-black pt-2 duration-500 animetion-addressOn cursor-pointer">
                    {dataAddress.map((item,index)=>(
                        <div 
                        key={index}
                        onClick={() => setAddressPost(item.address)}
                        className="flex items-center justify-between w-11/12 h-20 pl-5 pr-5 break-words border-b  p-2 mx-auto text-lg">
                            {item.address}
                        </div>
                    
                    ))}
            </div>
    )
}


export default TradeProcess