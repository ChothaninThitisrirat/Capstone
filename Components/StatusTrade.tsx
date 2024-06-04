'use client'

import {useState,useEffect} from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';     
import { useSession } from 'next-auth/react'
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import Loadable from 'next/dist/shared/lib/loadable.shared-runtime';
import { useRouter } from 'next/navigation'
import { image } from '@/utils/supabase';

interface PostNewBookProp {
    setStateOpen: (style: boolean) => void;
    classAddBook: any;
    tradeId: number;
    setLoadcompo: (state: boolean) => void;
    setPopUpReviewUser: (state: boolean) => void;
    reloadInfo:boolean;
}
interface BookShow {
    User: {
        facebook: string | null;
        id: number;
        instagram: string | null;
        line: string | null;
        profile_picture: string;
        username: string;
    };
    address:string;
    id: number;
    picture: string[];
    title: string;
}
interface TradeShow {
    Book_Trade_book_idToBook: any;
    Book_Trade_req_book_idToBook: any;
    id: number;
    pickup_req: string; 
    req_address: string;
    status: string;
}
const Status: React.FC<PostNewBookProp> = ({setStateOpen, classAddBook, tradeId, setLoadcompo, setPopUpReviewUser, reloadInfo}) =>{
    const [tradeInfo, setTradeInfo] = useState<TradeShow>()
    const [loadTrade, setLoadTrade] = useState(false)
    const [bookSelectTrade, setBookSelectTrade] = useState<BookShow>()
    const [bookInfo, setBookInfo] = useState<BookShow>()
    

    const [loading, setLoading] = useState(true)

    const [popUptradeSuccess, setPopUptradeSuccess] = useState(false)
    
    const [classPopUp, setClassPopUp] = useState({
        transform:'translateY(100%)',
        visibility: "hidden",
        transitionDuration: '0.3s'
    })


    const [pickOrSend, setPickOrSend] = useState(1)
    const [placeToPic, setPlaceToPic] = useState('')
    const { data: session, status } = useSession()
    const userId  = session?.user.id;

    useEffect(() => {
        const fetchData = async () => {
            if (tradeId) {
                try {
                    console.log('tradeId---',tradeId);
                    const response = await axios.get(`/api/trade/myrequest/${userId}/book/${tradeId}`);
                    
                    setTradeInfo(response.data.mybookrequest)
                    setBookSelectTrade(response.data.mybookrequest.Book_Trade_book_idToBook)
                    setBookInfo(response.data.mybookrequest.Book_Trade_req_book_idToBook)
                    if(response.data.mybookrequest.pickup_req !== null){
                        setPickOrSend(1)
                        setPlaceToPic(response.data.mybookrequest.pickup_req)
                    }else if(response.data.mybookrequest.req_address !== null){
                        setPickOrSend(2)
                        setPlaceToPic(response.data.mybookrequest.req_address)
                    }

                    setLoading(false)
                } catch (error) {
                        setLoading(false)
                    console.error('Error fetching address data:', error);
                }
            }
        };
        if(tradeId){
            fetchData();
        }
        
    }, [tradeId,reloadInfo]);

    console.log('popUptradeSuccess---',popUptradeSuccess);

    const handleTradeSuccess = async () => {
        try {
            setLoadTrade(true)
            await axios.post(`/api/trade/request/return/email`,{
                id:tradeId
            });
            const response = await axios.put(`/api/trade/request/return`,{id:tradeId});
            console.log('response---',response);
            setTimeout(() => {
                setPopUptradeSuccess(false)
                setStateOpen(false)
                setLoadcompo(true)
                setLoadTrade(false)
                setPopUpReviewUser(true)
            }, 1500);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    
    const handleClosePopUp = () => {
        setStateOpen(false)
        setBookSelectTrade(undefined)
        setBookInfo(undefined)
    }
    return (
    <>
                    
        
        <div
        style={classAddBook} 
        className="fixed flex top-0 left-0 z-50 h-screen w-screen items-center justify-center ">
            
            <div 
            style={{borderRadius: "30px"}}
            className="flex flex-col h-auto bg-white border border-gray-300 items-center relative px-3 sm:px-14 sm:pb-14 sm:pt-10 min-w-80 min-h-80 ">
                <div 
                style={{maxHeight: "700px"}}
                className="flex flex-col items-center overflow-y-auto css-scrollbar h-[600px] sm:h-auto py-5">
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
                    
                        <div className="text-3xl sm:text-4xl font-bold w-full flex items-center justify-center text-dark1 mt-5">
                            {tradeInfo?.status === 'pending' && 'Pending'}
                            {tradeInfo?.status === 'trading' && 'Trading'}
                            {tradeInfo?.status === 'traded' && 'Traded'}
                            {tradeInfo?.status === 'decline' && 'Decline'}
                        </div>
                        <div className="flex mt-5 sm:text-xl">B-Trade ID #{tradeInfo?.id}</div>



                        <div
                        className="flex justify-center h-auto w-sceen z-30 mt-5 gap-10 flex-col sm:flex-row">
                            <div className="flex flex-col z-30 w-80 items-center ">
                                <div className="flex text-2xl w-72 justify-center h-auto break-words mb-5">
                                    {bookSelectTrade?.title}
                                </div>
                                <div className="flex">
                                    <img
                                    src={bookSelectTrade?.picture[0]}
                                    alt="Profile picture"
                                    className=' w-28 h-40 object-cover cursor-pointer shadow-lg sm:w-56 sm:h-80'
                                    />
                                </div>
                                
                                <div className="flex items-center gap-3 mx-auto mt-5">
                                    <div className="flex ">Owner</div>
                                    <div className="flex">
                                        <img
                                        src={bookSelectTrade?.User.profile_picture}
                                        alt="Profile picture"
                                        className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300'
                                        />
                                    </div>
                                    <div className="flex ">{bookSelectTrade?.User.username}</div>
                                </div>
                                {tradeInfo?.status === 'trading'&&
                                <div className="flex relative w-80 mt-10">
                                    <div className="flex">
                                        <Icon
                                            icon="mdi:address-marker-outline"
                                            width="40"
                                            height="40"
                                            className="absolute top-0 left-3 scale-75 sm:scale-100"
                                        />
                                    </div>
                                    <div className="flex ml-14 sm:ml-16 mt-2 sm:text-lg w-80 break-word h-auto mr-10 mb-5 break-words sm:mb-10">
                                        {pickOrSend === 1 ? placeToPic:bookSelectTrade?.address}
                                    </div>
                                </div>}
                                {tradeInfo?.status === 'trading' && 
                                    <>
                                        <div className="flex flex-col gap-2 sm:gap-8">
                                            <div className="flex items-center w-52 scale-90 sm:scale-100">
                                                <Icon icon="skill-icons:instagram" width="32" height="32" />
                                                <div className="flex text-xl ml-3">{bookSelectTrade?.User.instagram === null ? '-' :bookSelectTrade?.User.instagram}</div>
                                            </div>
                                            <div className="flex items-center w-52 scale-90 sm:scale-100">
                                                <Icon icon="logos:facebook" width="32" height="32" />
                                                <div className="flex text-xl ml-3">{bookSelectTrade?.User.facebook === null ? '-' :bookSelectTrade?.User.facebook}</div>
                                            </div>
                                            <div className="flex items-center w-52 scale-90 sm:scale-100">
                                                <img
                                                src={`${image}line_icon.jpg`}
                                                className='w-8 h-8 object-cover cursor-pointer bg-dark3 rounded-lg shadow-sm duration-300'
                                                />
                                                <div className="flex text-xl ml-3">{bookSelectTrade?.User.line === null ? '-' :bookSelectTrade?.User.line}</div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>

                            <div className="flex flex-col z-30 scale-75 items-center sm:scale-100 sm:gap-10 sm:mt-28">
                                <Icon icon="uil:exchange" width="80" height="80" 
                                className='mx-auto  z-30'/>
                                {pickOrSend === 1
                                ?<div className="flex flex-col w-28 h-32 shadow-xl rounded-2xl bg-white a scale-90 ">
                                    <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-10 text-white">นัดรับ</div>
                                    <Icon icon="tdesign:undertake-delivery" width="50" height="50" 
                                    className='ml-2 mt-1'/>
                                    <Icon icon="mdi:hand-extended-outline" width="50" height="50"
                                    className='scale-x-[-1] absolute top-16 right-2' />
                                </div>
                                :<div className="flex flex-col w-28 h-32 shadow-xl rounded-2xl bg-white items-center relative  scale-90">
                                    <div className="flex items-center justify-center rounded-t-2xl bg-dark1 w-full h-10 text-white">จัดส่ง</div>
                                    <Icon icon="iconoir:delivery-truck" width="70" height="70" />
                                    <Icon icon="fluent:checkmark-12-filled" width="20" height="20" 
                                    className=' absolute top-16 left-10'/>
                                </div>}
                            </div>

                            <div className="flex flex-col z-30 w-80 items-center">
                            <div className="flex text-2xl w-72 justify-center h-auto break-words mb-5">
                                    {bookInfo?.title}
                                </div>
                                <div className="flex">
                                    <img
                                    src={bookInfo?.picture[0]}
                                    alt="Profile picture"
                                    className=' w-28 h-40 object-cover cursor-pointer shadow-lg sm:w-56 sm:h-80'
                                    />
                                </div>
                                
                                <div className="flex items-center gap-3 mx-auto mt-5">
                                    <div className="flex ">Owner</div>
                                    <div className="flex">
                                        <img
                                        src={bookInfo?.User.profile_picture}
                                        alt="Profile picture"
                                        className=' w-10 h-10 object-cover cursor-pointer bg-dark3 rounded-full shadow-sm duration-300'
                                        />
                                    </div>
                                    <div className="flex ">{bookInfo?.User.username}</div>
                                </div>
                                {tradeInfo?.status !== 'traded' &&
                                <div className="flex relative w-80 mt-10">
                                    <div className="flex">
                                        <Icon
                                            icon="mdi:address-marker-outline"
                                            width="40"
                                            height="40"
                                            className="absolute top-0 left-3 scale-75 sm:scale-100"
                                        />
                                    </div>
                                    <div className="flex ml-14 sm:ml-16 mt-2 sm:text-lg w-80 break-word h-auto mr-10 mb-5 break-words sm:mb-10">
                                        {pickOrSend === 1 ? placeToPic:tradeInfo?.req_address}
                                    </div>
                                </div>}
                                {tradeInfo?.status === 'trading' && 
                                    <>
                                        <div className="flex flex-col gap-2 sm:gap-8">
                                            <div className="flex items-center w-52 scale-90 sm:scale-100">
                                                <Icon icon="skill-icons:instagram" width="32" height="32" />
                                                <div className="flex text-xl ml-3">{bookInfo?.User.instagram === null ? '-' :bookInfo?.User.instagram}</div>
                                            </div>
                                            <div className="flex items-center w-52 scale-90 sm:scale-100">
                                                <Icon icon="logos:facebook" width="32" height="32" />
                                                <div className="flex text-xl ml-3">{bookInfo?.User.facebook === null ? '-' :bookInfo?.User.facebook}</div>
                                            </div>
                                            <div className="flex items-center w-52 scale-90 sm:scale-100">
                                                <img
                                                src={`${image}line_icon.jpg`}
                                                className='w-8 h-8 object-cover cursor-pointer bg-dark3 rounded-lg shadow-sm duration-300'
                                                />
                                                <div className="flex text-xl ml-3">{bookInfo?.User.line === null ? '-' :bookInfo?.User.line}</div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        {tradeInfo?.status === 'trading' && 
                        <>
                            <div 
                            onClick={() => popUptradeSuccess ? null : setPopUptradeSuccess(true)}
                            className={popUptradeSuccess?" rounded-3xl flex mt-14 mb-10 shadow-xl border-2 border-dark2 bg-white w-auto h-auto justify-center items-center shrink-0 px-5 py-5 sm:px-20 sm:py-10 duration-1000"
                                :"flex mt-14 mb-10 bg-dark2 text-white w-36 h-8 sm:w-48 sm:h-12 rounded-3xl justify-center items-center cursor-pointer shrink-0  duration-1000 "}>
                                    {popUptradeSuccess? 
                                    <div 
                                    className='flex flex-col items-center'>
                                        <Icon icon="uil:exchange" width="80" height="80" 
                                        className='mx-auto  z-30 scale-75 sm:scale-100'/>
                                        <div className="flex text-xl sm:text-4xl mt-5">ดำเนินการแลกเปลี่ยนเสร็จสิ้น</div>
                                        <div className="flex sm:text-2xl mt-10">ได้รับหนังสือของคุณคืนเรียบร้อยแล้วใช่ไหม?</div>
                                        <div className="flex mt-10 sm:gap-20 ">
                                            <button 
                                            onClick={() => setPopUptradeSuccess(false)}
                                            className='w-32 h-10 border-4 border-dark2 rounded-full text-lg flex justify-center items-center hover:scale-105 duration-300 scale-75 sm:scale-100'>ยกเลิก</button>
                                            <button 
                                            onClick={handleTradeSuccess}
                                            className='w-32 h-10 bg-dark2 rounded-full text-lg flex justify-center items-center text-white hover:scale-105 duration-300 scale-75 sm:scale-100'>
                                                <div className="flex duration-300">ยืนยัน</div>    
                                                {loadTrade && <HashLoader
                                                className="ml-2 scale-75 sm:scale-100"
                                                color='#fff' loading={loadTrade} size={20} aria-label="Loading Spinner" data-testid="loader"/>}
                                            </button>
                                        </div>
                                    </div>
                                    :'แลกเปลี่ยนสำเร็จ'}
                                
                            </div>
                        </>
                        }
                        
                        
                    </>}
                </div>
            </div>


        </div>
    </>
    )
}

export default Status