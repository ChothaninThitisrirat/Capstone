import {useState,useEffect} from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';     


interface PostNewBookProp {
    setStateAddBook: (style: boolean) => void;
    classAddBook: any;
}

const PostNewBook: React.FC<PostNewBookProp> = ({setStateAddBook, classAddBook}) =>{
    const [bookTitle, setBookTitle] = useState('')
    const [bookDetail, setBookDetail] = useState('')
    const [classCategory, setClassCategory] = useState(
        "flex items-center justify-center rounded-lg w-auto text-sm cursor-pointer py-0.5 px-3 flex-grow-4 duration-1000")
    const [dataCatin, setDataCatin] = useState([])
    const [dataPicture, setDataPicture] = useState([{
        img:null
    },{
        img:null
    },{
        img:null
    }])
    const [category, setCategory] = useState([{
        name: "นวนิยาย",
        defaultClass: true,
        color: "bg-gradient-to-tr from-novel to-white"
    },{
        name: "สยองขวัญ",
        defaultClass: true,
        color: "bg-gradient-to-tr from-horror1 to-horror2 text-white"
    },{
        name: "การ์ตูน",
        defaultClass: true,
        color: "bg-gradient-to-tr from-cartoon to-white"
    },{
        name: "โรแมนติก",
        defaultClass: true,
        color: "bg-gradient-to-tr from-romantic to-white"
    },{
        name: "วิทยาศาสตร์",
        defaultClass: true,
        color: "bg-gradient-to-tr from-science to-white"
    },{
        name: "การเงิน-ลงทุน",
        defaultClass: true,
        color: "bg-gradient-to-tr from-business to-white"
    },{
        name: "การศึกษา",
        defaultClass: true,
        color: "bg-gradient-to-tr from-education to-white"
    },{
        name: "ท่องเที่ยว",
        defaultClass: true,
        color: "bg-gradient-to-tr from-travel to-white"
    },{
        name: "พัฒนาตนเอง",
        defaultClass: true,
        color: "bg-gradient-to-tr from-develop to-white"
    },{
        name: "สุขภาพ",
        defaultClass: true,
        color: "bg-gradient-to-tr from-health to-white"
    }])



    return (
        <>
        <style>
            {`
            .book-detail::-webkit-scrollbar {
                background: none;
                border-radius: 10px;
                width: 6px;
                height: 10px;
            }
            
            .book-detail::-webkit-scrollbar-thumb {
                background-color: #BDCAED;
                border-radius: 2px;
            
            }
            `}
        </style>
                <div
                style={classAddBook}
                className="fixed flex top-0 left-0 z-50 h-screen w-screen items-center justify-center">
                    <form 
                    // onSubmit={}
                    style={{width: "600px",borderRadius: "30px"}}
                    className="flex flex-col w-auto h-auto bg-white p-10 border border-gray-300 items-center justify-center relative">
                        <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 rounded-full bg-white w-9 h-9"></div>
                        <Icon icon="carbon:close-filled" width="45" height="45"
                        onClick={() => setStateAddBook(false)}
                        className=' absolute top-0 right-0 translate-x-3 -translate-y-3 text-gray-300 cursor-pointer hover:text-red-500'/>
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
                                className="book-detail w-full border-l-2 border-gray-300 ml-10 pl-2 pt-1 pb2 mt-8 faw resize-none bg-gray-50 rounded-sm h-32"
                            />
                        </div>
                        <div className="flex items-center justify-center flex-col w-full px-5">
                            <div className={dataCatin.length > 0
                            ?"flex w-full mt-5 mb-3 duration-300"
                            :"flex text-gray-400 w-full mt-5 mb-3 duration-300"
                            }>Category</div>
                            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
                                {category.map((cate, index) => (
                                    <div 
                                    onClick={() => {
                                        
                                        const newCatin:any = [...dataCatin]
                                        const ClassCatin:any = [...category]
                                        if(newCatin.includes(cate.name)){
                                            ClassCatin.forEach((cat:any) => {
                                                if (cat.name === cate.name) {
                                                    cat.defaultClass = true;
                                                }
                                            });
                                            newCatin.splice(newCatin.indexOf(cate.name),1)
                                        }else{
                                            ClassCatin.forEach((cat:any) => {
                                                if (cat.name === cate.name) {
                                                    cat.defaultClass = false;
                                                }
                                            });
                                            newCatin.push(cate.name)
                                        }
                                        setCategory(ClassCatin)
                                        setDataCatin(newCatin)
                                        console.log(dataCatin)
                                    }}
                                    key={index} className={classCategory+' '+ (cate.defaultClass?"bg-gray-300":cate.color )}
                                    >{cate.name}</div>
                                ))}
                            </div>
                        </div>
                        <div className="flex border-t border-gray-400 w-full mt-10 pt-6">
                            <button className="flex items-center justify-center rounded-lg bg-gray-200 w-16 h-16 cursor-pointer hover:bg-gray-300">
                                <input 
                                className='bg-none border-none absolute w-16 h-16 cursor-pointer opacity-0'
                                type="file" accept="image/*" onChange={(e:any) => {
                                    const file = e.target.files[0]
                                    const reader = new FileReader()
                                    reader.onloadend = () => {
                                        const newPicture:any = [...dataPicture]
                                        newPicture[0].img = reader.result
                                        setDataPicture(newPicture)
                                    }
                                    reader.readAsDataURL(file)
                                }}/>
                                <Icon icon="ic:baseline-plus" width="30" height="30"
                                className='text-gray-500'/>
                            </button>
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
                            {bookTitle && bookDetail && dataCatin.length > 0
                            // && dataPicture[0].img !== null
                            ?<button
                            type="submit"
                            className="w-40 h-9 bg-dark2 text-white rounded-full cursor-pointer "
                            >
                                เพิ่มหนังสือลงคลัง
                            </button>
                            :<button
                                type="submit"
                                className="w-40 h-9 bg-gray-300 text-white rounded-full cursor-pointer "
                            >
                                เพิ่มหนังสือลงคลัง
                            </button>}
                            
                        </div>
                    </form>
                </div>
        </>
    )
}


export default PostNewBook