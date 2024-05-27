'use cilent'

import React,{useState} from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';


interface SlideBookMiniwithTitleProps {
    data: any;
    Headtitle: string;
    num_category: number;
}

interface BookItem {
    id: number;
    title: string;
    picture: string[];
}

const SlideBookMiniWithTitle: React.FC<SlideBookMiniwithTitleProps> = ({data, Headtitle, num_category}) =>{
    const [moreFrom, setMoreFrom] = useState(0)
    return (
        <>
            <div className="flex flex-cols font-bold w-full text-5xl pt-12 pb-4">
                <div className="flex w-1/2">
                    {Headtitle}
                </div>
                <Link
                href={`/category/${num_category}`}
                className="flex w-1/2 justify-end text-xl items-center">
                    <p className='rounded-full bg-dark2 py-2 px-4 text-white'>
                    ดูทั้งหมด
                    </p>
                    
                </Link>
                
            </div>
            <div
            className="flex sm:gap-10 justify-start sm:justify-center items-center px-1 w-full pb-8 relative">
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
                    className="flex flex-cols w-48 h-56 rounded-s-xs shrink-0  duration-300 bg-white cursor-pointer ">
                        <div
                        style={{ backgroundImage: `url(${item.picture[0]})` }}
                        className=''
                        />
                        <div className=" ">
                            {item.title}
                        </div>

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

export default SlideBookMiniWithTitle