'use client'

import logoWhite from '../public/images/logoWhite.png';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import React, { FC, useState } from 'react';
import SlideBookMini from '@/Components/SlideBookMini';
import SlideBookBig from '@/Components/BookFeedInfo/SlideBookBig';
import Searchbar from '@/Components/Searchbar';

interface Props {
}

const bookTitle = [
  { id: '1', title: "Book1" },
  { id: '2', title: 'Book2' },
  { id: '3', title: 'Book3' },
  { id: '4', title: 'Book4' },
  { id: '5', title: 'Book5' },
  { id: '6', title: 'Book6' },
  { id: '7', title: 'Book7' },
  { id: '8', title: 'Book8' },
  { id: '9', title: 'Book9' },
]
  
const Page: FC<Props> = (): JSX.Element => {
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
  ]);

  const bookTitle = [
      { id: '1', title: "Book1" },
      { id: '2', title: 'Book2' },
      { id: '3', title: 'Book3' },
      { id: '4', title: 'Book4' },
      // { id: '5', title: 'Book5' },
      // { id: '6', title: 'Book6' },
      // { id: '7', title: 'Book7' },
      // { id: '8', title: 'Book8' },
      // { id: '9', title: 'Book9' },
  ];

  const [results, setResults] = useState<{ id: string; title: string }[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<{ id: string; title:string}>();
  
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const { value } = e.target;
      if (!value.trim()) {
          setResults([]);
          return;
      }

      const filteredValue = bookTitle.filter((item) =>
          item.title.toLowerCase().startsWith(value.toLowerCase())
      );
      setResults(filteredValue);
  };

  return (
    <>
      <Navbar backGroundOn />
      {/* แถบบน and Search bar */}
      <div className='flex justify-center flex-col w-full h-screen'>
        <div className='flex flex-col justify-center items-center w-full h-full bg-dark2 rounded-b-3xl'>
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
          <Searchbar 
            results={results} 
            onChange={handleChange}
            renderItem={(item) => (<p>{item.title}</p>)} 
            onSelect={(item) => setSelectedProfile(item)}
            value={selectedProfile?.title}
          />
          
          <div className='relative'>
          <img src="https://dfmtboqfsygnjttfuvgq.supabase.co/storage/v1/object/public/b-trade/profile/43474571-17aa-4c70-bf6c-960848a25ed4.jpg" alt="" /> 
          </div>

        </div>

        {/* category */}
        <div className='flex justify-center items-center w-screen bg-white h-fit p-8'>
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
            <button className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg from-health to-white hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>สุขภาพ</button>
          </div>
        </div>
      </div>

      
      
      <div className='flex flex-col w-full bg-bg justify-center items-center'>
        <div className='w-5/6 mt-10'>
          <p className='text-5xl font-bold'>Popular</p>
          <p className='text-xl font-bold mt-5'>หนังสือดี หนังสือเด่น คนนิยมอ่าน</p>
          <div className='flex justify-center mt-10'>
            <SlideBookBig />
          </div>
        </div>

        <div className='w-5/6 mt-10'>
          <p className='text-5xl font-bold'>Popular</p>
          <p className='text-xl font-bold mt-5'>หนังสือดี หนังสือเด่น คนนิยมอ่าน</p>
          <div className='flex justify-center mt-10'>
            <SlideBookBig />
          </div>
        </div>

        <div className='w-5/6 mt-10'>
          <p className='text-5xl font-bold'>Popular</p>
          <p className='text-xl font-bold mt-5'>หนังสือดี หนังสือเด่น คนนิยมอ่าน</p>
          <div className='flex justify-center mt-10'>
            <SlideBookMini data={bookSlide}/> 
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;