import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import TitleBar from '@/Components/TitleBar'
import React from 'react'

export default function aboutus() {
  return (
    <>
        <Navbar backGroundOn withTitle/>
        <TitleBar textTitle='About Us' />
        <div className="flex min-h-screen w-full h-full flex-col justify-center items-center">
          <div className="flex flex-col w-10/12 h-max justify-center items-center">
            <img src="https://media.discordapp.net/attachments/701337773969375253/1247263257635459082/Screenshot_2024-06-04_014940.png?ex=665f63ed&is=665e126d&hm=eed2944a3ef48b7c290111d679c0cdfde85397905d5b9b65f798ebc8bafa7139&=&format=webp&quality=lossless&width=1620&height=905" alt="About Us" className='w-full h-full object-cover rounded-lg shadow-lg'/>
          </div>
        </div>
        <Footer />
    </>
  )
}
