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
            <input type="search" id="search" className="block rounded-3xl w-full p-4 ps-4 text-sm text-gray-900" placeholder="กรอกชื่อหนังสือที่ต้องการค้นหาได้ที่นี่" required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-dark1 hover:bg-dark2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-4 py-2 ">Search</button>
          </div>
        </div>


        <div className='flex flex-wrap items-center w-full  bg-white h-1/6'>
          <div className=''>
            <div>นวนิยาย</div>
            <div>นวนิยาย</div>
            <div>นวนิยาย</div>
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

