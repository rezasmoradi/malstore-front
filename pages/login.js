import React, { useEffect, useRef, useState } from "react";

import TextField from "../components/TextField";
import Image from "next/image";
import Theme from "../components/Theme";


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [textType, setTextType] = useState('');
    const arrowRef = useRef();


    return (
        <div className="w-full h-screen transition-all duration-500 animate-fade bg-gradient-to-bl from-slate-50 to-slate-100 bg-slate-200/30 dark:bg-gradient-to-bl dark:from-slate-600 dark:to-slate-800">
            <div className="hidden md:block w-10/12 lg:w-1/2 h-auto mx-auto pt-16">
                <div className="flex flex-row justify-around border-2 dark:border-slate-600 rounded-lg py-4 shadow-sm dark:shadow-slate-600 backdrop-blur-md">
                    <div className="w-11/12 mx-auto md:mx-0 md:w-1/2 h-96 bg-slate-100/20 dark:bg-slate-600/10 shadow shadow-slate-200 dark:shadow-slate-600 before:-z-10 before:backdrop-blur-md dark:before:brightness-150 before:blur-sm before:bg-center before:w-10/12 md:before:w-1/2 before:h-96 before:bg-[url('/assets/images/logo.svg')] before:bg-no-repeat before:opacity-10 before:content-[''] before:absolute rounded mb-6">
                        <div className="flex justify-end">
                            <Theme />
                        </div>
                        <h1 className="text-gray-900 dark:text-gray-300 text-center text-base msm:text-xl mt-8">ورود به حساب کاربری</h1>
                        <div className="relative">
                            <p className="text-gray-900 dark:text-gray-300 mt-8 text-sm msm:text-base text-center">حساب کاربری ندارید؟</p>
                            <div ref={arrowRef} className="w-9/12 h-24 -mr-2 transition-all duration-300 animate-fade bg-[url('/assets/NfiJyM01.svg')] bg-contain bg-no-repeat -scale-x-95 dark:invert bg-right" />
                            <div className="w-full h-11 flex justify-center">
                                <a
                                    href="/register"
                                    onMouseOver={() => { arrowRef.current.classList.add('invisible'); }}
                                    onMouseLeave={() => { arrowRef.current.classList.remove('invisible'); }}
                                    onTouchStart={() => { arrowRef.current.classList.add('invisible'); }}
                                    onTouchEnd={() => { arrowRef.current.classList.remove('invisible'); }}
                                    className="w-28 h-9 msm:h-10 border border-slate-300 dark:border-slate-500 rounded text-sm msm:text-base text-center pt-1.5 dark:mix-blend-color-dodge before:mix-blend-multiply text-gray-900 dark:text-gray-300 mx-auto font-medium hover:font-light relative before:absolute before:content-[''] before:transition-all before:top-0 before:left-0 before:w-0 before:h-9 msm:before:h-10 before:rounded before:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] hover:before:w-28 hover:before:opacity-60 hover:before:bg-slate-300 dark:hover:before:bg-slate-600 before:duration-500">
                                    ثبت&zwnj;نام
                                </a>
                            </div>
                        </div>
                        <p className="w-full text-gray-900 dark:text-gray-300 text-xs absolute bottom-0 left-0 right-0 text-center pb-2">
                            فروشگاه مال&zwnj;استور
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline-block">
                                <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
                            </svg>
                            1401
                        </p>
                    </div>
                    <div className="w-11/12 mx-auto md:mx-0 md:w-2/5 h-96 relative">
                        <div className="w-full h-40 flex flex-col justify-center items-center">
                            <TextField
                                id="username"
                                autoFocus
                                label="نام کاربری"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value.trim()); }}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1 text-primary dark:text-secondary">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                </svg>
                                } />
                            <div className="my-1" />
                            <TextField
                                label={'رمز عبور'}
                                id="password"
                                type={textType}
                                value={password}
                                // error={error}
                                onChange={e => { setPassword(e.target.value.trim()); }}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1 text-primary dark:text-secondary">
                                    <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
                                </svg>}
                            >
                                {password !== '' &&
                                    <button tabIndex={-1} onClick={() => { setTextType(textType === 'password' ? 'text' : 'password'); }}>
                                        {textType === 'password' ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute top-6 right-4 w-6 h-6 text-slate-600 dark:text-slate-300 animate-fade">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute top-6 right-4 w-6 h-6 text-slate-600 dark:text-slate-300 animate-fade">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        }
                                    </button>
                                }
                                {/* {error &&
                                        <span className="absolute top-full text-sm px-2 mt-1 text-red-600 dark:text-red-500 animate-fade">
                                            رمز عبور صحیح نیست
                                        </span>
                                    } */}
                            </TextField>
                        </div>
                        <div className="w-full h-auto flex flex-col justify-center items-center">
                            <button className="text-center text-gray-900 text-sm font-medium my-8 dark:text-gray-300">
                                فراموشی رمز عبور
                            </button>
                            <button className="w-10/12 md:w-32 h-10 mt-8 md:ml-6 mx-auto lg:ml-0 backdrop-blur-2xl outline-none bg-gradient-to-br from-white/10 to-white/50 dark:from-gray-600/20 dark:to-gray-600/50 border dark:border-slate-600 rounded dark:shadow-slate-700/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-gray-900 dark:text-gray-300 text-semi-small font-medium md:mx-2 before:content-[''] before:w-0 before:h-0 hover:before:w-full md:hover:before:w-32 hover:before:h-10 before:duration-300 before:rounded before:transition-all before:absolute before:bottom-0 before:left-0 hover:before:bg-gradient-to-tr hover:before:from-slate-400/20 hover:before:to-slate-400/10 dark:hover:before:from-white/20 dark:hover:before:to-white/10">
                                ورود
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block md:hidden w-full h-auto">
                <div className="flex relative flex-col justify-around dark:border-slate-600 rounded-lg pt-4 backdrop-blur-md">
                    <div className="w-11/12 mx-auto h-auto bg-slate-100/20 dark:bg-transparent before:-z-10 before:backdrop-blur-md dark:before:brightness-150 before:blur-sm before:bg-center before:w-10/12 before:h-96 before:bg-[url('/assets/images/logo.svg')] before:bg-no-repeat before:opacity-10 before:content-[''] before:absolute rounded mb-6">
                        <div className="flex justify-end absolute left-4 msm:left-12 top-2 msm:top-11">
                            <Theme />
                        </div>
                        <h1 className="text-gray-900 dark:text-gray-300 text-center text-base msm:text-xl mt-8">ورود به حساب کاربری</h1>
                        <div className="w-11/12 mx-auto h-auto relative mt-6">
                            <div className="w-full msm:w-2/3 h-40 mx-auto flex flex-col justify-center items-center">
                                <TextField
                                    id="username"
                                    autoFocus
                                    label="نام کاربری"
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value.trim()); }}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1 text-primary dark:text-secondary">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                                    } />
                                <div className="my-1" />
                                <TextField
                                    label={'رمز عبور'}
                                    id="password"
                                    type={textType}
                                    value={password}
                                    // error={error}
                                    onChange={e => { setPassword(e.target.value.trim()); }}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1 text-primary dark:text-secondary">
                                        <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
                                    </svg>}
                                >
                                    {password !== '' &&
                                        <button tabIndex={-1} onClick={() => { setTextType(textType === 'password' ? 'text' : 'password'); }}>
                                            {textType === 'password' ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute top-6 right-4 w-6 h-6 text-slate-600 dark:text-slate-300 animate-fade">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute top-6 right-4 w-6 h-6 text-slate-600 dark:text-slate-300 animate-fade">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            }
                                        </button>
                                    }
                                    {/* {error &&
                                        <span className="absolute top-full text-sm px-2 mt-1 text-red-600 dark:text-red-500 animate-fade">
                                            رمز عبور صحیح نیست
                                        </span>
                                    } */}
                                </TextField>
                            </div>
                            <div className="w-full msm:w-2/3 h-auto mx-auto flex flex-col justify-center items-center">
                                <button className="w-10/12 h-10 mt-8 mx-auto outline-none bg-primary border dark:border-slate-600 rounded py-1 px-4 text-gray-100 text-semi-small font-medium">
                                    ورود
                                </button>
                                <button className="text-center text-gray-900 text-sm font-medium mt-8 dark:text-gray-300">
                                    فراموشی رمز عبور
                                </button>
                            </div>
                            <div className="relative mt-8 mb-2 flex flex-col justify-center items-center">
                                <p className="text-gray-900 dark:text-gray-300 text-sm msm:text-base text-center">حساب کاربری ندارید؟</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
                                </svg>
                                <div className="w-full h-11 mt-1 flex justify-center">
                                    <a
                                        href="/register"
                                        className="w-28 h-10 border border-slate-300 dark:border-slate-500 rounded text-sm text-center pt-2 text-gray-900 dark:text-gray-300 mx-auto font-medium">
                                        ثبت&zwnj;نام
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="w-full text-gray-900 dark:text-gray-300 text-xs absolute bottom-0 left-0 right-0 text-center pb-2">
                    فروشگاه مال&zwnj;استور
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline-block">
                        <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
                    </svg>
                    1401
                </p>
            </div>
        </div >
    );
}

export default Login;