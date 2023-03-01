import React, { useRef } from "react";

function Switch({ label, onChange, defaultChecked = false }) {

    const switchRef = useRef();

    const handleChange = e => {
        const label = switchRef.current.children[0];
        ['text-gray-800', 'text-primary', 'dark:text-gray-300'].map(cls => { label.classList.toggle(cls); });
        ['border', 'border-primary', 'bg-primary'].map(cls => { switchRef.current.lastChild.classList.toggle(cls); });
        ['left-0.5', 'left-[25px]', 'bg-white'].map(cls => { switchRef.current.lastChild.firstChild.classList.toggle(cls); });
        onChange(e);
    };

    return (
        <div ref={switchRef} className="w-full h-6 flex flex-row-reverse justify-start items-center relative">
            <label htmlFor={label} className="w-[calc(100%_-_48px)] absolute top-0.5 xsm:top-0 bottom-0 my-auto text-sm sm:text-base right-0 break-words text-gray-800 dark:text-gray-300 font-medium">{label}</label>
            <input id={label} type="checkbox" defaultChecked={defaultChecked} className="w-12 h-5 z-50 absolute top-0.5 left-0 appearance-none cursor-pointer outline-none" onChange={handleChange} />
            {/* <div className="w-12 h-6 bg-white rounded absolute top-0 border border-primary p-0.5 switch-off">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
            </div>
            <div className="w-12 h-6 bg-primary rounded absolute top-0 p-0.5 switch-on">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                    <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zM12 10.5a.75.75 0 01.75.75v4.94l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72v-4.94a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
            </div> */}
            <div className="w-12 h-6 border border-primary rounded absolute left-0 top-0 p-[1px]">
                <span className="inline-block w-5 h-5 absolute left-0.5 border border-primary dark:bg-white rounded-full transition-all ease-linear duration-150" />
            </div>
        </div>
    );
}

export default Switch;