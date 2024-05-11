'use client'

import React,{ useState, useEffect, useRef }  from 'react'
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Image from 'next/image';
import Link from 'next/link';
import BookInfo from './BookInfo';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SlideBookMini from '@/Components/SlideBookMini';
import MainTrade from './MainTrade';
import TradeProcess from './TradeProcess1'
import bgExchangebook from '../../public/images/bgExchangebook.png';


import HashLoader from "react-spinners/HashLoader";
import { on } from 'events';

function BookInfoMain() {
  const [trade, setTrade] = useState(true)
  const [bookId, setBookId] = useState('')
  
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