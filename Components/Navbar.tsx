'use client'

import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import logoWhite from '../public/images/logoWhite.png';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react'
import Link from "next/link";
import { image } from '@/utils/supabase';


interface NavbarProps {
    backGroundOn: boolean;
    withTitle: boolean;
}


const Navbar: React.FC<NavbarProps> = ({backGroundOn, withTitle}) =>{
    const { data: session, status } = useSession()

    const [showDropDown, setShowDropDown] = useState(false)
    const [showDropDownresponsive, setShowDropDownresponsive] = useState(false)
    const [stateResponsiveManu, setStateResponsiveManu] = useState(false)
    const [manuDropDown, setManuDropDown] = useState(false)



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1100) {
                setShowDropDownresponsive(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleManu = (e:any) => {
        if (e.target.checked) {
            setShowDropDownresponsive(true)
            setTimeout(() => {
                setStateResponsiveManu(true)
            }, 200);
            setTimeout(() => {
                setManuDropDown(true)
            }, 300);
        } else {
            setShowDropDownresponsive(false)
            setStateResponsiveManu(false)
            setManuDropDown(false)
        }
    }
    return (<>
        <div className={withTitle?"flex  w-screen h-16 cursor-pointer justify-center z-30 bg-dark3"
            :"flex  w-screen h-16 cursor-pointer justify-center z-30"}>
            <div 
            className={
                showDropDownresponsive? "flex flex-col w-screen  rounded-b-3xl relative cursor-pointer items-center z-30 bg-dark2 duration-500 h-[460px]":
                (backGroundOn
            ?"flex w-screen h-16  rounded-b-3xl relative cursor-pointer justify-center z-30 bg-dark2 duration-500"
            :"flex w-screen h-16 relative cursor-pointer justify-center z-30 bg-dark2 duration-500")} >
                <div 
                style={{maxWidth: '2200px'}}
                className="flex w-screen h-16 relative z-30 shrink-0">
                    <div className="flex w-full justify-between z-40 bg-dark2 rounded-b-3xl">
                        <div className="flex gap-5 ml-10 items-center">
                        <Link href='/' >
                            <Image
                            src={logoWhite}
                            alt="Logo"
                            className='w-32 h-12 object-contain ml-5'
                            />
                        </Link>
                            <div className="flex gap-14 ml-5  responsive-close">
                                <Link href='/' className="flex text-center items-center text-white text-base">หน้าแรก</Link>
                                <Link href='/' className="flex text-center items-center text-white text-base">หมวดหมู่</Link>
                                <Link href='/' className="flex text-center items-center text-white text-base">ยอดนิยม</Link>
                            </div>
                        </div>
                        <div className="flex gap-14 mr-20 items-center  responsive-close">
                            <Link href='/postbook' className="flex text-center items-center text-white text-base">โพสต์หนังสือ</Link>
                            <Link href='/library' className="flex text-center items-center text-white text-base">คลังหนังสือ</Link>
                            <div 
                            onClick={() => setShowDropDown(!showDropDown)}
                            className="flex gap-2 items-center">
                                <img
                                src={`${image}line_icon.jpg`}
                                alt="Profile picture"
                                className='w-9 h-9 object-cover rounded-full cursor-pointer bg-white'
                                />
                                {session && session.user ?(
                                    <div className="flex text-center items-center justify-center text-white text-lg w-auto">{session.user.username}</div>
                                ):<div className="flex w-20"></div>}
                                {showDropDown
                                ?<Icon icon="mdi:chevron-up" width="20" height="20"
                                className="text-white"/>
                                :<Icon icon="mdi:chevron-down" width="20" height="20"
                                className="text-white"/>}
                            </div>
                        </div>
                        <div className="hidden gap-14 mr-20 items-center  responsive-open">
                            <div id="menuToggle">
                                <input 
                                checked={showDropDownresponsive}
                                onClick={(e)=>handleManu(e)}
                                type="checkbox" />
                                <span></span>
                                <span></span>
                                <span></span>
                                <div className="flex"></div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={showDropDownresponsive
                                    ?"absolute top-16 right-1/2 duration-500 z-10"
                                    :"absolute top-16      right-1/2            -translate-y-96 duration-500 z-10"}>
                                    <DropDownResponsive/>
                    </div> */}
                    <div className={showDropDown
                        ?"absolute top-16 right-14 duration-500 z-10  responsive-close"
                        :"absolute top-16 right-14 -translate-y-96 duration-500 z-10 responsive-close"}>
                        <DropDown/>
                    </div>
                </div>
                {stateResponsiveManu &&
                <div className={ manuDropDown?"flex w-full h-auto shrink-0 responsive-open duration-300":" invisible duration-300 opacity-0"}>
                    <DropDownResponsive/>
                </div>}
            </div>
            
        </div>
            
            
        </>
    )
}



function DropDown() {
    const data = [{
        id: 1,
        icon: "mdi:user",
        link: "/profile",
        text: "Edit Profile",
        size: "30"
    },
    {
        id: 2,
        icon: "mdi:list-status",
        link: "/statustrade",
        text: "สถานะคำขอแลกเปลี่ยน",
        size: "25"
    },
    {
        id: 3,
        icon: "carbon:change-catalog",
        link: "/tradebook",
        text: "หนังสือแลกเปลี่ยนของฉัน",
        size: "24"
    
    },
    {
        id: 4,
        icon: "cil:list",
        link: "/wishlist",
        text: "Wish List",
        size: "22"
    }
]
    return (
        <div className=" flex-col w-auto bg-white border rounded-b-2xl shadow z-10">
            {data.map((item) => (
                <Link key={item.id} href={item.link} className="flex pl-4 h-12 pr-2 cursor-pointer hover:bg-slate-200 w-full items-center justify-start">
                    <div
                    className="w-9 h-9 rounded-full bg-zinc-300 flex items-center justify-center">
                        <Icon icon={item.icon} width={item.size} height={item.size} 
                        style={{color:'#363062'}}/>
                    </div>
                    <div  className="flex text-center items-center text-sm ml-3 mr-2">{item.text}</div>
                </Link>
            ))}
            <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center justify-center text-sm text-gray-500 py-2 border-t gap-2 w-full">
            <Icon icon="ic:sharp-logout" width="20" height="20" />
                Logout</button>
            
            
        </div>
    )
}



function DropDownResponsive() {
    const data = [{
        icon: "iconamoon:category-light",
        link: "/",
        text: "หมวดหมู่",
        size: "30"
    },{
        icon: "ion:library-outline",
        link: "/library",
        text: "คลังหนังสือ",
        size: "25"
    },{
        icon: "ph:share",
        link: "/wishlist",
        text: "โพสหนังสือ",
        size: "22"
    },{
        icon: "mdi:user",
        link: "/profile",
        text: "Edit Profile",
        size: "30"
    },{
        icon: "cil:list",
        link: "/wishlist",
        text: "Wish List",
        size: "22"
    },{
        icon: "mdi:list-status",
        link: "/statustrade",
        text: "สถานะคำขอแลกเปลี่ยน",
        size: "25"
    },{
        icon: "carbon:change-catalog",
        link: "/tradebook",
        text: "หนังสือแลกเปลี่ยนของฉัน",
        size: "24"
    
    },
    
]
    return (
        <div className="flex flex-col w-full z-10 items-center">
            {data.map((item,index) => (
                <Link key={index} href={item.link} className="flex pl-4 h-12 pr-2 cursor-pointer hover:bg-dark3 items-center justify-center w-full">
                    <div className="flex pl-4 h-12 pr-2 items-center justify-start w-64 ml-10">
                        <div
                        className="w-9 h-9 rounded-full flex items-center justify-center">
                            <Icon icon={item.icon} width={item.size} height={item.size} 
                            // style={{color:'#363062'}}
                            className="text-white"/>
                        </div>
                        <div  className="flex text-center items-center text-sm ml-3 mr-2 text-white">{item.text}</div>
                    </div>
                </Link>
            ))}
            <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center justify-center text-sm text-gray-200 py-2 border-t gap-2 w-10/12 pt-4">
            <Icon icon="ic:sharp-logout" width="20" height="20" />
                Logout</button>
            
            
        </div>
    )
}


export default Navbar