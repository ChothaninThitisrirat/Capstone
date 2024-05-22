'use client'

import {useState,useEffect, use} from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';     
import { useSession } from 'next-auth/react'
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import Loadable from 'next/dist/shared/lib/loadable.shared-runtime';
import { useRouter } from 'next/navigation'
import { image } from '@/utils/supabase';

interface PostNewBookProp {
    stateOpen: boolean;
    setStateOpen: (style: boolean) => void;
    classAddBook: any;
    setLoadcompo: (state: boolean) => void;
    tradeReQuest: any;
    bookIdSelect: number | null | undefined;
    tradingBook: any[];
}

interface BookRequest {
    id: number;
    status: string;
    req_book_id: number;
    req_address: string;
    pickup_req: string | null;
    Book_Trade_req_book_idToBook: {
        id: number;
        title: string;
        status: string;
        picture: string[];
        description: string;
        User: {
            id: number;
            username: string;
            profile_picture: string;
            facebook: string | null;
            instagram: string | null;
            line: string | null;
        };
    };
    
}
interface TradeShow {
    Book_Trade_book_idToBook: any;
    Book_Trade_req_book_idToBook: any;
    id: number;
    pickup_req: string; 
    req_address: string;
    status: string;
}
const ManageRequest: React.FC<PostNewBookProp> = ({stateOpen, setStateOpen, classAddBook, setLoadcompo, tradeReQuest, bookIdSelect, tradingBook}) =>{
    const [tradeInfo, setTradeInfo] = useState<TradeShow>()
    const [loadTrade, setLoadTrade] = useState(false)
    const [bookSelectTrade, setBookSelectTrade] = useState<BookRequest>()
    const [bookInfo, setBookInfo] = useState<BookRequest>()
    const [pictureShow, setPictureShow] = useState(0)
    const [stateConfirm, setStateConfirm] = useState(false)

    

    const [loading, setLoading] = useState(true) //true

    const { data: session, status } = useSession()
    const router = useRouter()
    const userId  = session?.user.id;

    useEffect(() => {
        if(bookIdSelect === tradingBook[0]?.Book_Trade_req_book_idToBook.id){
            setBookInfo(tradingBook[0])
        }else {
            if(tradeReQuest.length !== 0 && bookIdSelect !== undefined){
            setBookInfo(tradeReQuest.find((item: any) => item.req_book_id === bookIdSelect))
            }
        }
        setLoading(false)
    }, [tradeReQuest,bookIdSelect,stateOpen,tradingBook])

console.log(bookIdSelect,'----------+++---',bookInfo,'++++++',tradingBook[0]?.id,'------------bookInfo',tradingBook[0],tradeReQuest.find((item: any) => item.req_book_id === bookIdSelect))
    
    const handleClosePopUp = () => {
        setStateOpen(false)
        setBookSelectTrade(undefined)
        setBookInfo(undefined)
    }

    const handleTradeAccept = async () => {
        setLoading(true)
        try {
            const response = await axios.put(`/api/trade/request/accept/`,{
                id:bookInfo?.id
            });
            console.log(response.data)
            setLoadcompo(true)
            setLoading(false)
            setStateOpen(false)
        } catch (error) {
            console.error('Error:', error);
            setLoading(false)
        }
    }


    const handleTradeCancel = async () => {
        setLoading(true)
        try {
            const response = await axios.put(`/api/trade/request/decline/`,{
                id:bookInfo?.id
            });
            console.log(response.data)
            setLoadcompo(true)
            setLoading(false)
            setStateOpen(false)
        } catch (error) {
            console.error('Error:', error);
            setLoading(false)
        }
    }

    // const handleToBookInfo = (BookId: number | null | undefined) => {
    //     if (BookId !== null && BookId !== undefined) {

    //         router.push(`/bookinfo/${BookId.toString()}`)
    //     }
    // }


    return (
    <>
                    
        
        <div
        style={classAddBook} 
        className="fixed flex top-0 left-0 z-50 h-screen w-screen items-center justify-center ">
            
            <div 
            style={{borderRadius: "30px"}}
            className="flex flex-col w-auto h-auto bg-white border border-gray-300 relative min-w-80 min-h-80 mx-20">
                <div 
                className="flex overflow-y-auto css-scrollbar h-full w-auto">
                    <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 rounded-full bg-white w-9 h-9"></div>
                    <Icon 
                    onClick={handleClosePopUp}
                    icon="carbon:close-filled" width="45" height="45"
                    className=' absolute top-0 right-0 translate-x-3 -translate-y-3 text-gray-300 cursor-pointer hover:text-red-500'/>
                    {loading ?<div className="flex justify-center absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
                            <HashLoader
                                className=" duration-300 "
                                color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
                        </div>
                    :<>
                        <div className="flex h-auto w-96 bg-dark1 rounded-l-3xl p-10 flex-col items-center">
                            <div 
                            // onClick={() => handleToBookInfo(bookInfo?.id)}
                            className="flex text-white text-2xl h-auto break-words">{bookInfo?.Book_Trade_req_book_idToBook.title}</div>
                            <img
                                    src={bookInfo?.Book_Trade_req_book_idToBook.picture[pictureShow]}
                                    alt="Book picture"
                                    className='w-40 h-60 object-cover duration-300 rounded-sm shadow-md shrink-0 mt-5 scale-110'
                                />
                            <div className="flex h-auto w-full">
                                <div className="flex mr-2 mt-10 w-auto h-auto gap-2">
                                    {bookInfo?.Book_Trade_req_book_idToBook.picture.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setPictureShow(index)}
                                            className="flex w-14 h-20 cursor-pointer relative"
                                        >
                                            <img src={item} alt={`Book Image ${index + 1}`} className='object-cover w-14 h-20 rounded' />
                                            <div style={pictureShow !== index ? { backgroundColor: "#9393934d" } : {}} className="absolute top-0 left-0 w-14 h-20 duration-300 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className="flex w-auto p-5 pr-10 flex-col">
                            <div className="flex h-10 items-center gap-3 w-full justify-end">
                                <div className="flex">
                                    <img
                                    src={bookInfo?.Book_Trade_req_book_idToBook.User.profile_picture}
                                    alt="Profile picture"
                                    className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300'
                                    />
                                </div>
                                <div className="flex">{bookInfo?.Book_Trade_req_book_idToBook.User.username}</div>
                            </div>
                            <div className="flex text-dark1 font-bold mt-5 w-96 mx-10 text-xl">รายละเอียดหนังสือ :</div>
                            <textarea 
                            readOnly
                            value={bookInfo?.Book_Trade_req_book_idToBook.description}
                            className="flex resize-none pl-20 mt-3 h-28 css-scrollbar"/>
                            <div className="flex text-dark1 font-bold mt-5 w-96 mx-10 text-xl">วิธีการแลกเปลี่ยน :</div>
                            <div className="flex mt2 pl-16">
                                <div className="flex justify-center text-xl">{bookInfo?.pickup_req !== null  && bookInfo?.pickup_req !== undefined && bookInfo?.pickup_req !== '' 
                                &&<>
                                    <div className="flex flex-col w-24 h-28 shadow-xl rounded-2xl bg-white scale-75 relative z-30">
                                        <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-8 text-white">นัดรับ</div>
                                        <Icon icon="tdesign:undertake-delivery" width="50" height="50" 
                                        className='ml-2 mt-1'/>
                                        <Icon icon="mdi:hand-extended-outline" width="50" height="50"
                                        className='scale-x-[-1] absolute top-16 right-2' />
                                    </div>
                                    <div className="flex ml-3 mt-8">{bookInfo?.pickup_req}</div>
                                </>
                                }</div>
                                <div className="flex justify-center text-xl">{bookInfo?.req_address !== null  && bookInfo?.req_address !== undefined && bookInfo?.req_address !== '' 
                                &&
                                <>
                                    <div className="flex flex-col w-24 h-28 shadow-xl rounded-2xl bg-white items-center scale-75 relative z-30">
                                        <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-8 text-white">จัดส่ง</div>
                                        <Icon icon="iconoir:delivery-truck" width="70" height="70" />
                                        <Icon icon="fluent:checkmark-12-filled" width="20" height="20" 
                                        className=' absolute top-14 left-8'/>
                                    </div>
                                    <div className="flex ml-3 mt-8">{bookInfo?.req_address}</div>
                                </>
                                }</div>
                            </div>
                            {bookInfo?.id !== tradingBook[0]?.id &&
                            <div className="flex w-full justify-end gap-3 mt-10">
                                <button 
                                onClick={() => setStateConfirm(true)}
                                className="flex w-24 h-8 bg-red-500 text-white rounded-full items-center justify-center">ปฎิเสธ</button>
                                {tradingBook[0]?.status !== 'trading' &&
                                <button 
                                onClick={handleTradeAccept}
                                className="flex w-24 h-8 bg-dark2 text-white rounded-full items-center justify-center">ยอมรับ</button>}
                            </div>}
                            {bookInfo?.id === tradingBook[0]?.id &&
                            <div className="flex w-full justify-around gap-3 mt-10">
                                <div className="flex gap-8">
                                    <div className="flex items-center mx-5 w-auto">
                                        <Icon icon="skill-icons:instagram" width="32" height="32" />
                                        <div className="flex text-xl ml-3">{bookInfo?.Book_Trade_req_book_idToBook.User.instagram === null ? '-' :bookSelectTrade?.Book_Trade_req_book_idToBook.User.instagram}</div>
                                    </div>
                                    <div className="flex items-center mx-5 w-auto">
                                        <Icon icon="logos:facebook" width="32" height="32" />
                                        <div className="flex text-xl ml-3">{bookInfo?.Book_Trade_req_book_idToBook.User.facebook === null ? '-' :bookSelectTrade?.Book_Trade_req_book_idToBook.User.facebook}</div>
                                    </div>
                                    <div className="flex items-center mx-5 w-auto">
                                        <img
                                        src={`${image}line_icon.jpg`}
                                        className='w-8 h-8 object-cover cursor-pointer bg-dark3 rounded-lg shadow-sm duration-300'
                                        />
                                        <div className="flex text-xl ml-3">{bookInfo?.Book_Trade_req_book_idToBook.User.line === null ? '-' :bookSelectTrade?.Book_Trade_req_book_idToBook.User.line}</div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className={stateConfirm ?"flex flex-col bg-white absolute bottom-0 right-0 w-60 h-40 rounded-xl border-2 border-dark1 justify-center visible duration-300 scale-100"
                        :"flex flex-col bg-white absolute bottom-0 right-0 w-60 h-40 rounded-xl border-2 border-dark1 justify-center scale-0 invisible duration-300 translate-x-28 translate-y-20"}>
                            <div className="flex justify-center text-dark1 font-bold">ต้องการปฏิเสธการเทรด<br/>กับหนังสือเล่มนี้ใช่หรือไม่</div>
                            <div className="flex w-full justify-center gap-3 mt-10">
                                <button 
                                onClick={() => setStateConfirm(false)}
                                className="flex w-24 h-8 bg-white text-red-500 border-2 border-red-500 rounded-full items-center justify-center">ยกเลิก</button>
                                <button 
                                onClick={handleTradeCancel}
                                className="flex w-24 h-8 bg-red-500 text-white rounded-full items-center justify-center">ยืนยัน</button>
                            </div>
                        </div>
                    </>}
                </div>
            </div>






        </div>
    </>
    )
}


export default ManageRequest