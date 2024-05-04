'use client'

import { Icon } from '@iconify/react';
import { useState } from "react";
import Navbar from '@/Components/Navbar';
import TitleBar from '@/Components/TitleBar';
import Footer from '@/Components/Footer';
import React from 'react'

function Libraly() {
    return (<>
            <Navbar />
            <TitleBar textTitle='คลังหนังสือของฉัน'/>
            <div 
            style={{minHeight: "800px"}}
            className="flex justify-center items-center h-96">
                
            </div>
            <Footer/>

    </>
        
    )
}

export default Libraly