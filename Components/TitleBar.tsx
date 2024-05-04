import React from 'react'

interface TitleProps {
    textTitle: string;
}

const TitleBar: React.FC<TitleProps> = ({textTitle}) =>{
    return (
        <>
            <div 
            style={{backgroundColor: "#818FB4"}}
            className="flex justify-center items-center h-52 text-6xl pt-16 text-white shadow-lg w-screen">
                {textTitle}
            </div>
        </>
    )
}

export default TitleBar