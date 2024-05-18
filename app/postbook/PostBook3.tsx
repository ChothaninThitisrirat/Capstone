import React,{ useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


interface PostBook3Props {
    bookSelect: number | null;
    book: any;
}
interface BookProp2 {
    id: number;
    title: string;
    picture: string;
}
const PostBook3: React.FC<PostBook3Props> = ({bookSelect, book}) =>{

    const classBook = "flex items-center justify-center rounded-sm border w-64 h-96 shadow-sm duration-300 bg-dark3 mb-10 z-30 mt-5"

    const [bookProp2, setBookProp2] = useState<BookProp2[]>([]);

    const router = useRouter();

    const handleCancel = () => {
        router.back();
    };

    useEffect(() => {
        const filteredBook = book.filter((book: any) => book.id === bookSelect);
        setBookProp2(filteredBook)
    }, [book])
console.log(bookProp2)


    return (
        <>
            <div className='w-screen h-screen flex flex-col items-center mt-5 z-30'>
                <Icon icon="carbon:checkmark-outline" width="80" height="80" 
                className='text-green-400  z-30'/>
                <div className="text-3xl mt-2  z-30">โพสต์หนังสือเสร็จสิ้น</div>
                <div className="mt-8 text-3xl  z-30">{bookProp2[0]?.title }</div>
                <div  
                    className={classBook}>
                        <img
                        src={bookProp2[0]?.picture}
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