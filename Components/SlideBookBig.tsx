'use client'

import React,{useEffect, useState} from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';


interface SlideBookBigProps {
    data: BookItems[];
    Headtitle: string;
    Subtitle: string;
}


interface BookItems {
    id: string;
    img: string;
    title: string;
    description: string;
    picture: string[];
    User: {
        username: string;
    }
}
    const SlideBookBig: React.FC<SlideBookBigProps> = ({data,Headtitle,Subtitle}) =>{
    const [moreFrom, setMoreFrom] = useState(0)

    return (
        <>  
            <div className='flex flex-col w-full h-full'>
                <div className="flex flex-col">
                    <p className='text-5xl font-bold'>{Headtitle}</p>
                    <div className='flex text-xl w-full item-center font-bold mt-5'>
                        <p className='flex items-center justify-start w-1/2'>{Subtitle}</p>
                        <div className="flex w-1/2 justify-end" >
                        {moreFrom === 0
                            ? <div 
                            className='mr-5 shrink-0 w-50 h-50'></div>
                            :
                            <Icon 
                            onClick={() => setMoreFrom(prev => prev-1)}
                            className='mr-5 text-dark3 shrink-0 hover:text-dark2 duration-200'
                            icon="icon-park-solid:left-c" 
                            width="50" 
                            height="50" 
                            />
                            }

                        {data?.length !== 2 &&(moreFrom < data.length - 2 
                            ?<Icon 
                            onClick={() => setMoreFrom(  prev => prev+1)}
                            className='ml-5 text-dark3  shrink-0 hover:text-dark2 duration-200'
                            icon="icon-park-solid:right-c" width="50" height="50" />
                            :<div
                            className='mr-5 shrink-0 w-50 h-50'></div>)}
                            <div 
                            style={{background:'linear-gradient(to right, rgba(255, 255, 255, 0) 20%, #f9f9f9 80%)'}}
                            className="w-32 h-115 mt-20 absolute z-10">
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div 
                style={{WebkitOverflowScrolling: 'touch'}}
                className="flex gap-14 w-full justify-start items-center overflow-x-auto close-scrollbar pb-8">
                    {data.map((item: BookItems, index:number)=>(
                        <div 
                        key={index}
                        className='flex flex-row justify-start shrink-0 w-5/12 h-96 drop-shadow-xl rounded-2xl duration-300  bg-white min-w-128 mt-8'
                        style={{transform: `translateX(${moreFrom * -504}px)`, transition: 'transform 0.6s ease-in-out' }}>
                            
                            <div className='flex justify-center w-2/4 min-w-56 bg-cover bg-center bg-no-repeat rounded-l-2xl' style={{backgroundImage: `url(${item.picture[0]})`}} />



                                <div className='flex flex-col items-center w-2/4 h-full min-w-96'>
                                    <div className="flex w-10/12 flex-col h-5/6">
                                        <div className='flex w-8/12 text-3xl font-bold mt-5'>
                                            {item.title}
                                        </div>
                                        
                                        <div className='flex w-5/6 text-xl font-thin mt-5 ml-5'>

                                            {item.description}
                                        </div>
                                    </div>
                                    <div className="flex w-10/12 h-1/6 justify-between">
                                        <div className='flex justify-end items-center'>
                                            {item.User.username}
                                        </div>
                                        <div className='flex justify-end items-center cursor-pointer '>
                                            <Link 
                                            href={`/bookinfo/${item.id}`} 
                                            className='flex justify-center items-center w-full h-1/2  bg-dark2 rounded-2xl min-w-24 max-h-12 text-white hover:shadow-inner transform transition duration-300 ease-in-out hover:scale-95'>
                                                ดูเพิ่มเติม
                                            </Link>
                                        </div>
                                    </div>
                                </div>



                            </div>
                    ))}
                    
                </div>
                
            </div>
            
            
        </>
    )
}

export default SlideBookBig;

