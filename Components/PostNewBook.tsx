import {useState} from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';     

function PostNewBook() {
    const [bookTitle, setBookTitle] = useState('')
    const [bookDetail, setBookDetail] = useState('')
    const [dataPicture, setDataPicture] = useState([{
        img:null
    },{
        img:null
    },{
        img:null
    }])
    const [category, setCategory] = useState([{
        name: "นวนิยาย",
        color: ""
    },{
        name: "สยองขวัญ",
        color: ""
    },{
        name: "การ์ตูน",
        color: ""
    },{
        name: "โรแมนติก",
        color: ""
    },{
        name: "ไลท์โนเวล",
        color: ""
    },{
        name: "การเงิน-ลงทุน",
        color: ""
    },{
        name: "การศึกษา",
        color: ""
    },{
        name: "ท่องเที่ยว",
        color: ""
    },{
        name: "พัฒนาตนเอง",
        color: ""
    }])

    return (
        <>
        <div className="flex">
            fuirehghseruighjrhgfesoijfiehjsgihasieugheisgfiesgfiysregiu
            <div 
            className=" fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl"></div>
                <div 
                onClick={(innerClickEvent) => {
                    innerClickEvent.stopPropagation();
                }}
                className="fixed flex top-0 left-0 z-50 h-screen w-screen items-center justify-center">
                    <form 
                    // onSubmit={}
                    style={{width: "500px",borderRadius: "30px"}}
                    className="flex flex-col w-auto h-auto bg-white p-10 border border-gray-300 items-center justify-center">

                        <div className="text-4xl font-bold w-full flex items-center justify-center">เพิ่มหนังสือใหม่</div>
                        <div className="flex relative w-full px-5">
                            <Icon
                                icon="ph:book"
                                width="30"
                                height="30"
                                style={{ color: bookTitle?"#333":"#A7A7A7" }}
                                className=" absolute bottom-2 left-6"
                            />
                            <input
                                id="book-title"
                                type="text"
                                value={bookTitle}
                                placeholder="Book Title"
                                onChange={(e) => setBookTitle(e.target.value)}
                                required
                                className="w-full border-b border-gray-400 pl-12 py-2 mt-8"
                            />
                        </div>
                        <div className="flex relative mb-4 w-full px-5">
                            <Icon
                                icon="solar:book-linear"
                                width="30"
                                height="30"
                                style={{ color: bookDetail?"#333":"#A7A7A7" }}
                                className=" absolute top-8 left-6"
                            />
                            <textarea
                                id="book-detail"
                                value={bookDetail}
                                placeholder="Book Detail"
                                onChange={(e) => setBookDetail(e.target.value)}
                                required
                                className="w-full border-l-2 border-gray-300 ml-10 pl-2 pt-1 pb2 mt-8 faw resize-none bg-gray-50 rounded-sm"
                            />
                        </div>
                        <div className="flex items-center justify-center flex-col w-full px-5">
                            <div className="flex text-gray-400 w-full mt-5 mb-3">Category</div>
                            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-3">
                                {category.map((cate, index) => (
                                    <div key={index} className="flex items-center justify-center rounded-lg w-auto border text-xs cursor-pointer py-0.5 px-3">{cate.name}</div>
                                ))}
                            </div>
                        </div>
                        <div className="flex border-t border-gray-400 w-full mt-10 pt-6">
                            <div className="flex items-center justify-center rounded-lg bg-gray-200 w-16 h-16 cursor-pointer hover:bg-gray-300">
                                <Icon icon="ic:baseline-plus" width="30" height="30"
                                className='text-gray-500'/>
                            </div>
                            <div className="w-0.5 h-16 bg-gray-300 mx-3"></div>

                            {dataPicture.map((picture, index) => (
                                <div key={index} className="flex items-center justify-center rounded-lg bg-gray-200 w-16 h-16 cursor-pointer mr-3">
                                    {picture.img === null 
                                    ? <Icon icon="fe:picture" width="50" height="50" 
                                        className='text-gray-400'/>
                                    :<Image
                                        src={picture.img}
                                        alt="Logo"
                                        className='w-16 h-16 object-cover cursor-pointer translate-x-3 bg-gray-500'
                                        />
                                    }
                                </div>
                            ))}

                        </div>
                        <div className="flex items-center justify-center mt-10">
                            <button
                                type="submit"
                                className="w-40 h-9 bg-gray-300 text-white rounded-full cursor-pointer "
                            >
                                เพิ่มหนังสือลงคลัง
                            </button>
                        </div>
                    </form>
                </div>
            
            </div>
        </>
    )
}


export default PostNewBook