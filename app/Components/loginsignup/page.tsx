'use client'

import React, { use, useEffect } from 'react'
import LoginFrom from './LoginForm'
import SignupFrom from './SignupFrom'
import { Icon } from '@iconify/react';
import { useState } from "react";
import Image from 'next/image';
import bgPropBook from '../../../public/images/bgPropBook.png'
import bgPropBlue1 from '../../../public/images/bgPropBlue1.png'
import bgPropBlue2 from '../../../public/images/bgPropBlue2.png'
import logologinsignup from '../../../public/images/logologinsignup.png'



function LoginSignup() {

  const [stylesingup, setStylesingup] = useState(false)
  const [stylesingupOn, setStylesingupOn] = useState({
      transform:'translateX(30%)',
      transitionDuration: '3s',
  });

  const [stylelogin, setStylelogin] = useState(true)
  const [styleloginOn, setStyleloginOn] = useState({
    transform:'translateX(200%)',
    transitionDuration: '3s'
    
  })


  const [stylebgPropBook, setStylebgPropBook] =useState ({
    width:'1400px',
    transform:'translateX(0%) translateY(-35%)',
    transitionDuration: '4s'
  })
  const [stylebgPropBlue1, setStylebgPropBlue1] =useState ({
    width:'2000px',
    transform:'translateX(-70%) translateY(55%)',
    transitionDuration: '4.5s'
  })
  const [stylebgPropBlue2, setStylebgPropBlue2] =useState ({
    width:'2000px',
    transform:'translateX(-35%) translateY(80%)',
    transitionDuration: '3s'
  })
  const [stylelogologinsignup, setStylelogologinsignup] =useState ({
    width:'40%',
    transform:'translateX(25%) translateY(10%)',
    transitionDuration: '3s'
  })
  useEffect(() => {
    if (stylelogin) {//Login
      setStyleloginOn({
        transform:'translateX(-40%)',
        transitionDuration: '3s'
      })
      setStylesingupOn({
        transform:'translateX(-200%)',
        transitionDuration: '3s'
      })
      setStylebgPropBook({
        width:'1400px',
        transform:'translateX(0%) translateY(-35%)',
        transitionDuration: '4s'
      })
      setStylebgPropBlue1({
        width:'2000px',
        transform:'translateX(-70%) translateY(55%)',
        transitionDuration: '4.5s'
      })
      setStylebgPropBlue2({
        width:'2000px',
        transform:'translateX(-35%) translateY(80%)',
        transitionDuration: '3s'
      })
      setStylelogologinsignup({
        width:'40%',
        transform:'translateX(25%) translateY(10%)',
        transitionDuration: '3s'
      })
    } else { //Singup
      setStyleloginOn({
        transform:'translateX(200%)',
        transitionDuration: '3s'
      })
      setStylesingupOn({
        transform:'translateX(30%)',
        transitionDuration: '3s'
      }) 
      setStylebgPropBook({
        width:'1400px',
        transform:'translateX(55%) translateY(-35%)',
        transitionDuration: '4s'
      })
      setStylebgPropBlue1({
        width:'2000px',
        transform:'translateX(50%) translateY(60%)',
        transitionDuration: '4.5s'
      })
      setStylebgPropBlue2({
        width:'2000px',
        transform:'translateX(20%) translateY(75%)',
        transitionDuration: '3s'
      })
      setStylelogologinsignup({
        width:'40%',
        transform:'translateX(110%) translateY(10%)',
        transitionDuration: '3s'
      })
    }
  }, [stylelogin])
  
  // useEffect(() => {
    
  //   console.log('stylesingup', stylesingup)
  //   console.log('stylelogin', stylelogin)
  // }, [stylesingup, stylelogin])

  return (
    <>
    <style>
      {`
      * {
        overflow: hidden;
      }
      `}
    </style>
    <div className="h-screen bg-gradient-to-tr from-yellow-100 to-blue-100">
    <Image
      src={bgPropBook}
      alt="Picture bg"
      style={stylebgPropBook}
      className='object-contain z-10 absolute top-0 left-0'
    />
    <Image
      src={bgPropBlue1}
      alt="Picture bg"
      style={stylebgPropBlue1}
      className='object-contain z-10 absolute bottom-0 left-0'
    />
    <Image
      src={bgPropBlue2}
      alt="Picture bg"
      style={stylebgPropBlue2}
      className='object-contain z-10 absolute bottom-0 left-0'
    />
    <Image
      src={logologinsignup}
      alt="Picture bg"
      style={stylelogologinsignup}
      className='object-contain z-10 absolute top-0 left-0'
    /></div>
    





    <div 
    style={stylelogin ? {visibility:'visible'} : {visibility:'hidden'}}
    className="flex items-center justify-end absolute top-0 left-0 h-screen w-screen z-20"
    >
      <div 
      style={styleloginOn}
      className="w-auto" >
        <LoginFrom setStylesingup={setStylesingup} setStylelogin={setStylelogin}/>
      </div>
    </div >
    <div 
    style={stylesingup ? {visibility:'visible'} : {visibility:'hidden'}}
    className="flex items-center justify-start absolute top-0 left-0 h-screen w-screen z-20">
      <div 
      style={stylesingupOn}
      className="w-auto" >
        <SignupFrom setStylesingup={setStylesingup} setStylelogin={setStylelogin}/>
      </div>
    </div >

      

      
    
    </>
  )
}

export default LoginSignup