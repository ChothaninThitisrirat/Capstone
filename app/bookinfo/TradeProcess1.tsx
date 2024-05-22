'use client'

import React,{ useState, useEffect, use }  from 'react'
import { Icon } from "@iconify/react";
import Image from 'next/image';
import PostNewBook from '@/Components/PostNewBook';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import propFooter from '../../public/images/propFooter.png';
import bgExchangebook from '../../public/images/bgExchangebook.png';
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";

interface TradeProcess1Props {
    bookId:string
    setStateProcess: (state: number) => void;
    setTrade: (state: boolean) => void;
    setBookSelect: (state: any) => void;
    bookSelect: any;
}
interface Book {
    id: number;
    title: string;
    picture: string;
    status: string;
    isPost_trade: boolean;
}
const TradeProcess: React.FC<TradeProcess1Props> = ({ bookId, setStateProcess, setTrade, bookSelect, setBookSelect }) => {




    
    const [loading, setLoading] = useState(true)
    const classBook = "flex items-center justify-center rounded-sm border w-64 h-96 cursor-pointer shadow-sm duration-300 relative mb-5"
    const [stateAddBook, setStateAddBook] = useState(false)
    const [ loadcompo, setLoadcompo] = useState(false)
    const [classAddBookbg, setClassAddBookbg] = useState('fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl hidden')
    const [classAddBook, setClassAddBook] = useState({
        transform:'translateY(100%)',
        visibility: "hidden",
        transitionDuration: '0.3s'
    })

    const [book, setBook] = useState<Book[]>([]);

    useEffect(() => {
        if (stateAddBook) {
            setClassAddBookbg('visible fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl')
            setClassAddBook({
                transform:'translateY(0%)',
                visibility: "visible",
                transitionDuration: '0.3s'
            })
        } else {
            setClassAddBookbg('hidden fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl')
            setClassAddBook({
                transform:'translateY(100%)',
                visibility: "hidden",
                transitionDuration: '0.3s'
            })
        }   
    }, [stateAddBook])

    const { data: session, status } = useSession()
    const userId: number | undefined = session?.user.id
    const router = useRouter();
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    // เลือกเล่มเดียว
    const handlesetBookSelect = (item: any) => {
        if(item.status === 'trading'){
            return;
        }else{
            if (bookSelect === item.id) {
                setBookSelect('');
                return;
            }else{
                setBookSelect(item.id);
            }
        }
    };

    // เลือกหลายเล่ม
    // const handlesetBookSelect = (itemId: string) => {
    //     if (bookSelect.includes(itemId)) {
    //         setBookSelect((prevState: string[]) => prevState.filter(item => item !== itemId));
    //     } else {
    //         setBookSelect((prevState: string[]) => [...prevState, itemId]);
    //     }
    // };
    
    const handleChangeState = ()=>{
        if (bookSelect.length !== 0) {
            setStateProcess(1);
        }
    }

    useEffect(() => {
        setLoadcompo(false);
    
        const fetchData = async () => {
            try {
                const response = await axios.get<{ library: Book[] }>(`/api/library/${userId}`);
                setBook(response.data.library.sort((a, b) => b.id - a.id));
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        if (userId !== undefined) {
        fetchData(); 
        }
    }, [userId, loadcompo]);




















return (
    <>
        <style>
                {`
                body {
                    overflow: hidden;
                }
                `}
        </style>
        {loading 
        ?<div 
            style={{minHeight: "800px",marginLeft:'450px'}}
            className="flex justify-center h-screen items-center pb-52">
                <HashLoader
                    className="ml-1 duration-300 "
                    color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
            </div>
        :<div
        style={{minHeight: "800px",marginLeft:'450px'}}
        className="flex justify-center h-auto w-sceen z-10 bg-none">
            <div
            className="flex w-full h-screen p-10 flex-wrap gap-20 gap-y-14 mb-10 overflow-y-auto close-scrollbar z-10 trade-container pb-52">
                <div 
                onClick={() => setStateAddBook(true)}
                className="flex items-center justify-center rounded-sm border w-64 h-96 bg-slate-200 cursor-pointer shadow-sm hover:bg-slate-300  hover:scale-105 duration-300">
                    <Icon icon="ic:baseline-plus" width="50" height="50"
                    className='text-gray-500'/>
                </div>

                {book.map((item, index) => (
                        <div
                        onClick={()=>handlesetBookSelect(item)} // ต้องส่งค่าไปหน้า BookInfo
                        key={index} 
                        className={bookSelect === item.id ? classBook+' '+' scale-105 border-4 border-dark2' : classBook}>
                            <div className="flex absolute top-0 -translate-y-5 text-base w-full">
                                <div className="flex w-full justify-start gap-2">
                                    {item.isPost_trade &&<div className="flex text-xs text-green-600 font-bold">[ POST ]</div>}
                                </div>
                            </div>
                            <div className="flex flex-col absolute bottom-0 translate-y-8 text-base w-full">
                                <div className="flex w-full justify-center">{item.title}</div>
                            </div>
                            <img
                            src={item.picture[0]}
                            alt="Profile picture"
                            className='w-full h-full object-cover cursor-pointer bg-white'
                            />
                            <Image
                            src={propFooter}
                            alt="Profile picture"
                            className={bookSelect === item.id ?'w-20 h-16 object-contain absolute top-0 right-0 -translate-y-3 drop-shadow-md duration-300'
                                :'w-20 h-16 object-contain absolute top-0 right-0 -translate-y-8 translate-x-3 drop-shadow-md duration-300 scale-0 '}/>
                            {item.status === 'trading' && 
                            <div 
                                style={{backgroundColor:'#57575780'}}
                                className={"absolute top-0 left-0 w-64 h-96 flex justify-center items-center font-bold text-2xl duration-300"}>
                                TRADING
                            </div>}
                        </div>
                        
                    ))}
            </div>
        </div>}

        <div className={classAddBookbg}></div>
        <PostNewBook setStateAddBook={setStateAddBook} classAddBook={classAddBook} setLoadcompo={setLoadcompo}/>








        <div className='fixed bottom-0 left-0 w-screen h-24 flex justify-between z-30'>
                <button onClick={()=>setTrade(false)} className='w-20 h-10 border-2 border-red-500 rounded-full ml-20 mt-2 text-white hover:bg-red-500'>ยกเลิก</button>
                <button onClick={handleChangeState} 
                className={bookSelect.length === 0
                ?'w-40 h-10 border-2 border-gray-500 text-gray-500 rounded-full mr-16 mt-2 flex justify-center items-center gap-2'
                :'w-40 h-10 bg-dark1 text-white rounded-full mr-16 mt-2 flex justify-center items-center gap-2'}>
                    ดำเนินการต่อ<Icon icon="icons8:right-round" width="30" height="30" />
                </button>
        </div>
    </>


  )
}

export default TradeProcess