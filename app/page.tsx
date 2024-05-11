'use client'

import logoWhite from '../public/images/logoWhite.png';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import BigPost from "@/Components/BookFeedInfo/BigPost";

export default function Home() {


  return (
    <>
    
      <div className='flex flex-col w-screen h-full '>
        <Navbar />
        
        {/* แถบบน and Search bar */}
        <div className='flex justify-center flex-col w-full h-screen'>
          <div className='flex flex-col justify-center items-center w-full h-5/6 bg-dark2  rounded-b-3xl'>
            
            <h1 className='text-7xl font-bold  text-white mb-8'>
              Trade The Book
            </h1>
            <h1 className='text-7xl font-bold  text-white mb-8'>
              Save The Cost
            </h1>
            {/* เปลี่ยนเป็นจาก Supa */}
            <Image
              src={logoWhite}
              alt="Logo"
              className='h-52  object-contain ml-5'/>

            <h1 className='text-2xl font-bold text-white mt-8'> 
              เว็บไซต์แลกเปลี่ยนหนังสือที่จะทำให้คุณเพลิดเพลินไปกับหนังสือหลากหลายประเภท
            </h1>
            {/* search bar */}
            <div className="relative w-2/6 mt-8">
              <input type="search" id="search" className="block rounded-3xl w-full p-4 ps-4 text-l text-gray-900" placeholder="ระบุหนังสือที่ต้องการค้นหาที่นี่" required />
              <button type="submit" className="text-white absolute end-2.5 bottom-1.5 bg-dark1 hover:bg-dark2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-xl px-14 py-2 ">ค้นหา</button>
            </div>
          </div>

          {/* category */}
          <div className='flex justify-center items-center w-screen bg-white h-fit mt-10 mb-10'>
            <div className='grid grid-cols-5 gap-4 justify-around w-min-80'>
              <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg  from-novel to-white hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>นวนิยาย</button>
              <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-horror1 to-horror2 hover:shadow-xl rounded-2xl text-white transform transition duration-300 ease-in-out hover:scale-105'>สยองขวัญ</button>
              <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-cartoon to-white hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>การ์ตูน</button>
              <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-romantic to-white hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>โรแมนติก</button>
              <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-science to-white hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>วิทยาศาสตร์</button>
              <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-business to-white hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>การเงิน - ลงทุน</button>
              <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-education to-white hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>การศึกษา</button>
              <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-travel to-white hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>ท่องเที่ยว</button>
              <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-develop to-white hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>การพัฒนาตนเอง</button>
              <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-health to-white hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-95'>สุขภาพ</button>
            </div>
          </div>
        </div>

        
        
        <div className='bg-bg flex justify-center'>
          <div className='w-5/6 mt-10'>
            <div className='text-5xl font-bold'>Popular</div>
            <div className='text-xl font-bold mt-5'>หนังสือดี หนังสือเด่น คนนิยมอ่าน</div>
            <div className='flex justify-center mt-10'>
              <BigPost />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

