'use client'
import { set } from "mongoose";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";



interface Props<T> {
    results?: T[];
    renderItem: (item: T) => JSX.Element;
    onChange?: React.ChangeEventHandler;
    onSelect?: (item: T) => void;
    value?: string;
}

const Searchbar = <T extends object>({
   results=[], 
   renderItem,
   onChange,
   value,
   onSelect
   }: Props<T>): JSX.Element => {
      const [focusedIndex, setFocusedIndex] = useState(-1);
      const resultContainer = useRef<HTMLDivElement>(null);
      const [showResults, setShowResults] = useState(false);
      const [defaultValue, setDefaultValue] = useState("");

      const handleSelection = (selectedIndex: number) => {
         const selectedItem = results[selectedIndex];
         if (!selectedItem) return resetSearchComplete();
         onSelect && onSelect(selectedItem);
         resetSearchComplete();
      };

      const resetSearchComplete = useCallback(() => {
         setFocusedIndex(-1);
         setShowResults(false);
      }, []);

   const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      const { key } = e;
      let nextIndexCount = 0;

      if (key === "ArrowDown"){
         e.preventDefault();
         nextIndexCount = (focusedIndex + 1) % results.length;
      }

      if (key === "ArrowUp"){
         e.preventDefault();
         nextIndexCount = (focusedIndex + results.length - 1) % results.length;
      }

      if (key === "Escape"){
         resetSearchComplete();
      }

      if (key === "Enter"){
         e.preventDefault();
         handleSelection(focusedIndex);
      }
      setFocusedIndex(nextIndexCount);
   };

   type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
   const handleChange: changeHandler = (e) => {
      setDefaultValue(e.target.value);
      onChange && onChange(e);
   }

      useEffect(() => {
         if (!resultContainer.current) return;

         resultContainer.current.scrollIntoView({
            block: "nearest"
         });
      }, [focusedIndex])

      useEffect(() => {
         if (results.length > 0 && !showResults) setShowResults(true)

         if (results.length <=0) setShowResults(false)
      },[results])

      useEffect(() => {
         if (value) setDefaultValue(value)
      },[value])

    return (
        <div 
        tabIndex={1} 
        onKeyDown={handleKeyDown} 
        onBlur={resetSearchComplete}
        className="relative w-5/12 mt-8 z-40">
            <input 
               value={defaultValue}
               onChange={handleChange}
               type="search" 
               id="search" 
               className="block rounded-3xl w-full p-4 ps-4 text-l text-gray-900" placeholder="ระบุหนังสือที่ต้องการค้นหาที่นี่" required />
            <button type="submit" className="text-white absolute end-2.5 bottom-1.5 bg-dark1 hover:bg-dark2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-xl px-14 py-2 ">ค้นหา</button>

            {/* Search Suggest */}
            {showResults && (
               <div className="absolute  bg-white w-full mt-1 p-4 rounded-2xl shadow-lg max-h-56 overflow-y-auto">
               {results.map((item, index) => {
                     return (
                        <div 
                        key={index} 
                        onMouseDown={() => handleSelection(index)}
                        ref={index === focusedIndex ? resultContainer : null}
                        style={{
                           backgroundColor:
                             index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
                         }}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-2xl">
                        {renderItem(item)}
                        </div>
                     )
               })
            }
            </div>)}
        </div>
    )
}

export default Searchbar;


