'use client'

import React,{useEffect, useState} from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';


interface SlideBookBigProps {
    data: BookItems[];
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
    const SlideBookBig: React.FC<SlideBookBigProps> = ({data}) =>{
    const [moreFrom, setMoreFrom] = useState(0)

    console.log(data)
    return (
        <>  
            <div className='flex flex-col w-full h-full'>
                <div className="flex flex-col">
                    <p className='text-5xl font-bold'>Popular</p>
                    <p className='text-xl font-bold mt-5'>หนังสือดี หนังสือเด่น คนนิยมอ่าน</p>
                </div>

                
                    {moreFrom === 0
                    ? <div
                    className=' shrink-0 w-0 h-0'/>
                    :<Icon
                        onClick={() => setMoreFrom(prev => prev-1)}
                        icon="icon-park-solid:left-c" width="50" height="50" 
                        className="flex gap-10 justify-start items-center overflow-x-auto h-64 p-2 close-scrollbar" />
                    }   
                    
                    {data.map((item: BookItems, index:number)=>(
                        <div 
                        key={index}
                        className='flex flex-row justify-center w-1/4 h-110 shadow-xl rounded-2xl bg-white min-w-128 mt-8'>
                        <div className='flex justify-center w-2/4 min-w-56 bg-cover bg-center bg-no-repeat rounded-l-2xl' style={{backgroundImage: `url(${item.picture[0]})`}} />
                                <div className='flex flex-col items-center w-2/4 h-full min-w-96'>
                                    <div className="flex flex-col h-5/6 ml-8">
                                        <div className='flex w-5/6 text-3xl font-bold mt-5'>
                                            {item.title}
                                        </div>
                                        
                                        <div className='flex w-5/6 text-xl font-thin mt-5 ml-5'>
                                            {item.description}
                                        </div>
                                    </div>
                                    <div className='flex justify-start w-1/2'>
                                        {item.User.username}
                                    </div>
                                    <div className='flex justify-end w-1/2'>
                                        <Link href={`/bookinfo/${item.id}`} className='flex justify-center items-center w-1/3 h-2/3  bg-dark2 rounded-2xl min-w-24 max-h-12 text-white hover:shadow-inner transform transition duration-300 ease-in-out hover:scale-95'>ดูเพิ่มเติม</Link>
                                    </div>
                                </div>
                        </div>
                    ))}
                


                
                
            </div>
            
            
        </>
    )
}

export default SlideBookBig;

