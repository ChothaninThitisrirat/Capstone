import React from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


interface PostBook3Props {
    bookSelect:string;
}

const PostBook3: React.FC<PostBook3Props> = ({bookSelect}) =>{

    const classBook = "flex items-center justify-center rounded-sm border w-64 h-96 shadow-sm duration-300 bg-dark3 mb-10 z-30 mt-5"
    const router = useRouter();

    const handleCancel = () => {
        router.back();
    };




    return (
        <>
            <div className='w-screen h-screen flex flex-col items-center mt-5 z-30'>
                <Icon icon="carbon:checkmark-outline" width="80" height="80" 
                className='text-green-400  z-30'/>
                <div className="text-3xl mt-2  z-30">โพสต์หนังสือเสร็จสิ้น</div>
                <div className="mt-8 text-3xl  z-30">{bookSelect}</div>
                <div  
                    className={classBook}>
                        <Image
                        src=''
                        alt="Profile picture"
                        className='w-64 h-96 object-cover'
                        />
                </div>
                <button className='text-xl text-dark1 border-4 border-dark1 rounded-full h-10 w-52 z-30'>ดูโพสต์ของฉัน</button>
                <button onClick={handleCancel} className='text-xl text-white bg-dark2 rounded-full h-10 w-44 z-30 mt-10'>กลับสู่หน้าหลัก</button>
            </div>
        </>
    )
}

export default PostBook3