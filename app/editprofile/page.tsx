'use client'

import Navbar from "@/Components/Navbar";
import React, { FC, useState } from 'react';

function Page() {
  return (
    <>
      <div className="h-screen overflow-y-hidden">
        <Navbar backGroundOn />
        <div className="flex justify-center items-center w-full h-full bg-dark2">
            <div className="flex flex-col justify-center w-1/5 bg-white h-full drop-shadow-2xl rounded-tr-3xl ">
            
              <div className='w-110 h-110 mt-10 bg-cover bg-black bg-no-repeat rounded-full' style={{backgroundImage: "url('https://picsum.photos/200/300')"}} />
              <div className="flex font-bold text-6xl">Username</div>
            </div>
            <div className="w-4/5 bg-dark3 h-full ">
              <div className="flex items-center w-full h-1/6 bg-dark2 rounded-br-3xl">
                <p className="text-6xl font-bold pl-8 text-white"> Edit Profile </p>
              </div>
              <div className="flex flex-row justify-evenly items-center w-full h-16 bg-dark3 ">
                <div className="text-white font-bold">แก้ไขโปรไฟล์</div>
                <div className="text-white font-bold">ข้อมูลการจัดส่ง</div>
                <div className="text-white font-bold">ข้อมูลการติดต่อ</div>
              </div>
              <div className="w-full h-full bg-white">

              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Page;