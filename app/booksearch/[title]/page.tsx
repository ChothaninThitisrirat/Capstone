'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import TitleBar from '@/Components/TitleBar'
import Navbar from '@/Components/Navbar'
import { HashLoader } from 'react-spinners'
import { Rating } from '@mui/material'
import {Icon} from '@iconify/react'
import Link from 'next/link'


interface UserBook{
    id: number;
    title  : string | undefined;
    picture: string[];
    newtitle: string;
    replace: string;
}

export default function Profile() {
  
  const { title } = useParams();
  const [BookSearch, setBookSearch] = useState<UserBook[]>([])
  
  let newtitle = '';
  if (Array.isArray(title)) {
    newtitle = title[0].replace(/%20/g, ' ');
  } else {
    newtitle = title.replace(/%20/g, ' ');
  }

  useEffect(() => {
    if (title){
      const titleID = Array.isArray(title) ? title[0] : title;
      fetchBookSearch(titleID)
    }
  },[title])

   const fetchBookSearch = async (title: string) => {
    const res = await fetch(`/api/book/searchbook/${title}`)
    const data = await res.json()
    setBookSearch(data.book)
    console.log("logdata",data,title)
   }


  if (!title) return <div>
    <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
        <HashLoader
        color='#435585' size={50} aria-label="Loading Spinner" data-testid="loader"/>
      </div>
  </div>;


  return (
    <>
      <Navbar backGroundOn withTitle/>
      <TitleBar textTitle={`ผลการค้นหา`} />
      <div className='flex w-full items-center gap-12 justify-center flex-wrap pt-16'>
        {BookSearch?.length === 0 ? (
          <div
            style={{ width: '1250px', WebkitOverflowScrolling: 'touch' }}
            className="flex font-bold text-gray-400 text-xl justify-start h-68 pl-20 -translate-y-8"
          >
            No Books Found
          </div>
        ) : (
          BookSearch.map((item, index) => (
            <div
            key={index}
            className="flex flex-col items-center font-bold w-max h-max bg-transparent justify-center "
          >
            <Link
              className="flex w-svw h-1/4 max-w-52 min-h-72 bg-cover bg-center bg-no-repeat hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105"
              style={{ backgroundImage: `url(${item.picture[0]})` }}
              href={`/bookinfo/${item.id}`}
            />
            <Link 
            href={`/bookinfo/${item.id}`}
            className='pt-2'
            >
              {item.title}
            </Link>

          </div>
          
          ))
        )}
        
      </div>
      
    </>
  )
}
