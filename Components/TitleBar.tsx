import React from 'react'

interface TitleProps {
    textTitle: string;
}

const TitleBar: React.FC<TitleProps> = ({textTitle}) =>{
    return (
        <>
            <div 
            className="flex justify-center items-center h-40 text-6xl text-white shadow-lg w-screen z-10 bg-dark3">
                {textTitle}
            </div>
        </>
    )
}

export default TitleBar