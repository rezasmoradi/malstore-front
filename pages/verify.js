import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import { setAuth } from "../utils/auth";

import { selectEmail } from "../redux/slices/registerSlice";
import axiosClient from "../utils/axiosClient";

import TextField from '../components/TextField';
import OTPField from "../components/OTPField";
import Theme from "../components/Theme";
import { useRouter } from "next/router";
import Button from "../components/Button";



function Verify() {

    const arrowRef = useRef();
    const submitRef = useRef();
    const submitMobileRef = useRef();
    const email = useSelector(selectEmail);
    const [otpCode, setOtpCode] = useState('');
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();

    const fetcher = url => axiosClient.post(url, { email: email, code: otpCode })
    const { data, error, isLoading } = useSWR(otpCode.length === 6 ? '/auth/verify' : null, fetcher)
    console.log(email, 'otpCode:', otpCode, 'DATA:', data, 'ERROR:', error);
    if (data) {
        document.cookie = `token=${data.data.token}; expires=${data.data.expired_at}`
        router.push('/change-password')
    }
    if (error) {
        setDisabled(false);
    }

    const submit = () => {
        setDisabled(true);
        if (window.outerWidth > 767) {
            submitRef.current.click();
            submitRef.current.disabled = true;
            submitRef.current.classList.add('opacity-75');
            submitRef.current.children[0].classList.add('hidden');
            submitRef.current.children[1].classList.remove('hidden');
            submitRef.current.children[1].classList.add('inline-block');
            setTimeout(() => {
                [
                    "md:hover:before:w-40", "md:hover:before:h-10", "md:hover:before:bg-white",
                    "before:-z-10", "md:hover:border-primary", "md:hover:text-primary"
                ].map(cls => { submitRef.current.classList.remove(cls) })
                submitRef.current.children[1].classList.remove('inline-block');
                submitRef.current.children[1].classList.add('hidden');
                submitRef.current.children[2].classList.remove('hidden');
                submitRef.current.children[2].classList.add('inline-block');
                submitRef.current.children[0].innerHTML = 'در حال بررسی';
                submitRef.current.children[0].classList.remove('hidden');
            }, 700);
        } else {
            submitMobileRef.current.click();
            submitMobileRef.current.disabled = true;
            submitMobileRef.current.classList.add('opacity-75');
            submitMobileRef.current.children[0].classList.add('hidden');
            submitMobileRef.current.children[1].classList.remove('hidden');
            submitMobileRef.current.children[1].classList.add('inline-block');
            setTimeout(() => {
                submitMobileRef.current.children[1].classList.remove('inline-block');
                submitMobileRef.current.children[1].classList.add('hidden');
                submitMobileRef.current.children[2].classList.remove('hidden');
                submitMobileRef.current.children[2].classList.add('inline-block');
                submitMobileRef.current.children[0].innerHTML = 'در حال بررسی';
                submitMobileRef.current.children[0].classList.remove('hidden');
            }, 700);
        }
    };


    return (
        <div className="w-full h-screen transition-all duration-500 animate-fade bg-gradient-to-bl from-violet-50 to-violet-100 dark:bg-gradient-to-bl dark:from-slate-600 dark:to-slate-800">
            <div className="hidden md:block w-10/12 lg:w-1/2 h-auto mx-auto pt-16">
                <div className="flex flex-col-reverse md:flex-row justify-around border-2 dark:border-slate-600 rounded-lg py-4 shadow-md shadow-slate-300 dark:shadow-slate-600 backdrop-blur-md">
                    <div className="w-1/2 h-96 mx-0 bg-gradient-to-bl from-slate-50/20 to-slate-100 dark:from-slate-700/20 dark:to-slate-700 shadow-md dark:shadow shadow-slate-300 dark:shadow-slate-500 before:-z-10 dark:before:brightness-150 before:blur-sm before:bg-center before:w-10/12 md:before:w-1/2 before:h-96 before:bg-logo before:bg-no-repeat before:opacity-20 dark:before:opacity-10 before:content-[''] before:absolute rounded mb-6">
                        <div className="flex justify-end">
                            <Theme />
                        </div>
                        <h1 className="text-gray-900 dark:text-gray-300 text-center text-xl mt-8">تأیید ایمیل</h1>
                        <div className="relative">
                            <p className="text-gray-900 dark:text-gray-300 mt-8 text-base text-center">قبلاً ثبت&zwnj;نام کرده&zwnj;اید؟</p>
                            <div ref={arrowRef} className="w-9/12 h-24 -mr-2 transition-all duration-300 animate-fade bg-[url('/assets/NfiJyM01.svg')] bg-contain bg-no-repeat -scale-x-95 dark:invert bg-right" />
                            <div className="w-full h-11 flex justify-center">
                                <a
                                    href="/login"
                                    onMouseOver={() => { arrowRef.current.classList.add('invisible'); }}
                                    onMouseLeave={() => { arrowRef.current.classList.remove('invisible'); }}
                                    onTouchStart={() => { arrowRef.current.classList.add('invisible'); }}
                                    onTouchEnd={() => { arrowRef.current.classList.remove('invisible'); }}
                                    className="w-28 h-10 text-center border border-slate-300 dark:border-slate-500 rounded pt-1.5 dark:mix-blend-lighten before:mix-blend-color-burn text-gray-900 dark:text-gray-300 mx-auto font-medium hover:font-light relative before:absolute before:content-[''] before:transition-all before:top-0 before:left-0 before:w-0 before:h-10 before:rounded before:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] hover:before:w-28 hover:before:bg-slate-600 before:duration-500">ورود</a>
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
                        <div className="w-full h-40">
                            <h5 className="w-full h-10 mt-8 mb-2 text-center text-gray-900 dark:text-gray-300 text-sm whitespace-nowrap">کد تأیید ارسال شده به ایمیل را وارد کنید</h5>
                            <OTPField inputNumber={6} onComplete={value => { submit(value); }} />
                        </div>
                        <div className="w-full h-auto flex flex-col justify-center items-center">
                            <button ref={submitRef} className="w-full md:w-40 h-10 mt-8 md:ml-6 mx-auto lg:ml-0 backdrop-blur-2xl outline-none bg-primary dark:bg-primary/90 border border-transparent rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white dark:text-gray-300 text-semi-small font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-40 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-white before:-z-10 md:hover:border-primary md:hover:text-primary">
                                <span className="w-8 h-10 mt-1.5 origin-[50%_25%]">تأیید</span>
                                <span className="hidden w-8 h-10 mt-1.5 origin-[50%_25%] will-change-transform transition-transform animate-shrink">تأیید</span>
                                <span className="w-3 h-3 rounded-full align-middle absolute my-auto transition-all animate-loading md:animate-loadingMd bg-slate-600 hidden" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block md:hidden w-full msm:w-10/12 h-auto mx-auto">
                <div className="flex flex-col justify-around rounded-lg backdrop-blur-md">
                    <div className="w-full msm:w-11/12 mx-auto h-screen bg-slate-100/20 dark:bg-transparent before:-z-10 before:backdrop-blur-md dark:before:brightness-150 before:blur-sm before:bg-center before:w-10/12 before:h-96 before:bg-[url('/assets/images/logo.svg')] before:bg-no-repeat before:opacity-10 before:content-[''] before:absolute rounded">
                        <h1 className="text-gray-900 dark:text-gray-300 text-center text-xl mt-8">تأیید ایمیل</h1>
                        <div className="w-full msm:w-11/12 mx-auto h-auto relative">
                            <div className="w-full h-28">
                                <h5 className="w-full h-10 mt-8 mb-2 text-center text-gray-900 dark:text-gray-300 text-sm whitespace-nowrap">کد تأیید ارسال شده به ایمیل را وارد کنید</h5>
                                <TextField label="" value={otpCode} onChange={(e) => { setOtpCode(e.target.value.trim()) }} />
                            </div>
                            <div className="w-full h-auto flex flex-col justify-center items-center">
                                <button onClick={submit} disabled={disabled} ref={submitMobileRef} className="w-10/12 msm:w-auto msm:min-w-[8rem] h-10 mt-8 mx-auto backdrop-blur-2xl outline-none bg-primary border dark:border-slate-600 rounded py-1 px-4 text-gray-100 text-semi-small font-medium">
                                    <span className="w-8 h-10 mt-1.5 origin-[50%_25%]">تایید</span>
                                    <span className="hidden w-8 h-10 mt-1.5 origin-[50%_25%] will-change-transform transition-transform animate-shrink">تایید</span>
                                    <span className="w-3 h-3 rounded-full align-middle absolute my-auto transition-all animate-loading md:animate-loadingMd bg-slate-600 hidden" />
                                </button>
                            </div>
                        </div>
                        <div className="relative mt-4 flex flex-col justify-center items-center">
                            <p className="text-gray-900 dark:text-gray-300 mt-8 text-base text-center">قبلاً ثبت&zwnj;نام کرده&zwnj;اید؟</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
                            </svg>
                            <div className="w-full h-11 flex justify-center mt-1">
                                <a
                                    href="/login"
                                    className="w-28 h-10 text-center border border-slate-300 dark:border-slate-500 rounded pt-1.5 dark:mix-blend-lighten before:mix-blend-color-burn text-gray-900 dark:text-gray-300 mx-auto font-medium hover:font-light">
                                    ورود
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="w-full text-gray-900 dark:text-gray-300 text-xs absolute bottom-0 left-0 right-0 text-center">
                    فروشگاه مال&zwnj;استور
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline-block">
                        <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
                    </svg>
                    1401
                </p>
            </div>
        </div>
    );
}

export default Verify;