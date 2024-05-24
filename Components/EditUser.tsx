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
    userIdSelect:number | null;
    reloadInfo:boolean;
}
interface UserInfo {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    card_id: string;
    phone_number: string;
    email: string;
    profile_picture: string;
    address:string[];
}

const EditUser: React.FC<PostNewBookProp> = ({setStateOpen, classAddBook, userIdSelect, reloadInfo}) =>{
    const [loadTrade, setLoadTrade] = useState(false)
    const [userInfo, setUserInfo] = useState<UserInfo>();
    

    const [loading, setLoading] = useState(true)
    const { data: session, status } = useSession()
    const userId  = session?.user.id;

    useEffect(() => {
        const fetchData = async () => {
            if (userIdSelect) {
                try {
                    console.log('tradeId---',userIdSelect);
                    const response = await axios.get(`/api/admin/user/${userIdSelect}`);
                    
                    setUserInfo(response.data.user)

                    setLoading(false)
                } catch (error) {
                        setLoading(false)
                    console.error('Error fetching address data:', error);
                }
            }
        };
        if(userIdSelect){
            fetchData();
        }
        
    }, [userIdSelect,reloadInfo]);


    
    const handleClosePopUp = () => {
        setStateOpen(false)
    }
    return (
    <>
        
        
        <div
        style={classAddBook} 
        className="fixed flex top-0 left-0 z-50 h-screen w-screen items-center justify-center ">
            
            <div 
            style={{borderRadius: "30px"}}
            className="flex flex-col w-auto h-auto bg-white border border-gray-300 items-center relative px-14 pb-14 pt-10 min-w-80 min-h-80">
                <div 
                style={{maxHeight: "700px"}}
                className="flex flex-col items-center overflow-y-auto css-scrollbar">
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



                        <div
                        className="flex justify-center h-auto w-sceen z-30 mt-5 gap-10 mx-5">
                            <div className="flex flex-col z-30 w-full items-center">
                                <div className="flex text-3xl font-bold w-full justify-center h-auto break-words mb-10">
                                    ข้อมูลของ {userInfo?.username}
                                </div>
                                <div className="flex w-full justify-around gap-16 h-full">
                                    <div className="flex my-auto flex-col">
                                        <img
                                        src={userInfo?.profile_picture}
                                        alt="Profile picture"
                                        className=' w-56 h-56 object-cover cursor-pointer shadow-lg rounded-full shrink-0'
                                        />
                                        <div className="flex text-2xl w-full justify-center h-auto break-words mt-5">
                                            {userInfo?.username}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-96">
                                        <div className="flex justify-between">
                                            <div className="flex relative mb-4 w-44">
                                                <Icon
                                                icon="mingcute:user-3-fill"
                                                width="30"
                                                height="30"
                                                style={{ color: "#A7A7A7" }}
                                                className=" absolute bottom-2 left-1"
                                                />
                                                <input
                                                readOnly
                                                id="firstName"
                                                type="text"
                                                value={userInfo?.first_name}
                                                placeholder="FirstName"
                                                maxLength={20}
                                                required
                                                className="w-44 border-b border-gray-400 pl-12 py-2 mt-5 "
                                                />
                                            </div>
                                            <div className="flex relative mb-4 w-44">
                                                <Icon
                                                icon="mingcute:user-3-fill"
                                                width="30"
                                                height="30"
                                                style={{ color: "#A7A7A7" }}
                                                className=" absolute bottom-2 left-1"
                                                />
                                                <input
                                                readOnly
                                                id="lastName"
                                                type="text"
                                                value={userInfo?.last_name}
                                                placeholder="LastName"
                                                maxLength={20}
                                                required
                                                className="w-44 border-b border-gray-400 pl-12 py-2 mt-5 "
                                                />
                                            </div>
                                        </div>
                                        <div className="flex relative mb-4">
                                            <Icon
                                                icon="material-symbols-light:id-card-outline"
                                                width="30"
                                                height="30"
                                                style={{ color: "#A7A7A7" }}
                                                className=" absolute bottom-2 left-1"
                                            />
                                            <input
                                                readOnly
                                                id="personalId"
                                                type="number"
                                                value={userInfo?.card_id}
                                                placeholder="Thai Personal ID"
                                                maxLength={13}
                                                required
                                                className="w-full border-b border-gray-400 pl-12 py-2 mt-5 "
                                            />
                                        </div>
                                        <div className="flex relative mb-4">
                                            <Icon
                                                icon="carbon:email"
                                                width="30"
                                                height="30"
                                                style={{ color: "#A7A7A7" }}
                                                className=" absolute bottom-2 left-1"
                                            />
                                            <input
                                                readOnly
                                                id="email"
                                                type="text"
                                                value={userInfo?.email}
                                                placeholder="Address"
                                                required
                                                className="w-full border-b border-gray-400 pl-12 py-2 mt-5 "
                                            />
                                        </div>
                                        <div className="flex relative mb-4">
                                            <Icon
                                                icon="mynaui:telephone"
                                                width="30"
                                                height="30"
                                                style={{ color: "#A7A7A7" }}
                                                className=" absolute bottom-2 left-1"
                                            />
                                            <input
                                                readOnly
                                                id="telNumber"
                                                type="number"
                                                value={userInfo?.phone_number}
                                                placeholder="Telephone Number"
                                                maxLength={10}
                                                required
                                                className="w-full border-b border-gray-400 pl-12 py-2 mt-5 "
                                            />
                                        </div>
                                        <div className="flex flex-col max-h-32 overflow-y-auto css-scrollbar mt-2 mb-5">
                                            {userInfo?.address.map((item,index) => (
                                            <div 
                                            key={index}
                                            className="flex relative mb-4">
                                                <Icon
                                                    icon="prime:map-marker"
                                                    width="30"
                                                    height="30"
                                                    style={{ color: "#A7A7A7" }}
                                                    className=" absolute bottom-2 left-1"
                                                />
                                                <input
                                                    readOnly
                                                    id="address"
                                                    type="text"
                                                    value={item}
                                                    placeholder="Address"
                                                    required
                                                    className="w-full border-b border-gray-400 pl-12 py-2 mt-5 "
                                                />
                                            </div>))}
                                        </div>
                                    </div>


                                    
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    </>
    )
}

export default EditUser