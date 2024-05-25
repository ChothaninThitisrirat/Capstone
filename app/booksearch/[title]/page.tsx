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
    title  : string;
    picture: string[];
}

export default function Profile() {
  
  const { title } = useParams();
  const [BookSearch, setBookSearch] = useState<UserBook[]>([])

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
      <TitleBar textTitle={`ผลการค้นหาของ ${title}`} />

      <div className='flex items-center justify-center'>
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
              className="flex flex-wrap gap-8 w-screen h-screen bg-white justify-center "
            >
              <Link
                className="flex w-full h-1/3 max-w-52 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${item.picture[0]})` }}
                href={`/bookinfo/${item.id}`}
              />
            </div>
          ))
        )}
      </div>
      
    </>
  )
}
