'use client'

import React, { use } from 'react'
import { useState, useEffect } from "react";
import Image from 'next/image';
import { Icon } from '@iconify/react';
import PostNewBook from '@/Components/PostNewBook';
import AddAddress from '@/Components/AddAddress';
import bgExchangebook from '../../public/images/bgExchangebook.png';
import propFooter from '../../public/images/propFooter.png';
import './checkbox.css';

interface PostBook2Props {
    setStatePage: (style: number) => void;
}

const PostBook2: React.FC<PostBook2Props> = ({setStatePage}) =>{
    const [isChecked, setIsChecked] = useState(false);
    const [makeAppointment , setMakeAppointment] = useState('') // ส่งไปbackend
    const [isChecked2, setIsChecked2] = useState(false);
    const [addressPost , setAddressPost] = useState('') // ส่งไปbackend
    const [haveData, setHaveData] = useState(false);
    const [dropDownAddress, setDropDownAddress] = useState(false);
    const [statusAddress, setStatusAddress] = useState(false);
    const classBook = "flex items-center justify-center rounded-sm border w-64 h-96 shadow-sm duration-300 relative bg-dark3 mb-28 scale-125"
    const [book, setBook] = useState([]);
    const booktest = [{
        id: "book1",
        img: "https://picsum.photos/200/300",
    }]

    const handleCheckboxChange = (e:any) => {
        setIsChecked(e.target.checked);
        if (!e.target.checked) {
            setMakeAppointment('');
        }
    };
    const handleCheckboxChange2 = (e:any) => {
        setIsChecked2(e.target.checked);
        if (!e.target.checked) {
            setAddressPost('');
            
        }
    };

    useEffect(() => {
        if (makeAppointment !== '' || addressPost !== '') {
            setHaveData(true);
        }else{
            setHaveData(false);
        }
        
    }, [addressPost, makeAppointment]);

    const handleChangeState = ()=>{
        if (haveData) {
            setStatePage(2);
        }
    }

    return (
        <>
        <div className="flex z-20">
            <div className="flex h-screen w-1/3 items-center justify-end z-20">
                <div className="flex flex-col">
                    <div className='flex -translate-y-20 justify-center text-2xl font-bold'>Book Name</div>
                    <div className={classBook}>
                        <Image
                        src={bgExchangebook}
                        alt="Profile picture"
                        className='w-full h-full object-cover'
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-screen w-2/3 pl-40 z-20 justify-center">
                <div className="flex text-2xl font-bold">วิธีการแลกเปลี่ยน</div>
                <div className="flex w-auto items-end ml-20 mt-10">
                    <div className="flex flex-col items-center h-36"> 
                        <div className="checkbox-wrapper-19">
                            <input 
                            type="checkbox" 
                            id="cbtest-19-1" 
                            checked={isChecked}
                            onChange={handleCheckboxChange}/>
                            <label htmlFor="cbtest-19-1" className="check-box"/>
                        </div>
                        <div 
                        onClick={() => setIsChecked(!isChecked)}
                        className="flex flex-col w-28 h-36 shadow-xl rounded-2xl bg-white relative cursor-pointer">
                            <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-10 text-white">นัดรับ</div>
                            <Icon icon="tdesign:undertake-delivery" width="50" height="50" 
                            className='ml-2 mt-1'/>
                            <Icon icon="mdi:hand-extended-outline" width="50" height="50"
                            className='scale-x-[-1] absolute top-16 right-2' />
                        </div>
                    </div>
                    <input
                        id="makeAppointment"
                        type="text"
                        value={makeAppointment}
                        placeholder="สถานที่นัดรับ"
                        onChange={(e) => setMakeAppointment(e.target.value)}
                        readOnly={!isChecked}
                        className={!isChecked ? "w-96 border-b border-gray-300 pl-5 py-1 mt-5 ml-10 mb-8":"w-96 border-b border-black pl-5 py-1 mt-5 ml-10 mb-8" }
                    />
                </div>
                <div className="flex w-auto items-end ml-20 mb-40 mt-10">
                    <div 
                    onClick={() => setIsChecked2(!isChecked2)}
                    className="flex flex-col items-center h-36"> 
                        <div className="checkbox-wrapper-19">
                            <input 
                            type="checkbox" 
                            id="cbtest-19-2"
                            checked={isChecked2}
                            onChange={handleCheckboxChange2}
                            />
                            <label htmlFor="cbtest-19-2" className="check-box"/>
                        </div>
                        <div className="flex flex-col w-28 h-36 shadow-xl rounded-2xl bg-white items-center relative cursor-pointer">
                            <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-10 text-white">จัดส่ง</div>
                            <Icon icon="iconoir:delivery-truck" width="70" height="70" />
                            <Icon icon="fluent:checkmark-12-filled" width="20" height="20" 
                            className=' absolute top-16 left-10'/>
                        </div>
                    </div>
                    {!isChecked2
                    ?<div className="w-96 h-10 border-2 border-gray-300 rounded-xl pl-5 py-1 mt-5 ml-10 mb-10 text-gray-400 flex items-center z-10">
                        โปรดเลือกที่อยู่จัดส่ง
                    </div>
                    :<div 
                    onClick={() => setDropDownAddress(!dropDownAddress)}
                    className= {addressPost === '' 
                    ?"w-96 min-h-10 border-2 border-dark1 rounded-xl pl-5 py-1 mt-5 ml-10 mb-10 text-gray-400 flex justify-between items-center cursor-pointer relative z-10"
                    :"w-96 min-h-10 border-2 border-dark1 rounded-xl pl-5 py-1 mt-5 ml-10 mb-10 text-black flex justify-between items-center cursor-pointer relative z-10"}>
                        {addressPost !== '' ? addressPost : 'โปรดเลือกที่อยู่จัดส่ง'}
                        <Icon icon="mingcute:down-line" width="30" height="30" className='mr-2 text-dark1'/>{ dropDownAddress && <DropDownAddress setAddressPost={setAddressPost} setStatusAddress={setStatusAddress} /> }
                    </div>}
                    
                        
                    
                    
                </div>
            </div>
        </div>
                    <button onClick={() => setStatePage(0)} className='w-32 h-10 border-2 border-dark1 rounded-full ml-20 mt-2 flex pl-1 items-center gap-2 hover:bg-indigo-100 fixed bottom-6 left-6 z-50'>
                    <Icon icon="icons8:left-round" width="30" height="30" />
                        ย้อนกลับ</button>
                    <button onClick={handleChangeState} className={haveData
                    ?'w-36 h-10 border-2 bg-dark1 text-white rounded-full mr-16 mt-2 flex justify-end items-center gap-2 pr-1 fixed bottom-6 right-6 z-50'
                    :'w-36 h-10 border-2 border-gray-500 text-gray-500 rounded-full mr-16 mt-2 flex justify-end items-center gap-2 pr-1 fixed bottom-6 right-6 z-50'}>
                        โพสต์หนังสือ<Icon icon="icons8:right-round" width="30" height="30" /></button>

                    {statusAddress ?<div className='fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl'></div>
                    :<div className='fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl hidden'></div>}
                    {statusAddress && <AddAddress setStatusAddress={setStatusAddress}/>}



        </>
    )
}

interface DropDownAddressProps {
    setAddressPost: (style: string) => void;
    setStatusAddress: (style: boolean) => void;
}

const DropDownAddress: React.FC<DropDownAddressProps> = ({setAddressPost, setStatusAddress}) =>{
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
        <>
            <div className="absolute top-0 left-7 w-80 h-60 bg-white rounded-b-xl shadow-lg z-0 overflow-y-auto overflow-x-hidden address-container text-black pt-2 duration-500 animetion-addressOn cursor-pointer">
                    {dataAddress.map((item,index)=>(
                        <div 
                        key={index}
                        onClick={() => setAddressPost(item.address)}
                        className="flex items-center justify-between w-11/12 h-auto min-h-10 pl-5 pr-5 break-all border-b  p-2 mx-auto">{item.address}</div>
                    
                    ))}

                    <div className="flex items-center justify-center w-full h-16 border-t py-3 border-gray-800 cursor-pointer  hover:bg-slate-100">
                    <Icon 
                    onClick={() => setStatusAddress(true)}
                    icon="ic:baseline-plus" width="30" height="30"
                    className='text-black'/>
                    </div>
            </div>
        </>
    )
}



export default PostBook2