'use client'

import React,{ useState, useEffect, useRef }  from 'react'
import { useRouter } from 'next/router';
import { Icon } from "@iconify/react";
import Image from 'next/image';
import Link from 'next/link';
import BookInfo from '../BookInfo';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SlideBookMini from '@/Components/SlideBookMini';
import MainTrade from '../MainTrade';
import TradeProcess from '../TradeProcess1'
import bgExchangebook from '/bgExchangebook.png';
import { useSession } from 'next-auth/react';


import HashLoader from "react-spinners/HashLoader";
import { on } from 'events';


const BookInfoMain: React.FC = ( ) => {
  const [trade, setTrade] = useState(false)
  const [bookId, setBookId] = useState('')

  const router = useRouter();
  const { BookId } = router.query;
  console.log(BookId)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
        router.push('/login')
    }
}, [status, router])

  useEffect(() => {
    const fetchData = async () => {
      
      if (BookId) {
        setBookId(BookId as string); // Set the bookId state
      }
    };

    // เรียกใช้ fetchData เมื่อ router.query มีค่า
    if (router.query !== undefined) {
      fetchData();
    }

    console.log('router.query', router.query); // แสดง router.query ที่ console

  }, [router]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         if (BookId) {
              
  //             if (typeof BookId === 'string') {
  //                 console.log('BookId',BookId)
  //             }
              
  //             // try {
  //             //     const response = await axios.get(`/api/book/${BookId}`);
  //             //     const addresses = response.data.address.address;
  //             // } catch (error) {
  //             //     console.error('Error fetching address data:', error);
  //             // }
  //         }
  //     };

  //     fetchData();
  // }, [BookId]);

  
  return (
    <>
      <style>
        {`
          body {
              overflow-x: hidden;
          }
        `}
      </style>
      {trade ?<MainTrade setTrade={setTrade} bookId={bookId}/>
            :<BookInfo setTrade={setTrade}/>}

      
    </>
  )
}

export default BookInfoMain