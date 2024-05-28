'use client'

import React,{ useState, useEffect, useRef, use, cache }  from 'react'
import { useParams, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SlideBookMini from '@/Components/SlideBookMini';
import TradeProcess from './TradeProcess1'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import HashLoader from "react-spinners/HashLoader";
import { on } from 'events';
import SlideBookBig from '@/Components/SlideBookBig';


interface BookInfoProps {
    setTrade: (state: boolean) => void;
    bookInfo: any
}
interface BookItem {
    id: number;
    title: string;
    picture: string[];
}
interface BookInfoShow {
    bookinfo: {
        id: any;
        title: string; //
        description: string; //
        picture: string[]; //
        pickup: string; //
        address: string; //
        postdate: Date; //
        status: string; //
    };
    count_review_book_agg: {
        book_id: number;//
    };
    avg_review_book_agg:number | null;
    category: string[];
    user: {
        id: number; 
        username: string;
        profile_picture: string;
    };
    count_user_book: {
        user_id: number;
    };
    avg_user_score: number | null;
    count_user_review: {
        user_id: number;//
    };
    review_book: any[];
    otherbook: any[];
}
interface ReViewShow{
    title: string;
    describe: string;
    score: number;
    User: any;
}
interface Category {
    id: string | number | null;
    name: string;
    defaultClass: boolean;
    color: string;
}
interface Books{
    id: number;
    title: string;
  }
const BookInfo: React.FC<BookInfoProps> = ({ setTrade, bookInfo }) => {
    const [stateComment, setStateComment] = useState(false)
    const [topicReview, setTopicReview] = useState('')
    const [detailReview, setDetailReview] = useState('')
    const [reviewComment, setReviewComment] = useState(0)
    const [pictureShow, setPictureShow] = useState(0)
    const [datePost, setDatePost] = useState('')
    const [ avgScoreBook, setAvgScoreBook ] = useState(0)
    const [ avgScoreUser, setAvgScoreUser ] = useState(0)
    const [ scoreComment, setScoreComment ] = useState(0)
    const [ stateWishlist, setStateWishlist ] = useState(false)

    const [categoryShow, setCategoryShow] = useState<Category[]>([])
    const [classCategory, setClassCategory] = useState("flex items-center justify-center rounded-lg w-auto text-sm py-0.5 px-3 flex-grow-4 duration-1000")


    const [moreFromUserData, setMoreFromUserData] = useState<BookItem[]>([]);
    const [ reViewShow, setReViewShow ] = useState<ReViewShow[]>([]);

    const [ bookInfoShow, setBookInfoShow ] = useState<BookInfoShow>();
    const [ state1, setState1 ] = useState(false)
    const param = useParams();

    const categories = ['นวนิยาย', 'สยองขวัญ', 'การ์ตูน', 'โรแมนติก', 'วิทยาศาสตร์', 'การเงิน - ลงทุน', 'การศึกษา', 'ท่องเที่ยว', 'พัฒนาตนเอง', 'สุขภาพ'];
    const [allrecommend, setAllrecommend] = useState<Books[]>([]);

    const thaiMonths = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
    ];

    const [category, setCategory] = useState<Category[]>([{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-novel to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-horror1 to-horror2 text-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-cartoon to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-romantic to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-science to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-business to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-education to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-travel to-white"
    },{
        id:null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-develop to-white"
    },{
        id: null,
        name: "",
        defaultClass: true,
        color: "bg-gradient-to-tr from-health to-white"
    }])

    const router = useRouter();
    const { data: session, status } = useSession()
    const userId: number | undefined = session?.user.id

    useEffect(() => {
        if (bookInfo) {
            setBookInfoShow(bookInfo);
        }
    }
    , [bookInfo]);


    useEffect(() => {
        const datetimeString = bookInfoShow?.bookinfo?.postdate;
        const datetimeObject = datetimeString ? new Date(datetimeString) : null;
        const avgReviewScore = bookInfoShow?.avg_review_book_agg;
        if (avgReviewScore !== null && avgReviewScore !== undefined) {
            setAvgScoreBook(avgReviewScore);
        } else {
            setAvgScoreBook(0);
        }
        const avgReviewScoreUser = bookInfoShow?.avg_user_score;
        if (avgReviewScoreUser !== null && avgReviewScoreUser !== undefined) {
            setAvgScoreUser(avgReviewScoreUser);
        } else {
            setAvgScoreUser(0);
        }
        if (bookInfoShow?.otherbook !== undefined){
            setMoreFromUserData(bookInfoShow?.otherbook);
        }
        if (bookInfoShow?.review_book !== undefined){
            setReViewShow(bookInfoShow?.review_book.reverse());
        }
        const matchedCategories = category.filter(category => 
            bookInfoShow?.category.includes(category.name)
        );
        setCategoryShow(matchedCategories);

        if (datetimeObject) {
            const day = datetimeObject.getDate();
            const month = datetimeObject.getMonth();
            const year = datetimeObject.getFullYear();
            const formattedDate = `${day} ${thaiMonths[month]} ${year + 543}`;
            setDatePost(formattedDate);
        }
        setState1(false)
        const fetchData = async () => {
            try{
                const response = await axios.get(`/api/wishlist/${session?.user.id}`)
                const wishlist = response.data.wishlist as BookItem[]
                if (wishlist.some(item => item.id === bookInfoShow?.bookinfo.id)) {
                    setStateWishlist(true)
                } else {
                    setStateWishlist(false)
                }
            }catch(err){
                console.error(err)
            }
        }
        if (bookInfoShow?.bookinfo.id !== undefined) {
            fetchData()
        }
    }
    , [bookInfoShow, category]);
console.log('datePost',datePost)


    useEffect(() => {
        setState1(false)
        const fetchData = async () => {
            try{
                const response = await axios.get(`/api/wishlist/${session?.user.id}`)
                const wishlist = response.data.wishlist as BookItem[]
                if (wishlist.some(item => item.id === bookInfoShow?.bookinfo.id)) {
                    setStateWishlist(true)
                } else {
                    setStateWishlist(false)
                }
            }catch(err){
                console.error(err)
            }
        }
        if (bookInfoShow?.bookinfo.id !== undefined) {
            fetchData()
        }
    }
    , [state1]);



    const handleComment = async(e:any) => {
        e.preventDefault()

        if (topicReview && detailReview && scoreComment !== 0) {
            try{
                const response = await axios.post(`/api/review/book`, {
                    book_id: bookInfoShow?.bookinfo.id,
                    user_id: session?.user.id,
                    title: topicReview,
                    describe: detailReview,
                    score: scoreComment
                })
                console.log(response.data)
                window.location.reload();
            }catch(err){
                console.error(err)
            }
        }
        setDetailReview('')
        setTopicReview('')
        setScoreComment(0)
        setStateComment(false)
    }

    const handleGoTrade=()=>{
        const fetchData = async (userId:any)=>{
            try{
                const response = await axios.get(`/api/user/${userId}/contact`)
                if(response.data.contact.line === null && response.data.contact.instagram === null && response.data.contact.facebook === null ){
                    router.push('/editprofile')
                    alert('กรุณากรอกข้อมูลการติดต่อก่อนใช้งาน')
                }
            }
            catch(err){
                console.log(err)
            }
        }
        if (userId !== undefined) {
            fetchData(userId)
        }
        setTrade(true)

    }

    const openCommentForm = () => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }else{
            setStateComment(true)
        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ category: Category[] }>('/api/category');
                    const updatedCategories = response.data.category.map((item, index) => ({
                        id: item.id !== null ? item.id.toString() : null,
                        name: item.name,
                        defaultClass: category[index].defaultClass,
                        color:category[index].color 
                    }));
                    setCategory(updatedCategories);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    const handleWishlist = async() => {
        setState1(true)
        if (status === 'unauthenticated') {
            router.push('/login')
        }else{

                try{
                const response = await axios.post(`/api/wishlist`, {
                    book_id: bookInfoShow?.bookinfo.id,
                    user_id: session?.user.id
                })
                console.log(response.data)

                }catch(err){
                    console.error(err)
                }
            
        }
    }

    console.log('send',bookInfo.bookinfo.address,'pickup',bookInfo.bookinfo.postdate);

    const handleToProfile = (User_ID: number | null | undefined) => {
        if (User_ID !== null && User_ID !== undefined) {
          router.push(`/profile/${User_ID.toString()}`);
        } else {
          console.error("User_ID is null or undefined");
        }
      };

      useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(`http://superdoggez.trueddns.com:10612/api/ai/book`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                book_id: parseInt(bookInfoShow?.bookinfo.id),
              })
            });
            
            if (response.ok) {
              const data = await response.json();
      
              const recommendations = categories.map(category => data.recommend[category] || []);
              const allRecommendations = recommendations.flat();
              
              setAllrecommend(allRecommendations);
              console.log(allRecommendations, 'all recommendations');
            } else {
              console.error('Failed to fetch data:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        
        fetchData();
      }, [session]);

      console.log(`${bookInfoShow?.bookinfo.id}`, 'all recommendations');






    return (
        <>
        <style>
            {`
            body {
                overflow-x: hidden;
                background-color: #f9f9f9;
            }
            `}
        </style>
        <Navbar backGroundOn={true}  withTitle={false}/>
        <div
        style={{maxWidth: '1700px'}}
        className="flex w-full h-auto justify-center items-center sm:pt-16 mx-auto pb-40 flex-col padt-0">
            
            <div className="flex mb-36 responsive-bookinfo">
            <div className="flex w-1/2 h-auto justify-end mt-10 sm:mt-14">
                <div className="flex flex-col mr-20 sm:mt-14 w-auto h-auto gap-2">
                {bookInfoShow?.bookinfo?.picture.map((item, index) => (
                    <div 
                    key={index} 
                    onClick={()=>setPictureShow(index)}
                    className="flex w-14 h-20 cursor-pointer relative">
                        <img src={item} alt={`Book Image ${index + 1}`} className='object-cover w-14 h-20 rounded' />
                        <div style={pictureShow !== index ?{backgroundColor:"#9393934d"}:{backgroundColor:""}} className=" absolute top-0 left-0 w-14 h-20 duration-300"></div>
                    </div>
                    ))}
                </div>
                <img
                src={bookInfoShow?.bookinfo.picture[pictureShow]}
                alt="Book picture"
                className='w-40 h-60 sm:w-64 sm:h-96 object-cover bg-slate-300 mr-20 mt-20 sm:scale-125 scale-150 duration-300 rounded shadow-md responsive-bookinfo-img'
                />
            </div>
            <div className="flex flex-col items-start w-10/12 sm:w-1/2 h-auto pt-10">
                <div className="flex justify-end w-full text-sm text-gray-400 sm:pr-40 gap-2">
                <Icon icon="tabler:clock-down" width="18" height="18" />
                {datePost}
                </div>
                
                <div className="flex font-bold text-3xl w-full sm:pl-24 mt-5 ">{bookInfoShow?.bookinfo.title}</div>
                
                <div className="flex w-full sm:pl-28 my-3 h-auto items-start">
                    <div className="flex mr-2 ">
                        <Icon icon="material-symbols:star" width="20" height="20" 
                        className={avgScoreBook >= 1 ?'text-yellow-300' :'text-gray-300'}/>
                        <Icon icon="material-symbols:star" width="20" height="20" 
                        className={avgScoreBook >= 2 ?'text-yellow-300' :'text-gray-300'}/>
                        <Icon icon="material-symbols:star" width="20" height="20" 
                        className={avgScoreBook >= 3 ?'text-yellow-300' :'text-gray-300'}/>
                        <Icon icon="material-symbols:star" width="20" height="20" 
                        className={avgScoreBook >= 4 ?'text-yellow-300' :'text-gray-300'}/>
                        <Icon icon="material-symbols:star" width="20" height="20" 
                        className={avgScoreBook >= 5 ?'text-yellow-300' :'text-gray-300'}/>
                    </div>
                    <div className="flex text-sm">{ avgScoreBook } คะแนน ({bookInfoShow?.count_review_book_agg.book_id} รีวิว)</div>
                    <div className="flex h-auto max-w-80 flex-wrap ml-3 gap-2">
                        {categoryShow.map((cate, index) => (
                            <div key={index} className={classCategory+' '+cate.color}
                            >{cate.name}</div>
                        ))}
                    </div>
                    
                </div>
                
                <textarea
                readOnly
                style={{maxWidth: '550px',backgroundColor: '#f9f9f9'}}
                value={bookInfoShow?.bookinfo.description}
                className="break-words w-full h-40 sm:ml-24 overflow-auto css-scrollbar mt-4 pr-20 resize-none"/>
                
                <div className="flex w-full sm:pl-24 mt-8">
                {bookInfoShow?.user.id == session?.user.id ?
                <button
                className='flex bg-gray-400 text-white w-40 h-10 items-center justify-center rounded-xl shadow-md duration-100'>
                    ส่งคำขอแลกหนังสือ
                </button>
                :
                <button 
                onClick={handleGoTrade}
                
                className='flex bg-dark1 text-white w-40 h-10 items-center justify-center rounded-xl shadow-md duration-100'>
                    ส่งคำขอแลกหนังสือ
                </button>}
                <div 
                onClick={handleWishlist}
                className="flex cursor-pointer ml-4 underline text-sm h-10 items-center">{stateWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }</div>
                </div>
                {bookInfoShow?.bookinfo.status === 'trading' &&<div className="flex w-96 ml-24 text-sm mt-2 pl-3 text-red-500">*หนังสือกำลังถูกเทรดอยู่ในขณะนี้</div>}
                
                <div className="flex w-full sm:w-96 sm:ml-24 text-xl mt-10 pl-5 border-b-2 border-gray-300 pb-2">วิธีการแลกเปลี่ยน</div>
                
                <div className="flex w-full sm:pl-24 gap-3 mt-5 ml-5">
                {(bookInfo.bookinfo.pickup !== null && bookInfo.bookinfo.pickup !== undefined && bookInfo.bookinfo.pickup !== '') ?
                <div
                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} 
                className="flex justify-center items-center w-20 h-10 rounded-full shadow-xl bg-white">นัดรับ</div>
                :<div className="flex justify-center items-center w-20 h-10 rounded-full bg-gray-300 text-white">นัดรับ</div>}
                {(bookInfo.bookinfo.address !== null && bookInfo.bookinfo.address !== undefined && bookInfo.bookinfo.address !== '') ?<div 
                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} 
                className="flex justify-center items-center w-20 h-10 rounded-full shadow-xl bg-white">จัดส่ง</div> 
                :
                <div className="flex justify-center items-center w-20 h-10 rounded-full bg-gray-300 text-white">จัดส่ง</div>}
                </div>
            </div>
            
            </div>


        <div 
        style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} 
        className="flex w-10/12 sm:w-8/12 h-auto mx-auto mb-32 rounded items-center bg-white justify-around responsive-userCard">
            <div className="flex h-32 items-center border-r border-gray-300 ml-10 cursor-pointer my-5 pb-3 responsive-border-line">
                <div className="flex w-20 h-20 rounded-full bg-black">
                    <img
                    src={bookInfoShow?.user.profile_picture}
                    alt="Profile picture"
                    className="w-20 h-20 rounded-full object-cover"
                    />
                </div>
                <div className="flex ml-5 flex-col ">
                    <div 
                    onClick={() => handleToProfile(bookInfoShow?.user.id)}
                    className="flex text-gray-600 text-lg underline ml-5 w-44">
                    {bookInfoShow?.user.username}
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-around my-5">
                <div className="flex flex-col items-center gap-2 justify-center">
                    <div className="flex text-gray-600">คะแนนผู้ใช้</div>
                    <div className="flex mr-2 ">
                            <Icon icon="material-symbols:star" width="20" height="20" 
                            className={avgScoreUser >= 1 ?'text-yellow-300' :'text-gray-300'}/>
                            <Icon icon="material-symbols:star" width="20" height="20" 
                            className={avgScoreUser >= 2 ?'text-yellow-300' :'text-gray-300'}/>
                            <Icon icon="material-symbols:star" width="20" height="20" 
                            className={avgScoreUser >= 3 ?'text-yellow-300' :'text-gray-300'}/>
                            <Icon icon="material-symbols:star" width="20" height="20" 
                            className={avgScoreUser >= 4 ?'text-yellow-300' :'text-gray-300'}/>
                            <Icon icon="material-symbols:star" width="20" height="20" 
                            className={avgScoreUser >= 5 ?'text-yellow-300' :'text-gray-300'}/>
                    </div>
                    <div className="flex text-xs text-gray-500">{ avgScoreUser } คะแนน ( {bookInfoShow?.count_user_review.user_id} รีวิว )</div>
                </div>
                <div className="flex flex-col items-center gap-2 justify-center">
                    <div className="flex text-gray-600">รายการหนังสือทั้งหมด</div>
                    <div className="flex text-gray-600">{bookInfoShow?.count_user_book.user_id}</div>
                    <div className="flex text-xs text-gray-500">เล่ม</div>
                </div>
            </div>
        </div>

        <div className="flex w-11/12 mx-auto sm:mx-0 sm:px-36 mb-10 sm:w-full justify-between relative sm:pr-52 h-auto">
            <div className="flex text-2xl sm:text-4xl font-bold">Review The Book</div>
            {stateComment ?
            <button onClick={(e) => handleComment(e)}
            className={topicReview && detailReview && scoreComment !== 0
            ?"flex bg-dark2 text-white w-44 h-10 justify-start items-center rounded-full text-lg z-20 duration-300 pl-4 relative scale-75 sm:scale-100"
            :"flex bg-gray-300 text-white w-44 h-10 justify-start items-center rounded-full text-lg z-20 duration-300 pl-4 relative scale-75 sm:scale-100"}>เพิ่มความคิดเห็น
            
            <Icon 
            className='ml-2 text-white cursor-pointer shrink-0 absolute right-2 hover:scale-105'
            icon={topicReview && detailReview && scoreComment !== 0 ?
            "fluent:checkmark-12-filled":"mingcute:close-fill"} width="25" height="25" />
            </button>
            :
            <button 
            onClick={openCommentForm}
            className={"flex bg-dark2 text-white w-40 h-10 justify-start items-center rounded-full text-lg z-20 duration-300 pl-5 relative scale-75 sm:scale-100"}>เพิ่มความคิดเห็น</button>}
            
            <form 
            style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
            className={stateComment ? "flex flex-col absolute h-72 w-96 sm:right-52 top-5 z-10 bg-white rounded-es-3xl rounded-tl-3xl rounded-ee-3xl duration-500 justify-center items-center "
            :"flex flex-col absolute h-72 w-96 sm:right-52 top-5 z-10 bg-white rounded-es-3xl rounded-tl-3xl rounded-ee-3xl duration-500 justify-center items-center scale-0 translate-x-40 -translate-y-32"
            }>
                <div className="flex relative w-full h-10 px-8 items-center mt-2">
                    <Icon
                        icon="carbon:review"
                        width="25"
                        height="25"
                        style={{ color: topicReview? "#333":"#A7A7A7" }}
                        className=" absolute bottom-2 left-10"
                    />
                    <input
                        id="topicReview"
                        type="text"
                        value={topicReview}
                        placeholder="Review Topic"
                        onChange={(e) => setTopicReview(e.target.value)}
                        maxLength={20}
                        required
                        className="w-full border-b border-gray-400 pl-12 py-2"
                    />
                    <div className=" absolute flex text-gray-400  text-sm right-8">{topicReview.length}/20</div>
                </div>
                <div className="flex relative w-full px-8 mb-3">
                    <Icon
                        icon="material-symbols:rate-review-outline"
                        width="25"
                        height="25"
                        
                        style={{ color: detailReview?"#333":"#A7A7A7" }}
                        className=" absolute top-7 left-7"
                    /><div className="absolute flex text-gray-400 top-14 left-5  text-sm">{detailReview.length}/100</div>
                    <textarea
                        id="book-detail"
                        value={detailReview}
                        placeholder="Review Detail"
                        maxLength={100}
                        onChange={(e) => setDetailReview(e.target.value)}
                        required
                        className="book-detail w-full border-l-2 border-gray-300 ml-10 pl-3 pt-1 pb2 mt-6 resize-none rounded-sm h-32 css-scrollbar"
                    />
                </div>
                <div className="flex mt-2 ">
                        <Icon icon="material-symbols:star" width="30" height="30" 
                        onClick={()=>setScoreComment(1)}
                        className={(scoreComment >= 1 ?'text-yellow-300' :'text-gray-300')+' '+' cursor-pointer duration-100'}/>
                        <Icon icon="material-symbols:star" width="30" height="30" 
                        onClick={()=>setScoreComment(2)}
                        className={(scoreComment >= 2 ?'text-yellow-300' :'text-gray-300')+' '+' cursor-pointer duration-100'}/>
                        <Icon icon="material-symbols:star" width="30" height="30" 
                        onClick={()=>setScoreComment(3)}
                        className={(scoreComment >= 3 ?'text-yellow-300' :'text-gray-300')+' '+' cursor-pointer duration-100'}/>
                        <Icon icon="material-symbols:star" width="30" height="30" 
                        onClick={()=>setScoreComment(4)}
                        className={(scoreComment >= 4 ?'text-yellow-300' :'text-gray-300')+' '+' cursor-pointer duration-100'}/>
                        <Icon icon="material-symbols:star" width="30" height="30" 
                        onClick={()=>setScoreComment(5)}
                        className={(scoreComment >= 5 ?'text-yellow-300' :'text-gray-300')+' '+' cursor-pointer duration-100'}/>
                </div>
            </form>
        </div>
        <div className="flex sm:gap-10 justify-start sm:justify-center items-center px-1 w-full">

            {reviewComment === 0 
            ? <div style={{width: '70px'}}
            className='sm:mr-5 shrink-0'></div>
            :<Icon 
            onClick={() => setReviewComment(prev => prev-1)}
            className='sm:mr-5 text-dark3 cursor-pointer shrink-0 hover:text-dark2 duration-200 scale-75 sm:scale-100'
            icon="icon-park-solid:left-c" width="50" height="50" />}

            {reViewShow?.length === 0
            ?<div
            style={{ WebkitOverflowScrolling: 'touch'}}
            className="flex font-bold text-gray-400 w-96 text-xl justify-center sm:justify-start h-68 sm:pl-20 -translate-y-8 mt-10 shrink-0">Let's start the first review!</div> 
            :<div 
            style={{WebkitOverflowScrolling: 'touch'}}
            className="flex gap-10 justify-start items-center overflow-x-auto h-68 p-2 close-scrollbar w-full sm:w-[1250px]">
            {reViewShow.map((item, index) => (
                <div 
                key={index}
                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',transform: `translateX(${reviewComment * -424}px)`}}
                className="flex w-[280px] sm:w-96 h-48 sm:h-60 rounded-3xl pt-5 px-5  shrink-0 duration-500 flex-col bg-white mr-[109px] sm:mr-0">
                <div className="flex w-full text-xl sm:text-2xl font-bold">{item.title}</div>
                <textarea 
                readOnly
                value={item.describe}
                className="flex w-full h-24 sm:h-36 break-words pt-1 text-gray-500 resize-none css-scrollbar"/>
                <div className="flex text-sm mt-2 pl-3 justify-between">
                    {/* <img
                    src={item.profile_picture}
                    alt="Profile picture"
                    className="w-10 h-10 rounded-full object-cover"
                    /> */}
                    <div className="flex">{item.User.username}</div>
                    <div className="flex mr-2 ">
                        <Icon icon="material-symbols:star" width="20" height="20" 
                        className={item.score >= 1 ?'text-yellow-300' :'text-gray-300'}/>
                        <Icon icon="material-symbols:star" width="20" height="20" 
                        className={item.score >= 2 ?'text-yellow-300' :'text-gray-300'}/>
                        <Icon icon="material-symbols:star" width="20" height="20" 
                        className={item.score >= 3 ?'text-yellow-300' :'text-gray-300'}/>
                        <Icon icon="material-symbols:star" width="20" height="20" 
                        className={item.score >= 4 ?'text-yellow-300' :'text-gray-300'}/>
                        <Icon icon="material-symbols:star" width="20" height="20" 
                        className={item.score >= 5 ?'text-yellow-300' :'text-gray-300'}/>
                    </div>
                </div>
                </div>
            ))}
            </div>}
            
            {reViewShow?.length !== 1 &&(reviewComment < reViewShow.length - 1
            ?<Icon 
            onClick={() => setReviewComment(  prev => prev+1)}
            className='sm:ml-5 text-dark3 cursor-pointer shrink-0 hover:text-dark2 duration-200 scale-75 sm:scale-100'
            icon="icon-park-solid:right-c" width="50" height="50" />
            :<div style={{width: '70px'}}
            className='sm:mr-5 shrink-0'></div>)}
        </div>

        <div className="flex w-11/12 mx-auto sm:mx-0 sm:w-full items-center justify-between sm:pr-32">
            <div className="flex">
                <div
                className="flex text-2xl sm:text-4xl font-bold w-full sm:ml-36 mt-10 mb-10">More From</div>
                <div className="flex text-2xl sm:text-4xl ml-2 mt-10 mb-10">{bookInfoShow?.user.username}</div>
            </div>
            <Link 
            href={`/profile/${bookInfoShow?.user.id}`}
            className="flex bg-dark2 text-white w-28 h-10 justify-center items-center rounded-full text-lg underline scale-75 sm:scale-100">ดูทั้งหมด</Link>
        </div>
            
            <div className="flex w-full">
                <SlideBookMini data={moreFromUserData}/>
            </div>

            <div className='flex justify-center items-center pb-8 w-10/12 mt-12'>
                <SlideBookBig data={allrecommend} Headtitle={"หนังสือที่คล้ายกัน"} Subtitle={"ผู้ใช้ส่วนมากชื่นชอบ"}/>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default BookInfo