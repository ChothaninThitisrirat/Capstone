'use client'

import React from 'react'
import logoLite from '../public/images/logoLite.png';
import propFooter from '../public/images/propFooter.png';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

function Footer() {

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
    <>
        <footer 
        style={{backgroundColor: '#435585'}}
        className="flex justify-center items-center w-screen h-56 relative mt10">
            <div
            style={{maxWidth: '2200px'}}
            className="flex justify-around items-center w-screen h-56 relative mt10">
                <Image
                    src={propFooter}
                    alt="Logo"
                    className='absolute top-0 left-40 w-20 -translate-y-3.5 object-contain z-40'
                />
                <div className="col-lg-4 col-md-6 col-sm-6">
                <Link href='/'>
                    <div className="flex items-center justify-center">
                        <Image
                        src={logoLite}
                        alt="Logo"
                        className='w-16 object-contain cursor-pointer translate-x-3'
                        /> 
                        <div className="text-4xl text-white -translate-y-2">-Trade Webside</div>
                    </div>
                    
                </Link>
                
                <div className="flex text-white mt-3 items-center justify-center">Connect with B-Trade</div>
                    <div className="flex w-full items-center justify-center gap-5 mt-2">
                        <Icon icon="logos:facebook" width="30" height="30" 
                        className=' cursor-pointer'/>
                        <Icon icon="logos:youtube-icon" width="35" height="35" 
                        className=' cursor-pointer'/>
                    </div>  
                </div>
                <div className=" flex-col">
                    <h2 className='text-2xl text-white mb-3'>Learn More</h2>
                    <div>
                        <Link className='text-sm text-gray-400 mb-2 hover:text-gray-200 cursor-pointer' href="/">Home</Link>
                    </div>
                    <div>
                        <Link className='text-sm text-gray-400 mb-2 hover:text-gray-200 cursor-pointer' href="/">About Us</Link>
                    </div>
                    <div>
                        <Link className='text-sm text-gray-400 mb-2 hover:text-gray-200 cursor-pointer' href="/">How to Trade</Link>
                    </div>
                    <div>
                        <Link className='text-sm text-gray-400 mb-2 hover:text-gray-200 cursor-pointer' href="/">FAQ</Link>
                    </div>
                    <div>
                        <Link className='text-sm text-gray-400 mb-2 hover:text-gray-200 cursor-pointer' href="/">Teams</Link>
                    </div>
                    
                </div>
                <button 
                onClick={handleScrollTop} 
                className="flex items-center justify-center absolute w-12 h-12 bg-slate-200 rounded-full top-0 right-40 -translate-y-5 cursor-pointer hover:bg-slate-300">
                    <Icon icon="mingcute:up-line" width="50" height="50" 
                    className='text-black'/>
                </button>
            </div>
        </footer>
    </>
    )
}

export default Footer
