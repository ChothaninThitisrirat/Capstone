'use client'

import React,{useState} from 'react';
import { Icon } from '@iconify/react';


interface SlideBookBigProps {
    data: { id: string, img: string }[];
}


const SlideBookBig: React.FC<SlideBookBigProps> = ({data}) =>{
    const [moreFrom, setMoreFrom] = useState(0)

    return (
        <>
            
            <div className='flex flex-row justify-center w-1/3 h-110 shadow-xl rounded-2xl bg-white min-w-128 '>

                {/* รูปภาพหนังสือ */}
                <div className='flex justify-center w-1/3 min-w-56 bg-cover bg-center bg-no-repeat rounded-l-2xl' style={{backgroundImage: "url('https://picsum.photos/200/300')"}} />
                
                {/* ข้อมูลหนังสือฝั่งขวา */}
                <div className='flex flex-col items-center w-2/3 h-full min-w-96'>
                    <div className="flex flex-col h-5/6 ml-8">
                        <div className='flex w-5/6 text-3xl font-bold mt-5'>
                            Book's Title
                        </div>
                        
                        <div className='flex w-5/6 text-xl font-thin mt-5 ml-5'>
                            Book's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's InfoBook's Info
                        </div>

                    </div>
                    <div className='flex flex-row h-1/6 w-5/6'>
                        <div className='flex justify-start w-1/2'>Username</div>
                        <div className='flex justify-end w-1/2'>
                            <button className='flex justify-center items-center w-1/3 h-2/3  bg-dark2 rounded-2xl min-w-24 max-h-12 text-white hover:shadow-inner transform transition duration-300 ease-in-out hover:scale-95'>ดูเพิ่มเติม</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SlideBookBig;

