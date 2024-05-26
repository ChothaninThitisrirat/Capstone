import {useState,useEffect} from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';     
import { useSession } from 'next-auth/react'
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import Loadable from 'next/dist/shared/lib/loadable.shared-runtime';

interface PostNewBookProp {
    setStateAddBook: (style: boolean) => void;
    classAddBook: any;
    setLoadcompo: (style: boolean) => void;
}
interface Category {
    id: string | number | null;
    name: string;
    defaultClass: boolean;
    color: string;
}

const PostNewBook: React.FC<PostNewBookProp> = ({setStateAddBook, classAddBook, setLoadcompo}) =>{
    const [loading, setLoading] = useState(false);
    
    const { data: session, status } = useSession()

    const [bookTitle, setBookTitle] = useState('') //ชื่อหนังสือ
    const [bookDetail, setBookDetail] = useState('') //รายละเอียดหนังสือ
    const [dataCatin, setDataCatin] = useState([]) //ประเภทหนังสือ

    const [uploadPictureNum, setUploadPictureNum] = useState(0)
    const [dataPicture, setDataPicture] = useState<any[]>([]);
    const [dataImg, setDataImg] = useState<any[]>([]);

    const [classCategory, setClassCategory] = useState("flex items-center justify-center rounded-lg w-auto text-sm cursor-pointer py-0.5 px-3 flex-grow-4 duration-1000")
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
    const formData = new FormData();

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

    const reSetInfo = () => {
        setDataCatin([])
        setDataPicture([])
        setBookTitle('')
        setBookDetail('')
        const updatedCategory = category.map(item => ({ ...item, defaultClass: true }));
        setCategory(updatedCategory);
        setUploadPictureNum(0);
        setDataImg([])
        setStateAddBook(false)
    }
console.log('reset',dataCatin, dataPicture)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && uploadPictureNum < 5) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPicture = [...dataPicture];
                const newImg = [...dataImg];
                newPicture.push(file);
                newImg.push(reader.result);
                setUploadPictureNum(prev => prev + 1);
                setDataPicture(newPicture);
                setDataImg(newImg)
            };
            reader.readAsDataURL(file);
        }
    };

    const DeletePicture = (index:any) => {
        const updatedDataPicture = [...dataPicture.slice(0, index), ...dataPicture.slice(index + 1)];
        const updatedDataImg = [...dataImg.slice(0, index), ...dataImg.slice(index + 1)];
        setUploadPictureNum(prev => prev - 1);
        setDataPicture(updatedDataPicture);
        setDataImg(updatedDataImg)
    };

    const handlePostBook = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        
        formData.append('user_id', session?.user.id as any);
        formData.append('title', bookTitle);
        formData.append('description', bookDetail);
        dataCatin.forEach((cat) => {
            formData.append('category', cat);
        });
        dataPicture.forEach((pic) => {
            formData.append('image', pic);
        });
        try{
            const response = await axios.post('/api/library/postbook', formData);
            setLoading(false);
            if (response.status === 201) {
                setLoadcompo(true)
                reSetInfo();
            }
        }catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
        
    }

    const handleSelectBookCategory = (cate: Category) => {
        const newCatin:any = [...dataCatin]
        const ClassCatin:any = [...category]
        if(newCatin.includes(cate.id)){
            ClassCatin.forEach((cat:any) => {
                if (cat.id === cate.id) {
                    cat.defaultClass = true;
                }
            });
            newCatin.splice(newCatin.indexOf(cate.id),1)
        }else{
            ClassCatin.forEach((cat:any) => {
                if (cat.id === cate.id) {
                    cat.defaultClass = false;
                }
            });
            newCatin.push(cate.id)
        }
        setCategory(ClassCatin)
        setDataCatin(newCatin)
    };

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
                    onSubmit={handlePostBook}
                    style={{borderRadius: "30px"}}
                    className="flex flex-col w-11/12 h-auto bg-white py-10 px-5 border border-gray-300 items-center justify-center relative sm:p-10 sm:w-[600px] sm:h-auto sm:">
                        <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 rounded-full bg-white w-9 h-9"></div>
                        <Icon icon="carbon:close-filled" width="45" height="45"
                        onClick={() => reSetInfo()}
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
                                className="book-detail w-full border-l-2 border-gray-300 ml-10 pl-2 pt-1 pb2 mt-8 resize-none bg-gray-50 rounded-sm h-32"
                            />
                        </div>
                        <div className="flex items-center justify-center flex-col w-full px-5">
                            <div className="flex justify-between w-full">
                                <div className={dataCatin.length > 0
                                ?"flex w-1/2 mt-5 mb-3 duration-300"
                                :"flex text-gray-400 w-1/2 mt-5 mb-3 duration-300"
                                }>Category 
                                </div>
                                <div className={dataCatin.length > 1
                                ?"flex w-1/2 mt-5 mb-3 duration-300 justify-end text-green-400 text-sm gap-1"
                                :"flex w-1/2 mt-5 mb-3 duration-300 justify-end text-gray-400 text-sm gap-1"}>
                                    {dataCatin.length > 1 ? (
                                        <Icon
                                        className="mt-1"
                                        icon="fluent:checkmark-16-filled"
                                        width="15"
                                        height="15"
                                    />
                                ) : (
                                    <Icon
                                        className="mt-2 ml-1"
                                        icon="material-symbols:circle"
                                        width="5"
                                        height="5"
                                    />
                                )}
                                เลือกอย่างน้อย 2 หมวดหมู่
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
                                {category.map((cate, index) => (
                                    <div 
                                    onClick={() => {handleSelectBookCategory(cate)}}
                                    key={index} className={classCategory+' '+ (cate.defaultClass?"bg-gray-300":cate.color )}
                                    >{cate.name}</div>
                                ))}
                            </div>
                        </div>
                        <div className="flex border-t border-gray-400 mt-10 pt-6 w-full flex-wrap gap-y-4">

                            {uploadPictureNum < 5 
                            ?<button className="flex items-center justify-center rounded-lg bg-gray-200 w-16 h-16 cursor-pointer hover:bg-gray-300 shrink-0">
                                <input 
                                className='bg-none border-none absolute w-16 h-16 cursor-pointer opacity-0'
                                type="file" accept="image/*" onChange={handleFileChange}/>
                                <Icon icon="ic:baseline-plus" width="30" height="30"
                                className='text-gray-500'/>
                            </button>
                            :<div className="flex items-center justify-center rounded-lg bg-gray-200 w-16 h-16 cursor-pointer">
                                <Icon icon="ic:baseline-plus" width="30" height="30"
                                className='text-gray-500'/>
                            </div>}
                            <div className="w-0.5 h-16 bg-gray-300 mx-3"></div>
                            {dataImg.map((picture, index) => (
                                <div key={index} className="flex items-center justify-center rounded-lg bg-gray-200 w-16 h-16 mr-4 relative">
                                    <Icon 
                                    onClick={() => DeletePicture(index)}
                                    icon="carbon:close-filled" width="20" height="20" 
                                    className=' absolute top-0 right-0 cursor-pointer rounded-full bg-white text-gray-400 hover:text-red-500 translate-x-2 -translate-y-2'/>
                                    <img
                                        src={picture}
                                        alt="Uploaded Image"
                                        className='w-full h-full object-cover rounded-lg'
                                    />
                                </div>
                            ))}
                            {uploadPictureNum < 5 &&<div  className="flex items-center justify-center rounded-lg bg-gray-200 w-16 h-16 mr-3">
                                <Icon icon="fe:picture" width="50" height="50" 
                                className='text-gray-400'/>
                            </div>}


                        </div>
                        <div className="flex items-center justify-center mt-10 relative ">
                            {bookTitle && bookDetail && dataCatin.length > 1 && dataPicture.length > 0
                            ?<button
                            type="submit"
                            className={loading?"w-52 h-9 bg-dark2 text-white rounded-full cursor-pointer flex items-center justify-center gap-1 duration-300"
                            :"w-40 h-9 bg-dark2 text-white rounded-full cursor-pointer flex items-center justify-center gap-1 duration-300"}
                            >
                                <div 
                                className={loading?"flex mr-5 duration-300"
                                :"flex duration-300"}>
                                    เพิ่มหนังสือลงคลัง
                                    </div>
                                <div className="flex absolute top-1/2 right-5 -translate-y-1/2">
                                <HashLoader
                                className="ml-1 duration-300 "
                                color='#fff' loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader"/></div>
                            </button>
                            :<div
                                className="w-40 h-9 bg-gray-300 text-white rounded-full cursor-pointer flex items-center justify-center"
                            >
                                เพิ่มหนังสือลงคลัง
                            </div>}
                            
                        </div>
                    </form>
                </div>
                
        </>
    )
}


export default PostNewBook