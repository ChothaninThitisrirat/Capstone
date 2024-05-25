import React from 'react'

interface TitleProps {
    textTitle: string;
}

const TitleBar: React.FC<TitleProps> = ({textTitle}) =>{
    return (
        <>
            <div 
            className="flex justify-center items-center h-28 text-3xl text-white shadow-lg w-screen z-10 bg-dark3 sm:text-6xl sm:h-40 ">
                {textTitle}
            </div>
        </>
    )
}

export default TitleBar