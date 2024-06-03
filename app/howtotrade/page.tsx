import React from 'react'
import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import TitleBar from '@/Components/TitleBar'

export default function text() {
  return (
    <> 
        <Navbar backGroundOn withTitle/>
        <TitleBar textTitle='How To Trade' />
        <Footer />
    </>
  )
}
