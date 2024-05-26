'use cilent'

import React,{useState} from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';


interface SlideBookMiniwithTitleProps {
    data: any;
    Headtitle: string;
}

interface BookItem {
    id: number;
    title: string;
    picture: string[];
}

const SlideBookMini: React.FC<SlideBookMiniwithTitleProps> = ({data, Headtitle}) =>{
    const [moreFrom, setMoreFrom] = useState(0)

    return (
        <>
            <div className="font-bold text-5xl pt-12 pb-4">
                {Headtitle}
            </div>
            <div
            className="flex sm:gap-10 justify-start sm:justify-center items-center px-1 w-auto pb-8 relative">
            {moreFrom === 0 
            ? <div 
            style={{width: '70px'}}
            className=' shrink-0'></div>
            :<Icon 
            onClick={() => setMoreFrom(prev => prev-1)}
            className='sm:mr-5 text-dark3 cursor-pointer shrink-0 hover:text-dark2 duration-200 scale-75 sm:scale-100'
            icon="icon-park-solid:left-c" width="50" height="50" />}

                <div 
                style={{width: '1350px', WebkitOverflowScrolling: 'touch'}}
                className="flex gap-10 justify-start items-center overflow-x-auto h-64 p-2 close-scrollbar ">
                {data?.map((item: BookItem, index: number) => (
                    <Link
                    href={`/bookinfo/${item.id}`}  
                    key={index}
                    style={{transform: `translateX(${moreFrom * -168}px)`, transition: 'transform 0.6s ease-in-out' }}
                    className="flex w-32 h-48 rounded-s-xs shrink-0 duration-300 bg-white cursor-pointer ">
                    
                    <img
                    src={item.picture[0]}
                    className='flex pb-2 object-cover w-full h-full rounded-s-xs shrink-0 duration-300 hover:scale-105'
                    />
                    <div className="flex absolute bottom-0 translate-y-6 text-lg w-full justify-center break-words font-bold ">{item.title}</div>
                    </Link>
                ))}
                <div 
                style={{background:'linear-gradient(to right, rgba(255, 255, 255, 0) 20%, #f9f9f9 80%)'}}
                className="w-32 h-52 absolute right-10 sm:right-28 top-6 z-0"></div>
                </div>

            
            {moreFrom < (data?.length)-2
            ?<div 
            className=' shrink-0 relative'
            style={{width: '70px'}}>
                <Icon 
                onClick={() => setMoreFrom(  prev => prev+1)}
                className=' text-dark3 cursor-pointer z-10 shrink-0 absolute right-0 top-0 -translate-y-1/2 sm:-translate-x-16 hover:text-dark2 duration-200 scale-75 sm:scale-100'
                icon="icon-park-solid:right-c" width="50" height="50" />
            </div>
            
            :<div 
            className=' shrink-0'
            style={{width: '70px'}}></div>}
            
            </div>
        </>
    )
}

export default SlideBookMini