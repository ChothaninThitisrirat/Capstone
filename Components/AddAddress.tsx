'use client'

import {useState, useEffect} from 'react'
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios';



interface AddressProps {
    setStatusAddress: (style: boolean) => void;
}

const AddAddress: React.FC<AddressProps> = ({setStatusAddress}) =>{
    const [address, setAddress] = useState('');
    const { data: session, status } = useSession()
    const router = useRouter()   
    const userId: number | undefined = session?.user.id

    const reSetInfo = () => {
        setStatusAddress(false);
        setAddress('');
    }

    const handleAddAddress = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userId,address);
        try {
            const response = await axios.post(`/api/user/${userId}/address`,{ 
                user_id: userId,
                address: address
            });
            reSetInfo();
            } catch (error) {
                console.error('Error:', error);
            }
    }





    return (
        <>
        <div className='fixed h-screen w-screen bg-slate-200 top-0 left-0 z-50 opacity-30 backdrop-blur-2xl'></div>
        <div className="fixed flex top-0 left-0 z-50 h-screen w-screen items-center justify-center">
        <form 
            onSubmit={handleAddAddress}
            style={{width: "600px",borderRadius: "30px"}}
            className="flex flex-col w-auto h-auto bg-white py-5 sm:p-10 border border-gray-300 items-center justify-center relative mx-5">
            <Icon icon="carbon:close-filled" width="45" height="45"
                    onClick={() => reSetInfo()}
                    className=' absolute top-0 right-0 translate-x-3 -translate-y-3 text-gray-300 cursor-pointer hover:text-red-500'/>
            <div className="text-3xl sm:text-4xl font-bold w-full flex items-center justify-center">เพิ่มที่อยู่ใหม่</div>
            <div className="flex relative mb-4 w-full px-5">
                <Icon
                    icon="mdi:address-marker-outline"
                    width="30"
                    height="30"
                    style={{ color: address?"#333":"#A7A7A7" }}
                    className=" absolute top-8 left-6"
                />
                <textarea
                    id="book-detail"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="book-detail w-full border-l-2 border-gray-300 ml-10 pl-2 pt-1 pb2 mt-8 faw resize-none bg-gray-50 rounded-sm h-32 close-scrollbar"
                />
            </div>
            <div className="flex items-center justify-center mt-10">
                {address !== ''
                ?<button
                type="submit"
                className="w-40 h-9 bg-dark2 text-white rounded-full cursor-pointer "
                >
                    เพิ่มที่อยู่ใหม่
                </button>
                :<button
                    type="submit"
                    className="w-40 h-9 bg-gray-300 text-white rounded-full cursor-pointer "
                >
                    เพิ่มที่อยู่ใหม่
                </button>}
            </div>
        </form>
        </div>
        </>
    )
}

export default AddAddress