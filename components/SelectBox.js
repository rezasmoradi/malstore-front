import React, { useState } from "react"
import TextField from "./TextField";
import { useEffect } from "react";

function SelectBox({ label = '', id = '', required = false, defaultValue = null, data = [], onSelect = () => { }, className = '' }) {

    const comboRef = React.useRef()
    const [value, setValue] = useState('')

    const handleSelect = (e, item) => {
        e.preventDefault()
        setValue(item.name)
        comboRef.current.classList.add('hidden')

        onSelect(item)
    }

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    return (
        <div className={`w-full h-16 relative mb-2 ${className}`} tabIndex={0} onBlur={(e) => { e.currentTarget.children[1].classList.add('hidden') }}>
            <TextField id={id} required={required} disabled={true} readOnly={true} label={label} value={value} onClick={() => {
                comboRef.current.classList.toggle('hidden');
                comboRef.current.focus();
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute top-6 left-2 w-6 h-6 text-slate-600 dark:text-slate-300 animate-fade cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
            </TextField>
            <div ref={comboRef} className="w-full absolute h-auto min-h-[2.5rem] bg-white dark:bg-slate-800 border-2 dark:border-slate-500 rounded z-50 shadow-md hidden" onBlur={(e) => { e.currentTarget.classList.add('hidden') }}>
                <ul>
                    {data ? data.map((item, index) =>  <li key={index} onClick={(e) => { handleSelect(e, item) }} className="w-full h-10 leading-8 hover:bg-primary dark:hover:bg-slate-500 transition-colors duration-75 p-1 border-b cursor-pointer last:border-none dark:border-slate-500 dark:text-gray-300">
                            {item.name}
                        </li>) : (
                            <li className="w-full h-10 leading-7 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors duration-75 p-1 border-b cursor-pointer last:border-none dark:border-slate-500 dark:text-gray-300">زیرمجموعه‌ای یافت نشد</li>
                        )}
                </ul>
            </div>
        </div>
    )
}

export default SelectBox