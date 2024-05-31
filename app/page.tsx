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
import { HashLoader,SyncLoader } from 'react-spinners';
import SlideBookMiniWithTitle from '@/Components/SlideBookMiniWithTitle';
import { arrayBuffer } from 'node:stream/consumers';


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
  const [newarrival, setNewarrival] = useState<POPBOOK[]>([])
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
  const categories = ['นวนิยาย', 'สยองขวัญ', 'การ์ตูน', 'โรแมนติก', 'วิทยาศาสตร์', 'การเงิน - ลงทุน', 'การศึกษา', 'ท่องเที่ยว', 'พัฒนาตนเอง', 'สุขภาพ'];
  const [allrecommend, setAllrecommend] = useState<Books[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!session) {
        console.log('No session available');
        return;
      }
      try {
        const response = await fetch(`http://superdoggez.trueddns.com:10610/api/ai`, {
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
  
          const recommendations = categories.map(category => data.recommend[category] || []);
          const allRecommendations = recommendations.flat();
          
          setAllrecommend(allRecommendations);
          console.log(allRecommendations, 'all recommendations');
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, [session]);

console.log("RecommendedAllFinal",allrecommend)
  
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

  const fetchNewArrival = async () => {
    try {
        const response = await fetch('api/book/newarrival');
        const data = await response.json();
        setNewarrival(data.newarrivalbook);
        setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPopularBooks();
    fetchNewArrival();
  }, [session, status, router]);


  function Loader() {
    return <div className='w-screen h-screen flex items-center justify-center opacity-95'>
        <SyncLoader
        color='#435585' size={10} aria-label="Loading Spinner" data-testid="loader"/>
      </div>

      
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/category/allbook/1`);
        const data = await response.json();
        const shuffledData = data.allbook.sort(() => Math.random() - 0.5);;
        setCategory1(shuffledData)
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
        const shuffledData = data.allbook.sort(() => Math.random() - 0.5);;
        setCategory2(shuffledData)
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
        const shuffledData = data.allbook.sort(() => Math.random() - 0.5);;
        setCategory3(shuffledData)
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
        const shuffledData = data.allbook.sort(() => Math.random() - 0.5);;
        setCategory4(shuffledData)
        
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
        const shuffledData = data.allbook.sort(() => Math.random() - 0.5);;
        setCategory5(shuffledData)
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
        const shuffledData = data.allbook.sort(() => Math.random() - 0.5);;
        setCategory6(shuffledData)
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
        const shuffledData = data.allbook.sort(() => Math.random() - 0.5);;
        setCategory7(shuffledData)
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
        const shuffledData = data.allbook.sort(() => Math.random() - 0.5);;
        setCategory8(shuffledData)
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
        const shuffledData = data.allbook.sort(() => Math.random() - 0.5);;
        setCategory9(shuffledData)
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
        const shuffledData = data.allbook.sort(() => Math.random() - 0.5);;
        setCategory10(shuffledData)
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
      <div className='flex flex-col w-screen h-full max-w-screen'>
        <div className='flex flex-col justify-center items-center w-full h-fit bg-dark2 rounded-b-3xl pb-20'>
          <h1 className='text-5xl font-bold  text-white pb-8 pt-20 lg:text-6xl xl:text-7xl'>
            Trade The Book
          </h1>
          <h1 className='text-5xl font-bold  text-white mb-8 lg:text-6xl xl:text-7xl'>
            Save The Cost
          </h1>
          {/* เปลี่ยนเป็นจาก Supa */}
          <Image
            src={logoWhite}
            alt="Logo"
            className='h-36 object-contain ml-5 mr-8 lg:h-44 xl:h-52'/>
          <div className="flex justify-center items-center w-full">
            <h1 className='flex w-3/4 text-lg font-bold text-white mt-8 justify-center items-center lg:text-2xl' > 
              เว็บไซต์แลกเปลี่ยนหนังสือสำหรับคนรักการอ่าน
            </h1>
          </div>
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
        <div className='flex justify-center items-center w-screen bg-white h-fit p-8' id='category'>
          <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 font-semibold justify-around w-min-80 bg-white'>
          <Link
            href='/category/10'
            className='flex justify-center h-fit text-ls lg:text-xl xl:text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-health hover:shadow-xl rounded-2xl text-neutral-50 transform transition duration-300 ease-in-out text-nowrap hover:scale-105 '>สุขภาพ</Link>
            <Link
            href='/category/3'
            className='flex justify-center h-fit text-ls lg:text-xl xl:text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-cartoon hover:shadow-xl rounded-2xl text-neutral-100 transform transition duration-300 ease-in-out text-nowrap hover:scale-105'>การ์ตูน</Link>
            
            <Link
            href='/category/9'
            className='flex justify-center h-fit text-ls lg:text-xl xl:text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-develop hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out text-nowrap hover:scale-105'>พัฒนาตนเอง</Link>
            
            <Link
            href='/category/7'
            className='flex justify-center h-fit text-ls lg:text-xl xl:text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-education hover:shadow-xl rounded-2xl text-neutral-100 transform transition duration-300 ease-in-out text-nowrap hover:scale-105'>การศึกษา</Link>
            
            <Link
            href='/category/5'
            className='flex justify-center h-fit text-ls lg:text-xl xl:text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-science hover:shadow-xl rounded-2xl text-neutral-50 transform transition duration-300 ease-in-out text-nowrap hover:scale-105'>วิทยาศาสตร์</Link>
            
        
            
            
           
               <Link
            href='/category/4'
            className='flex justify-center h-fit text-ls lg:text-xl xl:text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-romantic hover:shadow-xl rounded-2xl text-white transform transition duration-300 ease-in-out text-nowrap hover:scale-105'>โรแมนติก</Link>
           
            <Link
            href='/category/1'
            className='flex justify-center h-fit text-ls lg:text-xl xl:text-2xl py-3 px-9 bg-gradient-to-r shadow-lg  bg-novel hover:shadow-xl rounded-2xl text-neutral-50 transform transition duration-300 ease-in-out text-nowrap hover:scale-105'>นวนิยาย</Link>
           <Link
            href='/category/6'
            className='flex justify-center h-fit text-ls lg:text-xl xl:text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-business hover:shadow-xl rounded-2xl text-black transform transition duration-300 ease-in-out text-nowrap hover:scale-105'>การเงิน - ลงทุน</Link>
          
            
            <Link
            href='/category/8'
            className='flex justify-center h-fit text-ls lg:text-xl xl:text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-travel hover:shadow-xl rounded-2xl text-white transform transition duration-300 ease-in-out text-nowrap hover:scale-105'>ท่องเที่ยว</Link>
           
           <Link
            href='/category/2'
            className='flex justify-center h-fit text-ls lg:text-xl xl:text-2xl py-3 px-9 bg-gradient-to-r shadow-lg bg-horror1 hover:shadow-xl rounded-2xl text-neutral-200 transform transition duration-300 ease-in-out text-nowrap hover:scale-105'>สยองขวัญ</Link>

            
          </div>
        </div>
        <div className='flex flex-col w-screen bg-bg justify-center items-center'>
        <div className='w-5/6 mt-10 '>
          <div className='flex justify-center pb-8' >
            {
              <SlideBookBig data={popBook.slice(0,7)} Headtitle={"Popular Book"} Subtitle={"หนังสือดี หนังสือดัง คนนิยมอ่าน"}/>
            }
          </div>

          <div className="flex justify-center pb-8">
            {
              <SlideBookBig data={newarrival} Headtitle={"New Arrival อันเล็ก"} Subtitle={'หนังสือใหม่ล่าสุด'}/>
            }
          </div>

          <div className='flex justify-center pb-8' id='recommend'>
            {
              session && loading ? Loader() : session && (<SlideBookBig data={allrecommend} Headtitle={"Recommended For You"} Subtitle={"หนังสือที่คุณอาจจะสนใจ"}/>)
            }
          </div>

          <div className='flex justify-center pb-8' id='recommend'>
            {
              session && loading ? Loader() : session && (<SlideBookBig data={newarrival} Headtitle={"You Might Like This"} Subtitle={"หนังสือที่คุณอาจจะชื่นชอบ"}/>)
            }
          </div>

          
           


            {
              category1 && (<SlideBookMiniWithTitle data={category1.slice(0,10)} Headtitle='นวนิยาย' num_category={1}/>)
            }

            {
              category2 && (<SlideBookMiniWithTitle data={category2.slice(0,10)} Headtitle='สยองขวัญ' num_category={2}/>)
            }

            {
              category3 &&<SlideBookMiniWithTitle data={category3.slice(0,10)} Headtitle='การ์ตูน' num_category={3}/>
            }

            {
              category4 &&<SlideBookMiniWithTitle data={category4.slice(0,10)} Headtitle='โรแมนติก' num_category={4}/>
            }

            {
              category5 &&<SlideBookMiniWithTitle data={category5.slice(0,10)} Headtitle='วิทยาศาสตร์' num_category={5}/>
            }

            {
              category6 &&<SlideBookMiniWithTitle data={category6.slice(0,10)} Headtitle='การเงิน - ลงทุน' num_category={6}/>
            }
          
            {
              category7 &&<SlideBookMiniWithTitle data={category7.slice(0,10)} Headtitle='การศึกษา' num_category={7}/>
            }

            {
              category8 &&<SlideBookMiniWithTitle data={category8.slice(0,10)} Headtitle='ท่องเที่ยว' num_category={8}/>
            }

            {
              category9 &&<SlideBookMiniWithTitle data={category9.slice(0,10)} Headtitle='การพัฒนาตนเอง' num_category={9}/>
            }

            {
              category10 && <SlideBookMiniWithTitle data={category10.slice(0,10)} Headtitle='สุขภาพ' num_category={10}/>
            }
        </div> 

      </div>

      
      
      
       
      </div>
      <Footer />
    </>
  );
}

export default Page;