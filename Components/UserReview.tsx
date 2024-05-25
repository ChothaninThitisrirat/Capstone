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

interface UserReviewProp {
    classReviewUser: any;
    setPopUpReviewUser: (style: any) => void;
    tradeId: number;
}
interface BookInfo {
    id:number;
    title:string;
    picture: string;
    User: {
        id:number;
        username:string;
        profile_picture:string;
    }
}
const UserReview: React.FC<UserReviewProp> = ({classReviewUser, setPopUpReviewUser, tradeId}) =>{

    const [topicReview, setTopicReview] = useState('')
    const [detailReview, setDetailReview] = useState('')    
    const [ scoreComment, setScoreComment ] = useState(0)
    const [userIdTrade, setUserIdTrade] = useState<number | null>(null)
    const [bookIdTrade, setBookIdTrade] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)// true
    const [loadingRe, setLoadingRe] = useState(false)
    const [bookInfo, setBookInfo] = useState<BookInfo>()
    const { data: session, status } = useSession()
    const userId  = session?.user.id;





    useEffect(() => {
        const fetchData = async () => {
            if (tradeId) {
                try {
                    console.log('tradeId---',tradeId);
                    const response = await axios.get(`/api/trade/myrequest/${userId}/book/${tradeId}`);
                    console.log(userId,'response.data',response.data)
                    setUserIdTrade(response.data.mybookrequest.Book_Trade_book_idToBook.User.id)
                    setBookIdTrade(response.data.mybookrequest.Book_Trade_book_idToBook.id)
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
        
    }, [tradeId]);


    useEffect(() => {
        const fetchData = async () => {
            try{
                axios.get(`/api/trade/ownerinfo/${bookIdTrade}`).then((res) => {
                    setBookInfo(res.data.ownerbookinfo)
                    setLoading(false)
                })
            }catch(err){
                console.log(err)
            }
        }
        if(bookIdTrade !== null){
            fetchData()
        }

    }, [bookIdTrade])
console.log(userId,'bookInfo',bookInfo)

    const handleReviewUser = async (e: any) => {
        e.preventDefault();
        setLoadingRe(true)
        try{
            const response = await axios.post(`/api/review/user`,{
                user_id:userIdTrade,
                reviewer_id:userId,
                title: topicReview,
                describe: detailReview,
                score: scoreComment,
            })
            if(response.status === 201){
                setPopUpReviewUser(false)
                setLoadingRe(false)
                setTopicReview('')
                setDetailReview('')
                setScoreComment(0)
            }
        }catch(err){
            console.log(err)
        }
    }






    return (
    <>
                    
        
        <div
        style={classReviewUser} 
        className="fixed flex top-0 left-0 z-50 h-screen w-screen items-center justify-center ">
            
            <div 
            style={{borderRadius: "30px"}}
            className="flex flex-col w-auto h-auto bg-white border border-gray-300 items-center relative px-14 pb-10 pt-10 min-w-80 min-h-80">
                <div 
                style={{maxHeight: "700px"}}
                className="flex flex-col items-center overflow-y-auto css-scrollbar">
                    <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 rounded-full bg-white w-9 h-9"></div>
                    <Icon 
                    onClick={() => setPopUpReviewUser(false)}
                    icon="carbon:close-filled" width="45" height="45"
                    className=' absolute top-0 right-0 translate-x-3 -translate-y-3 text-gray-300 cursor-pointer hover:text-red-500'/>
                    {loading ?<div className="flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <HashLoader
                                className=" duration-300 "
                                color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
                        </div>
                    :<div 
                    style={{width:'800px'}}
                    className='flex flex-col'>
                        <div className="flex mx-auto text-4xl font-bold text-dark1">User Review</div>
                        <div className="flex">
                            <div className="flex flex-col items-center">
                                <div className="flex text-3xl font bold w-72 justify-center h-auto break-words mt-5 mb-5">
                                    {bookInfo?.title}
                                </div>
                                <div className="flex">
                                    <img
                                    src={bookInfo?.picture}
                                    alt="Profile picture"
                                    className=' w-56 h-80 object-cover cursor-pointer bg-white'
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
                            </div>
                            <form 
                            onSubmit={(e)=>handleReviewUser(e)}
                            className="flex flex-col mt-20 w-full">
                                <div 
                                className="flex relative h-10 px-8 items-center mt-2 w-full">
                                    <Icon
                                        icon="carbon:review"
                                        width="40"
                                        height="40"
                                        style={{ color: topicReview? "#333":"#A7A7A7" }}
                                        className=" absolute bottom-2 left-10"
                                    />
                                    <input
                                        id="topicReview"
                                        type="text"
                                        value={topicReview}
                                        placeholder="Review Topic"
                                        onChange={(e) => setTopicReview(e.target.value)}
                                        required
                                        className="w-full border-b border-gray-400 pl-14 py-2"
                                    />
                                </div>
                                <div className="flex relative w-full px-8 mb-3 mt-5">
                                    <Icon
                                        icon="material-symbols:rate-review-outline"
                                        width="40"
                                        height="40"
                                        
                                        style={{ color: detailReview?"#333":"#A7A7A7" }}
                                        className=" absolute top-7 left-7"
                                    />
                                    <textarea
                                        id="book-detail"
                                        value={detailReview}
                                        placeholder="Review Detail"
                                        onChange={(e) => setDetailReview(e.target.value)}
                                        required
                                        className="book-detail w-full border-l-2 border-gray-300 ml-10 pl-3 pt-1 pb2 mt-6 resize-none rounded-sm h-32 css-scrollbar"
                                    />
                                </div>
                                <div className="flex mt-5 mx-auto">
                                        <Icon icon="material-symbols:star" width="40" height="40" 
                                        onClick={()=>setScoreComment(1)}
                                        className={(scoreComment >= 1 ?'text-yellow-300' :'text-gray-300')+' '+' cursor-pointer duration-100'}/>
                                        <Icon icon="material-symbols:star" width="40" height="40" 
                                        onClick={()=>setScoreComment(2)}
                                        className={(scoreComment >= 2 ?'text-yellow-300' :'text-gray-300')+' '+' cursor-pointer duration-100'}/>
                                        <Icon icon="material-symbols:star" width="40" height="40" 
                                        onClick={()=>setScoreComment(3)}
                                        className={(scoreComment >= 3 ?'text-yellow-300' :'text-gray-300')+' '+' cursor-pointer duration-100'}/>
                                        <Icon icon="material-symbols:star" width="40" height="40" 
                                        onClick={()=>setScoreComment(4)}
                                        className={(scoreComment >= 4 ?'text-yellow-300' :'text-gray-300')+' '+' cursor-pointer duration-100'}/>
                                        <Icon icon="material-symbols:star" width="40" height="40" 
                                        onClick={()=>setScoreComment(5)}
                                        className={(scoreComment >= 5 ?'text-yellow-300' :'text-gray-300')+' '+' cursor-pointer duration-100'}/>
                                </div>
                                <button
                                type='submit'
                                className={topicReview && detailReview && scoreComment !== 0 
                                    ?"flex mx-auto mt-14 w-40 bg-dark2 text-white h-10 rounded-full items-center justify-center"
                                    :"flex mx-auto mt-14 w-40 bg-gray-400 text-white h-10 rounded-full items-center justify-center"}>
                                    รีวิวผู้ใช้
                                    {loadingRe && <HashLoader
                                        className="ml-2"
                                        color='#fff' loading={loadingRe} size={20} aria-label="Loading Spinner" data-testid="loader"/>}
                                </button>
                            </form>
                        </div>
                    </div>}
                </div>
            </div>


        </div>
    </>
    )
}

export default UserReview