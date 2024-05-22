'use client'
import TitleBar from '@/Components/TitleBar'
import React from 'react'
import Navbar from '@/Components/Navbar'

export default function Admin(){
  return (
    <>
        <Navbar backGroundOn/>
        <div className="flex w-screen h-screen">
            <div>
                <div className='flex w-fit h-fit '>
                    <TitleBar textTitle="รายชื่อ User ทั้งหมด"/>
                </div>
                <div className="flex flex-wrap">
                </div>
            </div>
        </div>
    </>
  )
}

