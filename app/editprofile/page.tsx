'use client'

import Navbar from "@/Components/Navbar";
import React, { FC, useState } from 'react';

function Page() {
  return (
    <>
        <Navbar backGroundOn />
        <div className="flex justify-center items-center w-full h-screen bg-dark2">
            <div className="w-1/5 bg-white h-full">
                E1
            </div>
            <div className="w-4/5 bg-dark3 h-full">
                E2
            </div>
        </div>
    
    </>
  );
}

export default Page;