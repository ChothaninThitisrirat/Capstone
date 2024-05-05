'use client'

import logoWhite from '../public/images/logoWhite.png';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function Home() {


  return (
    <>
      <style>
          {`
          body {
              overflow-x: hidden;
          }
          `}
      </style>
      <Navbar />
      <div className='flex flex-col w-full h-screen'>
        <div className='flex flex-col justify-center items-center w-full  bg-dark2 h-5/6 rounded-b-3xl'>
          <h1 className='text-7xl font-bold text-white mb-8'>Trade The Book</h1>
          <h1 className='text-7xl font-bold text-white mb-8'>Save The Cost</h1>
          <Image
            src={logoWhite}
            alt="Logo"
            className='h-1/6  object-contain ml-5'/>
          <h1 className='text-2xl font-bold text-white mt-8'> เว็บไซต์แลกเปลี่ยนหนังสือที่จะทำให้คุณเพลิดเพลินไปกับหนังสือหลากหลายประเภท</h1>
          <div className="relative w-2/6 mt-8">
            <input type="search" id="search" className="block rounded-3xl w-full p-4 ps-4 text-l text-gray-900" placeholder="กรอกชื่อหนังสือที่ต้องการค้นหาได้ที่นี่" required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-dark1 hover:bg-dark2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-4 py-2 ">Search</button>
          </div>
        </div>


        <div className='flex justify-center items-center w-full  bg-white h-1/6'>
         <div className='grid grid-cols-5 gap-x-40 gap-y-4'>

          <div className='flex justify-center w-full text-2xl py-3 px-9 bg-gradient-to-r shadow-lg  from-novel to-white hover:shadow-xl rounded-2xl text-black'>นวนิยาย</div>
          <div className='flex justify-center w-full text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-horror2 to-horror1 hover:shadow-xl rounded-2xl text-white'>สยองขวัญ</div>
          <div className='flex justify-center w-full text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-cartoon to-white hover:shadow-xl rounded-2xl text-black'>การ์ตูน</div>
          <div className='flex justify-center w-full text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-romantic to-white hover:shadow-xl rounded-2xl text-black'>โรแมนติก</div>
          <div className='flex justify-center w-full text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-science to-white hover:shadow-xl rounded-2xl text-black'>วิทยาศาสตร์</div>
          <div className='flex justify-center w-full text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-business to-white hover:shadow-xl rounded-2xl text-black'>การเงิน - ลงทุน</div>
          <div className='flex justify-center w-full text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-education to-white hover:shadow-xl rounded-2xl text-black'>การศึกษา</div>
          <div className='flex justify-center w-full text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-travel to-white hover:shadow-xl rounded-2xl text-black'>ท่องเที่ยว</div>
          <div className='flex justify-center w-full text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-develop to-white hover:shadow-xl rounded-2xl text-black'>การพัฒนาตนเอง</div>
          <div className='flex justify-center w-full text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-health to-white hover:shadow-xl rounded-2xl text-black'>สุขภาพ</div>





          </div>
        </div>
        
        <div className='bg-bg'>
          Content
          </div>
      </div>
      <Footer />
    </>
  );
}

