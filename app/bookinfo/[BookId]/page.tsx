'use client'

import React,{ useState, useEffect, useRef }  from 'react'
// import { useRouter } from 'next/router';
import { useParams, useRouter } from 'next/navigation';
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
import axios from 'axios';

import HashLoader from "react-spinners/HashLoader";
import { on } from 'events';


const BookInfoMain: React.FC = ( ) => {
  const [loading, setLoading] = useState(true)
  const [trade, setTrade] = useState(false)
  const [bookInfo, setBookInfo] = useState()

  const [ onPost, setOnPost ] = useState(false)
  const [ bookId, setBookId ] = useState('')
  const router = useRouter();
  const param = useParams<{ BookId?: string }>();

  const { data: session, status } = useSession()
  
  useEffect(() => {
    if(param.BookId){
      setBookId(param.BookId)
    }
  }, [param.BookId]);

  useEffect(() => {
      const fetchData = async () => {
          if (bookId) {
              try {
                  
                  const response = await axios.get(`/api/book/${bookId}`);
                  console.log(bookId,'response.data-------',response.data);
                  
                  if (response.data.bookinfo.isPost_trade){
                    setOnPost(true)
                    setBookInfo(response.data);
                    setLoading(false)
                  }else{
                    setOnPost(false)
                    setLoading(false)
                  }
              } catch (error) {
                  setOnPost(false)
                  setLoading(false)
                  console.error('Error fetching address data:', error);
              }
          }
      };

      fetchData();
  }, [bookId]);
  
  return (
    <>
      <style>
        {`
          body {
              overflow-x: hidden;
          }
        `}
      </style>
      {loading ?<div className="flex justify-center h-screen items-center">
                        <HashLoader
                            className="ml-1 duration-300 "
                            color='#435585' loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
                    </div>
      :(trade ?<MainTrade setTrade={setTrade} bookId={bookId} bookInfo={bookInfo}/>
            :(onPost ?<BookInfo setTrade={setTrade} bookInfo={bookInfo}/>
            :<div className="flex justify-center items-center h-screen text-3xl font-bold bg-yellow-50">Not Found !</div>))}

      
    </>
  )
}

export default BookInfoMain