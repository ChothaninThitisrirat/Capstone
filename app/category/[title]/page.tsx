'use client'

import React, { use } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import TitleBar from '@/Components/TitleBar'
import Navbar from '@/Components/Navbar'
import { SyncLoader } from 'react-spinners'
import { Rating } from '@mui/material'
import {Icon} from '@iconify/react'
import Link from 'next/link'
import { set } from 'mongoose'
import SlideBookBig from '@/Components/SlideBookBig'
import Footer from '@/Components/Footer'


interface UserBook{
    id: number;
    title  : string;
    picture: string[];
    name: string;
    titleID: number
}

export default function Profile() {
  
  const { title } = useParams();
  const [BookCategory, setBookCategory] = useState<UserBook[]>([])
  const [BookCategoryName, setBookCategoryName] = useState<UserBook[]>([])
  const titleID = Array.isArray(title) ? title[0] : title;
  const matchingCategory = BookCategoryName.find(item => item.id == Number(titleID));
  const [loader, setLoader] = useState(true)
  const [popBook, setPopBook] = useState<UserBook[]>([])


  useEffect(() => {
    if (title){
      let titleID;
        if (Array.isArray(title)) {
          titleID = title[0];
        } else {
          titleID = title;
        }
      fetchBookCategory(titleID)
      fetchBookCategoryName()
      fetchpopularBooks(titleID)
      setLoader(false)
      

    } 
  },[title])

    const fetchBookCategory = async (title: string) => {
    const res = await fetch(`/api/category/allbook/${title}`)
    const data = await res.json()
    setBookCategory(data.allbook)
   }

   const fetchBookCategoryName = async () => {
    const res = await fetch(`/api/category`)
    const data = await res.json()
    setBookCategoryName(data.category)
   }

   const fetchpopularBooks = async (title: string) => {
    const res = await fetch(`/api/category/popularbook/${title}`)
    const data = await res.json()
    
    setPopBook(data.popularbook)
    // setLoader(false)
   }

   if (loader) return <div>
   <div className='w-screen h-screen flex items-center justify-center opacity-95'>
       <SyncLoader
       color='#435585' size={10} aria-label="Loading Spinner" data-testid="loader"/>
     </div>
  </div>;


  
   
  

  return (
    <>
      <Navbar backGroundOn withTitle/>
      {/* <TitleBar textTitle={{`{}`}} /> */}
      {matchingCategory && <TitleBar textTitle={`${matchingCategory.name}`} />}

      
      
      <div className='flex w-full flex-col items-center gap-12 justify-center flex-wrap pt-16 bg-bg min-h-screen'>

        <div className='flex w-10/12 justify-center pb-8'>
              {
                matchingCategory && <SlideBookBig data={popBook} Headtitle={`เล่มยอดนิยมในหมวดหมู่ ${matchingCategory.name}`} Subtitle={"หนังสือยอดนิยม"}/>
              }
        </div>
        <div className="flex w-10/12 justify-center gap-12 pt-16 flex-wrap">
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
                className="flex flex-col items-center w-max h-max bg-bg justify-center "
              >
                <Link
                  className="flex w-svw h-1/4 max-w-52 min-h-72 bg-cover bg-center bg-no-repeat hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105"
                  style={{ backgroundImage: `url(${item.picture[0]})` }}
                  href={`/bookinfo/${item.id}`}
                />
                <Link 
                  href={`/bookinfo/${item.id}`}
                  className='pt-2 font-bold'
                  >
                    {item.title}
                  </Link>

              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
      
    </>
  )
}
