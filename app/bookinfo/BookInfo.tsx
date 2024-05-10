'use client'

import React,{ useState, useEffect, useRef }  from 'react'
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SlideBookMini from '@/Components/SlideBookMini';
import TradeProcess from './TradeProcess1'

import HashLoader from "react-spinners/HashLoader";
import { on } from 'events';


interface BookInfoProps {
    setTrade: (state: boolean) => void;
  }
  
  const BookInfo: React.FC<BookInfoProps> = ({ setTrade }) => {
    const [stateComment, setStateComment] = useState(false)
    const [topicReview, setTopicReview] = useState('')
    const [detailReview, setDetailReview] = useState('')
    const [reviewComment, setReviewComment] = useState(0)
    const [moreFrom, setMoreFrom] = useState(0)
    const [bookSlide, setBookSlide] = useState([
        { id: '1', img: 'images/books/book1.jpg' },
        { id: '2', img: 'images/books/book2.jpg' },
        { id: '3', img: 'images/books/book3.jpg' },
        { id: '4', img: 'images/books/book4.jpg' },
        { id: '5', img: 'images/books/book5.jpg' },
        { id: '6', img: 'images/books/book6.jpg' },
        { id: '7', img: 'images/books/book7.jpg' },
        { id: '8', img: 'images/books/book8.jpg' },
        { id: '9', img: 'images/books/book9.jpg' },
        { id: '10', img: 'images/books/book10.jpg' },
        { id: '11', img: 'images/books/book11.jpg' },
        { id: '12', img: 'images/books/book12.jpg' },
        { id: '13', img: 'images/books/book13.jpg' },
        { id: '14', img: 'images/books/book14.jpg' },
        { id: '15', img: 'images/books/book15.jpg' },
        { id: '16', img: 'images/books/book16.jpg' },
        { id: '17', img: 'images/books/book17.jpg' },
        { id: '18', img: 'images/books/book18.jpg' },
        { id: '19', img: 'images/books/book19.jpg' },
        { id: '20', img: 'images/books/book20.jpg' },
        { id: '21', img: 'images/books/book21.jpg' },
        { id: '22', img: 'images/books/book22.jpg' },
        { id: '23', img: 'images/books/book23.jpg' },
        { id: '24', img: 'images/books/book24.jpg' },
        { id: '25', img: 'images/books/book25.jpg' },
        { id: '26', img: 'images/books/book26.jpg' },
        { id: '27', img: 'images/books/book27.jpg' },
        { id: '28', img: 'images/books/book28.jpg' },
        { id: '29', img: 'images/books/book29.jpg' },
        { id: '30', img: 'images/books/book30.jpg' },
        { id: '31', img: 'images/books/book31.jpg' },
        { id: '32', img: 'images/books/book32.jpg' },
        { id: '33', img: 'images/books/book33.jpg' },
        { id: '34', img: 'images/books/book34.jpg' },
        { id: '35', img: 'images/books/book35.jpg' },
        { id: '36', img: 'images/books/book36.jpg' },
        { id: '37', img: 'images/books/book37.jpg' },
        { id: '38', img: 'images/books/book38.jpg' },
        { id: '39', img: 'images/books/book39.jpg' },
        { id: '40', img: 'images/books/book40.jpg' },
        { id: '41', img: 'images/books/book41.jpg' },
        { id: '42', img: 'images/books/book42.jpg' },
        { id: '43', img: 'images/books/book43.jpg' },
        { id: '44', img: 'images/books/book44.jpg' },
        { id: '45', img: 'images/books/book45.jpg' },
        { id: '46', img: 'images/books/book45.jpg' },
    ])


    const [comment, setComment] = useState([{
        id: "1",
        detail: "รีวิวหนังสือ",
        user: "username",
    }, {
        id: "2",
        detail: "รีวิวหนังสือ",
        user: "username",
    }, {
        id: "3",
        detail: "รีวิวหนังสือ",
        user: "username",
    }, {
        id: "4",
        detail: "รีวิวหนังสือ",
        user: "username",
    }, {
        id: "5",
        detail: "รีวิวหนังสือ",
        user: "username",
    }, {
        id: "6",
        detail: "รีวิวหนังสือ",
        user: "username",
    }, {
        id: "7",
        detail: "รีวิวหนังสือ",
        user: "username",
    }, {
        id: "8",
        detail: "รีวิวหนังสือ",
        user: "username",
    }, {
        id: "9",
        detail: "รีวิวหนังสือ",
        user: "username",
    }, {
    id: "10",
    detail: "รีวิวหนังสือ",
    user: "username",
    }, {
    id: "11",
    detail: "รีวิวหนังสือ",
    user: "username",
    }, {
    id: "12",
    detail: "รีวิวหนังสือ",
    user: "username",
    }, {
    id: "13",
    detail: "รีวิวหนังสือ",
    user: "username",
    }, {
    id: "14",
    detail: "รีวิวหนังสือ",
    user: "username",
    }, {
    id: "15",
    detail: "รีวิวหนังสือ",
    user: "username",
    }])



    const handleComment = (e:any) => {
    e.preventDefault()
    if (topicReview && detailReview) {
        alert('Review Success')
        
    }
    setDetailReview('')
    setTopicReview('')
    setStateComment(false)
    }


    const handleGoTrade=()=>{
        setTrade(true)
    }

















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
        <Navbar backGroundOn={true} />
        <div
        style={{maxWidth: '1700px'}}
        className="flex w-full h-auto justify-center pt-16 mx-auto pb-40 flex-col">
            
            <div className="flex mb-36">
            <div className="flex w-1/2 h-auto justify-end">
                <div className="flex flex-col mr-20 mt-24 w-auto h-auto gap-2">
                <div className="flex bg-slate-800 w-14 h-20"></div>
                <div className="flex bg-slate-800 w-14 h-20"></div>
                <div className="flex bg-slate-800 w-14 h-20"></div>
                <div className="flex bg-slate-800 w-14 h-20"></div>
                <div className="flex bg-slate-800 w-14 h-20"></div>
                </div>
                <Image
                src=''
                alt="Book picture"
                className=' w-64 h-96 object-cover bg-slate-300 mr-20 mt-32 scale-125'
                />
            </div>

            <div className="flex flex-col items-start w-1/2 h-auto pt-10">
                <div className="flex justify-end w-full text-sm text-gray-400 pr-40">
                <Icon icon="tabler:clock-down" width="18" height="18" />
                เวลา
                </div>
                
                <div className="flex font-bold text-3xl w-full pl-24 mt-5">Book Name</div>
                
                <div className="flex w-full pl-32 my-3 h-auto">
                <div className="flex">*****</div>
                <div className="flex text-sm">5คะแนน (3 รีวิว)</div>
                <div className="flex "></div>
                </div>
                
                <div 
                style={{maxWidth: '550px'}}
                className="break-words w-full h-40 ml-20 overflow-auto close-scrollbar mt-4 pr-20">รายละเfefwadfghuyaow gfuawgfdawdgfuwagfagfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffอียด</div>
                
                <div className="flex w-full pl-24 mt-3">
                <button 
                onClick={handleGoTrade}
                className='flex bg-dark1 text-white w-40 h-10 items-center justify-center rounded-xl shadow-md duration-100'>ส่งคำขอแลกหนังสือ</button>
                <div className="flex cursor-pointer ml-4 underline text-sm h-10 items-center">Add to Wishlist</div>
                </div>
                
                <div className="flex w-96 ml-24 text-xl mt-10 pl-5 border-b-2 border-gray-300 pb-2">วิธีการแลกเปลี่ยน</div>
                
                <div className="flex w-full pl-24 gap-3 mt-5 ml-5">
                <div
                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} 
                className="flex justify-center items-center w-20 h-10 rounded-full shadow-xl bg-white">นัดรับ</div>
                <div className="flex justify-center items-center w-20 h-10 rounded-full bg-gray-300 text-white">นัดรับ</div>
                <div 
                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} 
                className="flex justify-center items-center w-20 h-10 rounded-full shadow-xl bg-white">จัดส่ง</div>
                <div className="flex justify-center items-center w-20 h-10 rounded-full bg-gray-300 text-white">จัดส่ง</div>
                </div>
            </div>
            
            </div>













        <div 
        style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} 
        className="flex w-8/12 h-40 mx-auto mb-32 rounded items-center bg-white">
            <div className="flex h-32 items-center border-r pr-14 border-gray-300 ml-10 cursor-pointer">
            <div className="flex w-20 h-20 rounded-full bg-black"></div>
            <div className="flex ml-5 flex-col ">
                <div className="flex text-gray-600 text-lg underline ml-5 w-44">
                Username
                </div>
            </div>
            </div>
            <div className="flex w-full justify-around px-20">
            <div className="flex flex-col w-40 items-center gap-2 justify-center">
                <div className="flex text-gray-600">คะแนนผู้ใช้</div>
                <div className="flex">*****</div>
                <div className="flex text-xs text-gray-500">4 คะแนน ( 512 รีวิว )</div>
            </div>
            <div className="flex flex-col w-40 items-center gap-2 justify-center">
                <div className="flex text-gray-600">รายการหนังสือทั้งหมด</div>
                <div className="flex text-gray-600">128</div>
                <div className="flex text-xs text-gray-500">เล่ม</div>
            </div>
            </div>
        </div>




        <div className="flex px-36 mb-10 w-full justify-between relative pr-52">
            <div className="flex text-4xl font-bold">Review The Book</div>
            {stateComment ?
            <button onClick={(e) => handleComment(e)}
            className={topicReview && detailReview
            ?"flex bg-dark2 text-white w-44 h-10 justify-start items-center rounded-full text-lg z-20 duration-300 pl-4 relative "
            :"flex bg-gray-300 text-white w-44 h-10 justify-start items-center rounded-full text-lg z-20 duration-300 pl-4 relative"}>เพิ่มความคิดเห็น
            
            <Icon 
            className='ml-2 text-white cursor-pointer shrink-0 absolute right-2 hover:scale-105'
            icon={topicReview && detailReview ?
            "fluent:checkmark-12-filled":"mingcute:close-fill"} width="25" height="25" />
            </button>
            :
            <button 
            onClick={() => setStateComment(true)}
            className={"flex bg-dark2 text-white w-40 h-10 justify-start items-center rounded-full text-lg z-20 duration-300 pl-5 relative"}>เพิ่มความคิดเห็น</button>}
            
            <form 
            style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
            className={stateComment ? "flex flex-col absolute h-72 w-96 right-52 top-5 z-10 bg-white rounded-es-3xl rounded-tl-3xl rounded-ee-3xl duration-500 justify-center items-center"
            :"flex flex-col absolute h-72 w-96 right-52 top-5 z-10 bg-white rounded-es-3xl rounded-tl-3xl rounded-ee-3xl duration-500 justify-center items-center scale-0 translate-x-40 -translate-y-32"
            }>
            <div className="flex relative w-full h-10 px-8 items-center">
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
                /><div className=" absolute flex text-gray-400  text-sm right-8">{topicReview.length}/20</div>
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
                        placeholder="Book Detail"
                        maxLength={100}
                        onChange={(e) => setDetailReview(e.target.value)}
                        required
                        className="book-detail w-full border-l-2 border-gray-300 ml-10 pl-3 pt-1 pb2 mt-6 resize-none rounded-sm h-32"
                    />
                </div>
            </form>
        </div>
        <div className="flex gap-10 justify-center items-center px-3">

            {reviewComment === 0 
            ? <div style={{width: '70px'}}
            className='mr-5 shrink-0'></div>
            :<Icon 
            onClick={() => setReviewComment(prev => prev-1)}
            className='mr-5 text-dark3 cursor-pointer shrink-0'
            icon="icon-park-solid:left-c" width="50" height="50" />}
            <div 
            style={{width: '1250px', WebkitOverflowScrolling: 'touch'}}
            className="flex gap-10 justify-start items-center overflow-x-auto h-68 p-2 close-scrollbar">
            {comment.map((item, index) => (
                <div 
                key={index}
                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',transform: `translateX(${reviewComment * -424}px)`}}
                className="flex w-96 h-60 rounded-3xl pt-5 px-5  shrink-0 duration-500 flex-col bg-white">
                <div className="flex w-full text-2xl font-bold">Title</div>
                <div className="flex w-full h-36 break-words pt-1 text-gray-500">
                    {item.detail}
                </div>
                <div className="flex text-sm mt-2 pl-3">
                    {item.user}
                </div>
                </div>
            ))}
            </div>
            {reviewComment < comment.length -2 ?<Icon 
            onClick={() => setReviewComment(  prev => prev+1)}
            className='ml-5 text-dark3 cursor-pointer shrink-0'
            icon="icon-park-solid:right-c" width="50" height="50" />
            :<div style={{width: '70px'}}
            className='mr-5 shrink-0'></div>}
        </div>





        <div className="flex w-full items-center justify-between pr-32">
        <div className="flex">
            <div className="flex text-4xl font-bold ml-36 mt-10 mb-10">More From</div>
            <div className="flex text-4xl ml-2 mt-10 mb-10">Champ</div>
        </div>
        <button className="flex bg-dark2 text-white w-28 h-10 justify-center items-center rounded-full text-lg underline">ดูทั้งหมด</button>
        </div>
        <SlideBookMini data={bookSlide}/>
        </div>
        <Footer/>
        </>
    )
}

export default BookInfo