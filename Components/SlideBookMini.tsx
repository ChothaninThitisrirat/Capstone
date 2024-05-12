'use cilent'

import React,{useState} from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';

interface SlideBookMiniProps {
    data: { id: string, img: string }[];
}

const SlideBookMini: React.FC<SlideBookMiniProps> = ({data}) =>{
    const [moreFrom, setMoreFrom] = useState(0)

    return (
        <>
            <div 
            className="flex gap-10 justify-center items-center px-3 relative pl-20 shrink-0">
            {moreFrom === 0 
            ? <div 
            style={{width: '70px'}}
            className=' shrink-0'></div>
            :<Icon 
            onClick={() => setMoreFrom(prev => prev-1)}
            className='mr-5 text-dark3 cursor-pointer shrink-0'
            icon="icon-park-solid:left-c" width="50" height="50" />}

                <div 
                style={{width: '1350px', WebkitOverflowScrolling: 'touch'}}
                className="flex gap-10 justify-start items-center overflow-x-auto h-auto p-2 close-scrollbar">
                {data.map((item, index) => (
                    <div 
                    key={index}
                    style={{transform: `translateX(${moreFrom * -504}px)`, transition: 'transform 0.6s ease-in-out' }}
                    className="flex w-32 h-48 rounded-s-xs shrink-0 duration-500 bg-white">
                    {/* img */}
                    </div>
                ))}
                <div 
                style={{background:'linear-gradient(to right, rgba(255, 255, 255, 0), #f9f9f9 80%)'}}
                className="w-32 h-52 absolute right-28 top-0 z-0"></div>
                </div>

            
            {moreFrom < (data.length/3)-2
            ?<div 
            className=' shrink-0 relative'
            style={{width: '70px'}}>
                <Icon 
                onClick={() => setMoreFrom(  prev => prev+1)}
                className=' text-dark3 cursor-pointer z-10 shrink-0 absolute right-0 top-0 -translate-y-1/2 -translate-x-16'
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