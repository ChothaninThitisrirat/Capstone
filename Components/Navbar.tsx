'use client'

import { useState } from "react";
import { Icon } from '@iconify/react';
import logoWhite from '../public/images/logoWhite.png';
import Image from 'next/image';
import { useSession } from 'next-auth/react'
import Link from "next/link";

function Navbar() {
    const { data: session, status } = useSession()

    const [showDropDown, setShowDropDown] = useState(false)
    return (<>
            <div 
            style={{backgroundColor: "#435585"}}
            className="flex w-screen h-16 rounded-b-3xl fixed cursor-pointer justify-between z-20" >
                <div className="flex gap-10 ml-10 items-center">
                    <Image
                    src={logoWhite}
                    alt="Logo"
                    className='w-36 h-20 object-contain '
                    />
                    <div className="flex gap-14 ml-5">
                        <div className="flex text-center items-center text-white text-base">หน้าแรก</div>
                        <div className="flex text-center items-center text-white text-base">หมวดหมู่</div>
                        <div className="flex text-center items-center text-white text-base">ยอดนิยม</div>
                    </div>
                </div>
                <div className="flex gap-14 mr-20 items-center">
                    <div className="flex text-center items-center text-white text-base">โพสต์หนังสือ</div>
                    <Link href='/libraly' className="flex text-center items-center text-white text-base">คลังหนังสือ</Link>
                    <div 
                    onClick={() => setShowDropDown(!showDropDown)}
                    className="flex gap-2 items-center">
                        <Image
                        src={logoWhite}
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
            </div>
            <div className={showDropDown
                            ?"fixed top-16 right-14 duration-500"
                            :"fixed top-16 right-14 -translate-y-96 duration-500"}>
                <DropDown/>
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
        link: "",
        text: "สถานะคำขอแลกเปลี่ยน",
        size: "25"
    },
    {
        id: 3,
        icon: "carbon:change-catalog",
        link: "",
        text: "หนังสือแลกเปลี่ยนของฉัน",
        size: "24"
    
    },
    {
        id: 4,
        icon: "cil:list",
        link: "",
        text: "Wish List",
        size: "22"
    }
]
    return (
        <div className=" flex-col w-auto bg-white border rounded-b-2xl shadow pl-2 pt-3 pr-2">
            {data.map((item) => (
                <div key={item.id} className="flex ml-2 mb-3">
                    <div
                    className="w-9 h-9 rounded-full bg-zinc-300 flex items-center justify-center">
                        <Icon icon={item.icon} width={item.size} height={item.size} 
                        style={{color:'363062'}}/>
                    </div>
                    <Link href={item.link} className="flex text-center items-center text-sm ml-3 mr-2">{item.text}</Link>
                </div>
            ))}
            <div className="flex items-center justify-center text-sm text-gray-500 py-2 border-t cursor-pointer gap-2">
            <Icon icon="ic:sharp-logout" width="20" height="20" />
                Logout</div>
            
            
        </div>
    )
}


export default Navbar


// เหลือเอารูปโปรไฟล์มาใส่และ link ไปหน้า ต่างๆ