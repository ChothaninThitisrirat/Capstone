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
    title  : string[];
    picture: string[];
    name: string;
}

export default function Profile() {
  
  const { title } = useParams();
  const [BookCategory, setBookCategory] = useState<UserBook[]>([])
  const [BookCategoryName, setBookCategoryName] = useState<UserBook[]>([])

  useEffect(() => {
    if (title){
      const titleID = Array.isArray(title) ? title[0] : title;
      fetchBookCategory(title[0])
      fetchBookCategoryName()

    }
  },[title])

   const fetchBookCategory = async (title: string) => {
    const res = await fetch(`/api/category/allbook/${title}`)
    const data = await res.json()
    setBookCategory(data.allbook)
    console.log(data.allbook)
   }

   const fetchBookCategoryName = async () => {
    const res = await fetch(`/api/category`)
    const data = await res.json()
    setBookCategoryName(data.category)
    console.log(data.category)
   }

   const matchingCategory = BookCategoryName.find(item => item.id === parseInt(title[0]));


  if (!title) return <div>
    <div className='w-screen h-screen flex items-center justify-center opacity-95 bg-gradient-to-tr from-yellow-100 to-blue-100'>
        <HashLoader
        color='#435585' size={50} aria-label="Loading Spinner" data-testid="loader"/>
      </div>
  </div>;


  return (
    <>
      <Navbar backGroundOn withTitle/>
      {/* <TitleBar textTitle={{`{}`}} /> */}
      {matchingCategory && <TitleBar textTitle={`${matchingCategory.name}`} />}
      <div className='flex w-full items-center gap-12 justify-center flex-wrap pt-16'>
        {BookCategory?.length === 0 ? (
          <div
            style={{ width: '1250px', WebkitOverflowScrolling: 'touch' }}
            className="flex font-bold text-gray-400 text-xl justify-start h-68 pl-20 -translate-y-8"
          >
            No Books For this Category
          </div>
        ) : (
          BookCategory.map((item, index) => (
            <div
              key={index}
              className="flex w-max h-max bg-white justify-center "
            >
              <Link
                className="flex w-svw h-1/4 max-w-52 min-h-72 bg-cover bg-center bg-no-repeat"
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
