import React, { useEffect, useRef, useState } from "react"
import TextField from "./TextField"


const ComboBox = React.forwardRef(({ data, id = null, label = '', defaultValue = '', required = false, hint = '', multiple = false, onChange = null, onSelect = null }, ref) => {

    const [items, setItems] = useState(data)
    const [value, setValue] = useState('')
    const comboRef = useRef()

    const handleCombo = e => {
        const targetVal = e.target.value.trim();
        setValue(targetVal);
        comboRef.current.classList.remove('hidden');
        comboRef.current.focus();

        const newItems = data.filter(item => item.name.match(targetVal));
        setItems(newItems);
    };

    const handle = (e, item) => {
        e.preventDefault();
        setValue(item.name);
        comboRef.current.classList.add('hidden');

        if (typeof onSelect === 'function') onSelect(item)
    }

    useEffect(() => {
        if (typeof onChange === 'function') onChange(value)
    }, [value])

    useEffect(() => {
        setItems(data)
    }, [data])

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    return (
        <div className="w-full h-auto relative mb-2" tabIndex={0} onBlur={(e) => { e.currentTarget.children[1].classList.add('hidden') }}>
            <TextField id={id} ref={ref} label={label} hint={hint} required={required} value={value} onChange={handleCombo} inputClassName="pl-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => {
                    comboRef.current.classList.toggle('hidden');
                    comboRef.current.focus();
                }} className="absolute top-6 left-2 w-6 h-6 text-slate-600 dark:text-slate-300 animate-fade cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
            </TextField>
            <div ref={comboRef} className="w-full absolute h-auto min-h-[2.5rem] bg-white dark:bg-slate-800 border-2 dark:border-slate-500 rounded z-50 shadow-md hidden" onBlur={(e) => { e.currentTarget.classList.add('hidden') }}>
                <ul>
                    {items && items.map((item, index) => (
                        <li key={index} onClick={(e) => { handle(e, item) }} className="w-full h-10 leading-7 hover:bg-secondary dark:hover:text-gray-900 transition-colors duration-75 p-1 border-b cursor-pointer last:border-none dark:border-slate-500 dark:text-gray-300">
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            {multiple && (
                <div>
                </div>
            )}
        </div>
    );
})

export default ComboBox;