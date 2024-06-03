import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import TitleBar from '@/Components/TitleBar'
import React from 'react'

export default function aboutus() {
  return (
    <>
        <Navbar backGroundOn withTitle/>
        <TitleBar textTitle='About Us' />
        <Footer />
    </>
  )
}
