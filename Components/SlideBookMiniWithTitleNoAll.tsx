'use cilent'

import React,{useState} from 'react'
import { Icon } from '@iconify/react';
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

const SlideBookMiniWithTitle: React.FC<SlideBookMiniwithTitleProps> = ({data, Headtitle}) =>{
    const [moreFrom, setMoreFrom] = useState(0)
    return (
        <>
            <div className="flex flex-cols font-bold w-full text-3xl pt-12 pb-4 xl:text-5xl">
                <div className="flex w-1/2">
                    {Headtitle}
                </div>
                
                
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
                style={{WebkitOverflowScrolling: 'touch'}}
                className="flex gap-14 justify-start items-start overflow-x-auto h-fit w-full close-scrollbar pt-12">
                {data?.map((item: BookItem, index: number) => (
                    <Link 
                    className='flex flex-col justify-center items-center '
                    href={`/bookinfo/${item.id}`} 
                    style={{transform: `translateX(${moreFrom * -245}px)`, transition: 'transform 0.6s ease-in-out'}} 
                    >
                        <div
                        key={index}
                        style={{ backgroundImage: `url(${item.picture[0]})` }}
                        className="flex flex-col w-48 h-72 rounded-s-xs shrink-0 duration-300 bg-white cursor-pointer bg-cover bg-no-repeat bg-center shadow-lg hover:scale-105" />
                        <div className="flex w-40 h-max  justify-center items-end  font-bold text-lg pt-4">
                        {item.title}
                        </div>
                    </Link>
                ))}
                <div 
                style={{background:'linear-gradient(to right, rgba(255, 255, 255, 0) 20%, #f9f9f9 80%)'}}
                className="w-32 h-110 absolute right-10 sm:right-28 top-6 z-0"></div>
                </div>

            
            {moreFrom < (data?.length)-4
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