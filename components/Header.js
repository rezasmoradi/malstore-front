import React, { useRef } from "react";
import Image from 'next/image';
import { useRouter } from "next/dist/client/router";

import Theme from "./Theme";
import Link from "next/link";

function Header() {

    const router = useRouter();
    const searchRef = useRef(null);

    const prepareSearching = () => {
        searchRef.current.classList.remove('animate-slideTop');
        ['hidden', 'block', 'animate-slideDown'].map(cls => { searchRef.current.classList.toggle(cls); });
        searchRef.current.firstChild.firstChild.focus();
    };

    const cancelSearching = e => {
        const target = e.currentTarget;
        if (target === searchRef.current) {
            searchRef.current.classList.remove('animate-slideDown');
            target.classList.toggle('animate-slideTop');
            setTimeout(() => {
                ['hidden', 'block'].map(cls => { target.classList.toggle(cls); });
            }, 375);
        }
    };

    return (
        <header className="w-full h-auto mb-4 sm:mb-8 pt-2">
            <div className="hidden w-full h-full sm:flex justify-between items-center">
                <div className="w-5/12 h-full flex justify-start items-center relative">
                    <button className="w-10 h-10 flex justify-center items-center outline-none" onClick={prepareSearching}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                    <div ref={searchRef} className="w-8/12 h-auto hidden fixed top-20 left-0 right-0 mx-auto bg-slate-100 z-10 shadow-md rounded" onBlur={cancelSearching}>
                        <div className="w-10/12 relative h-12 my-1 mx-auto px-2 border bg-white">
                            <input type="text" placeholder="جستجوی محصولات" onBlur={cancelSearching} className="w-11/12 h-11 border-primary rounded dark:shadow-none outline-none font-medium text-gray-900 dark:text-gray-300" />
                            <button className="w-10 h-10 absolute top-1 left-0 outline-none" onClick={prepareSearching}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <span className="inline-block w-2 h-10 border-r border-primary mx-8" />
                    <div className="w-10 h-10">
                        <Theme />
                    </div>
                </div>
                <div className="w-2/12 h-16 flex justify-center items-center">
                    <img src={`${router.basePath}/assets/images/logo.svg`} className="w-16 h-16" />
                </div>
                <div className="w-5/12 h-full flex justify-end items-center">
                    <a href="/profile" className="w-8 md:w-10 h-8 md:h-10 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary cursor-pointer">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                        </svg>
                    </a>
                    {/* <span className="inline-block w-1 md:w-2 h-10 border-r border-primary mx-2 md:mx-8" />
                    <button className="w-8 md:w-10 h-8 md:h-10 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-primary dark:text-violet-400">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                    </button> */}
                    <span className="inline-block w-2 h-10 border-r border-primary mx-8" />
                    <button className="w-10 h-10 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="w-full h-auto flex flex-col sm:hidden justify-between items-center">
                <div className="w-full h-14 flex flex-row sm:hidden justify-between items-center">
                    <Theme />
                    <div className="w-14 h-14 flex justify-center items-center">
                        <img src={`${router.basePath}/assets/images/logo.svg`} className="w-full h-full" />
                    </div>
                    <button className="w-10 h-10 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </button>
                </div>
                <span className="inline-block w-full h-0.5 border-t mt-2" />
                <div className="w-full h-14 flex flex-row sm:hidden justify-between items-center">
                    <div className="w-1/2 h-auto relative">
                        <button className="w-10 h-10 flex justify-center items-center outline-none" onClick={prepareSearching}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                        <div ref={searchRef} className="w-11/12 h-auto hidden fixed top-20 left-0 right-0 mx-auto bg-slate-100 z-10 px-1 shadow-md rounded" onBlur={cancelSearching}>
                            <div className="w-full relative h-12 my-1 mx-auto px-2 border bg-white rounded-sm">
                                <input type="text" placeholder="جستجوی محصولات" onBlur={cancelSearching} className="w-11/12 h-11 border-primary rounded text-sm dark:shadow-none outline-none font-medium text-gray-900 dark:text-gray-300" />
                                <div className="w-8 h-8 absolute top-3 left-0 outline-none" onClick={prepareSearching}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 h-auto">
                        <div className="w-full h-10 flex justify-end items-center" onClick={() => { router.push('/login') }}>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-300 px-1">ورود</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rotate-180 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;