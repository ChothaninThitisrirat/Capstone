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
import { HashLoader,SyncLoader } from 'react-spinners';
import SlideBookMiniWithTitle from '@/Components/SlideBookMiniWithTitle';


interface POPBOOK {
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

  const [results, setResults] = useState<{ id: string; title: string }[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<{ id: string; title:string}>();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [popBook, setPopBook] = useState<POPBOOK[]>([]);
  const [recommendBook, setRecommendBook] = useState<Books[]>([])
  const [category1, setCategory1] = useState<Books[]>([]);
  const [category2, setCategory2] = useState<Books[]>([]);
  const [category3, setCategory3] = useState<Books[]>([]);
  const [category4, setCategory4] = useState<Books[]>([]);
  const [category5, setCategory5] = useState<Books[]>([]);
  const [category6, setCategory6] = useState<Books[]>([]);
  const [category7, setCategory7] = useState<Books[]>([]);
  const [category8, setCategory8] = useState<Books[]>([]);
  const [category9, setCategory9] = useState<Books[]>([]);
  const [category10, setCategory10] = useState<Books[]>([]);

  
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
      } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  const fetchPopularBooks = async () => {
    try {
        const response = await fetch('api/book/popularbook');
        const data = await response.json();
        setPopBook(data.popularbook);
        setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPopularBooks();
  }, [session, status, router]);


  function Loader() {
    return <div className='w-screen h-screen flex items-center justify-center opacity-95'>
        <SyncLoader
        color='#435585' size={10} aria-label="Loading Spinner" data-testid="loader"/>
      </div>

      
  }

  useEffect(() => {
    async function fetchData() {
      if(!session) {
        return;
    }
      const response = await fetch(`http://localhost:4000/api/ai`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: parseInt(session.user.id)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendBook(data);
        console.log("datarec",data)
    } else {
      console.error('Failed to update contact information')
    }
    }

    fetchData();
  }, []);

console.log("Recommended",recommendBook)




  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/1`);
        const data = await response.json();
        setCategory1(data.allbook);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  
    fetchData();
  }, []);

  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/2`);
        const data = await response.json();
        setCategory2(data.allbook);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/3`);
        const data = await response.json();
        setCategory3(data.allbook);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/4`);
        const data = await response.json();
        setCategory4(data.allbook);
        
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/5`);
        const data = await response.json();
        setCategory5(data.allbook);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/6`);
        const data = await response.json();
        setCategory6(data.allbook);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/7`);
        const data = await response.json();
        setCategory7(data.allbook);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/8`);
        const data = await response.json();
        setCategory8(data.allbook);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/9`);
        const data = await response.json();
        setCategory9(data.allbook);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/10`);
        const data = await response.json();
        setCategory10(data.allbook);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  
    fetchData();
  }, []);






  return (
    <>
      <Navbar backGroundOn={false} withTitle={false}/>
      
      {/* แถบบน and Search bar */}
      <div className='flex flex-col w-screen h-full'>
        <div className='flex flex-col justify-center items-center w-full h-fit bg-dark2 rounded-b-3xl pb-20'>
          <h1 className='text-7xl font-bold  text-white pb-8 pt-20'>
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
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg- border-2 border-education hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>การศึกษา</Link>
            <Link
            href='/category/8'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg- border-2 border-travel hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>ท่องเที่ยว</Link>
            <Link
            href='/category/9'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg- border-2 border-develop hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>การพัฒนาตนเอง</Link>
            <Link
            href='/category/10'
            className='flex justify-center h-fit text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg- border-2 border-health hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out hover:scale-105'>สุขภาพ</Link>
          </div>
        </div>
        <div className='flex flex-col w-screen bg-bg justify-center items-center'>
        <div className='w-5/6 mt-10'>
          <div className='flex justify-center pb-8'>
            {
              <SlideBookBig data={popBook} Headtitle={"Popular Book"} Subtitle={"หนังสือดี หนังสือดัง คนนิยมอ่าน"}/>
            }
          </div>

          <div className='flex justify-center pb-8'>
            {
              session && loading ? Loader() : session && (<SlideBookBig data={recommendBook} Headtitle={"Recommended For You"} Subtitle={"หนังสือที่คุณอาจจะสนใจ"}/>)
            }
          </div>

          <div className='flex justify-center'>
            {
              category1 && (<SlideBookMiniWithTitle data={category1} Headtitle='นวนิยาย'/>)
            }
          </div>

          
          <div className='flex justify-center'>
            {
              category2 && <SlideBookMiniWithTitle data={category2} Headtitle='สยองขวัญ'/>
            }
          </div>

          <div className='flex justify-center'>
            {
              category3 &&<SlideBookMiniWithTitle data={category3} Headtitle='การ์ตูน'/>
            }
          </div>

          <div className='flex justify-center'>
            {
              category4 &&<SlideBookMiniWithTitle data={category4} Headtitle='โรแมนติก'/>
            }
          </div>

          <div className='flex justify-center'>
            {
              category5 &&<SlideBookMiniWithTitle data={category5} Headtitle='วิทยาศาสตร์'/>
            }
          </div>
          <div className='flex justify-center'>
            {
              category6 &&<SlideBookMiniWithTitle data={category6} Headtitle='การเงิน - ลงทุน'/>
            }
          </div>

          
          <div className='flex justify-center'>
            {
              category7 &&<SlideBookMiniWithTitle data={category7} Headtitle='การศึกษา'/>
            }
          </div>

          <div className='flex justify-center'>
            {
              category8 &&<SlideBookMiniWithTitle data={category8} Headtitle='ท่องเที่ยว'/>
            }
          </div>

          <div className='flex justify-center'>
            {
              category9 &&<SlideBookMiniWithTitle data={category9} Headtitle='การพัฒนาตนเอง'/>
            }
          </div>

          <div className='flex w-full justify-center'>
            {
              category10 && <SlideBookMiniWithTitle data={category10} Headtitle='สุขภาพ'/>
            }
          </div>
        </div>

      </div>

      
      
      
       
      </div>
      <Footer />
    </>
  );
}

export default Page;