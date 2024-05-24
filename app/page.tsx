'use client'

import logoWhite from '../public/images/logoWhite.png';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import React, { FC, useState } from 'react';
import SlideBookMini from '@/Components/SlideBookMini';
import SlideBookBig from '@/Components/SlideBookBig';
import Searchbar from '@/Components/Searchbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { set } from 'mongoose';
import { HashLoader } from 'react-spinners';

interface POPBOOK {
  popularbook: [];
  id: number;
  title: string;
  picture: string;
  User: {
    username: string
  }
}

interface Props {}

interface Books{
  id: number;
  title: string;
}



const Page: FC<Props> = (): JSX.Element => {

  // const bookTitleLimit = [
  //     { id: '1', title: "Book1" },
  //     { id: '2', title: 'Book2' },
  //     { id: '3', title: 'Book3' },
  //     { id: '4', title: 'Book4' },
  //     // { id: '5', title: 'Book5' },
  //     // { id: '6', title: 'Book6' },
  //     // { id: '7', title: 'Book7' },
  //     // { id: '8', title: 'Book8' },
  //     // { id: '9', title: 'Book9' },
  // ];

  const [results, setResults] = useState<{ id: string; title: string }[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<{ id: string; title:string}>();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [popBook, setPopBook] = useState<POPBOOK[]>([]);

  
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { value } = e.target;
    if (!value.trim()) {
      setResults([]);
      return;
    }
    try {
      const response = await fetch(`/api/book/searchbooklimit/${value}`);
      const data = await response.json();
      
      const filteredValue = data.book.filter((item: { title: string }) =>
        item.title.toLowerCase().startsWith(value.toLowerCase())
      );
      setResults(filteredValue);
      console.log("filtered",filteredValue)
      } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  const fetchPopularBooks = async () => {
    try {
      if (status === 'authenticated' && session?.user?.id) {
        const response = await fetch('api/book/popularbook');
        const data = await response.json();
        setPopBook(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPopularBooks();
  }, [session, status, router]);

  
  console.log(popBook)

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.isAdmin) {
      router.push('/admin');
    }
  }, [status, session]);

  function Loader() {
   return <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
        <HashLoader
        color='#435585' size={50} aria-label="Loading Spinner" data-testid="loader"/>
      </div>
  }



  return (
    <>
      <div className="absolute">
        <Navbar backGroundOn />
      </div>
      
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
          
          <div className='absolute'>

          </div>

        </div>

        {/* category */}
        <div className='flex justify-center items-center w-screen bg-white h-fit p-8'>
          <div className='grid grid-cols-5 gap-4 justify-around w-min-80'>
            <Link
            href='/category/1'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg  bg-novel hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>นวนิยาย</Link>
            <Link
            href='/category/2'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-horror1 hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>สยองขวัญ</Link>
            <Link
            href='/category/3'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-cartoon hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>การ์ตูน</Link>
            <Link
            href='/category/4'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-romantic hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>โรแมนติก</Link>
            <Link
            href='/category/5'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-science hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>วิทยาศาสตร์</Link>
            <Link
            href='/category/6'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-business hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>การเงิน - ลงทุน</Link>
            <Link
            href='/category/7'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-education hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>การศึกษา</Link>
            <Link
            href='/category/8'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-travel hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>ท่องเที่ยว</Link>
            <Link
            href='/category/9'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-develop hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>การพัฒนาตนเอง</Link>
            <Link
            href='/category/10'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-health hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>สุขภาพ</Link>
          </div>
        </div>
      </div>

      
      
      <div className='flex flex-col w-full bg-bg justify-center items-center'>
        <div className='w-5/6 mt-10'>
          <div className='flex justify-center'>
            {
              loading ? Loader() : <SlideBookBig data={popBook.popularbook} />
            }
          </div>
        </div>

       
      </div>
      <Footer />
    </>
  );
}

export default Page;