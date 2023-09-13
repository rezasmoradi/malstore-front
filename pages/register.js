import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import useSWR from 'swr';
import axiosClient from '../utils/axiosClient';

import TextField from "../components/TextField";
import Theme from "../components/Theme";
import Modal from "../components/Modal";

import { registerAction } from "../redux/actions/registerAction";
import { selectEmail } from "../redux/slices/registerSlice";

function Register() {

    const sEmail = useSelector(selectEmail)
    const dispatch = useDispatch();
    const [email, setEmail] = useState(sEmail);
    const [shouldSend, setShouldSend] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);

    const arrowRef = useRef();
    const verifyStatementRef = useRef();
    const submitRef = useRef();

    const fetcher = url => axiosClient.post(url, { email: email.toLowerCase() }).then(res => res.data)
    const { data, error, isLoading } = useSWR(shouldSend ? '/auth/register' : null, fetcher)

    if (data) {
        verifyStatementRef.current.classList.remove('hidden');
        setTimeout(() => {
            Router.push('/verify');
            window.onpopstate = () => {
                history.go(1);
            };
        }, 2500)
    }

    const checkEmail = () => {
        if (email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setIsInvalid(false);
            setOpenModal(true);
        } else {
            setIsInvalid(true);
        }
    }

    const submit = () => {
        [
            "md:hover:before:w-40", "md:hover:before:h-10", "md:hover:before:bg-white",
            "before:-z-10", "md:hover:border-primary", "md:hover:text-primary"
        ].map(cls => { submitRef.current.classList.remove(cls) })
        dispatch(registerAction(email))
        setOpenModal(false)
        setShouldSend(true)
    };


    return (
        <div className="w-full md:h-screen transition-all duration-500 animate-fade bg-gradient-to-bl from-slate-50 to-slate-100 bg-slate-200/30 dark:bg-gradient-to-bl dark:from-slate-600 dark:to-slate-800">
            <div className="hidden md:block w-11/12 md:w-10/12 lg:w-1/2 h-auto mx-auto pt-4 md:pt-16">
                <div className="flex flex-col-reverse md:flex-row justify-around border-2 dark:border-slate-600 rounded-lg py-4 shadow-sm dark:shadow-slate-600 backdrop-blur-md">
                    <div className="w-11/12 mx-auto md:mx-0 md:w-1/2 h-96 bg-slate-100/20 dark:bg-slate-600/10 shadow shadow-slate-200 dark:shadow-slate-600 before:-z-10 dark:before:brightness-150 before:blur-sm before:bg-center before:w-10/12 md:before:w-1/2 before:h-96 before:bg-[url('/assets/images/logo.svg')] before:bg-no-repeat before:opacity-10 before:content-[''] before:absolute rounded mb-6">
                        <div className="flex justify-end">
                            <Theme />
                        </div>
                        <h1 className="text-gray-900 dark:text-gray-300 text-center text-xl mt-8">ثبت&zwnj;نام</h1>
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
                                    className="w-28 h-10 border border-primary hover:border-white rounded text-center pt-1.5 text-primary hover:text-white mx-auto font-medium relative before:absolute before:content-[''] before:transition-all before:top-0 before:left-0 before:w-0 before:h-10 before:rounded before:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] hover:before:w-28 hover:before:bg-primary before:duration-500 before:-z-20">ورود</a>
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
                                id="email"
                                autoFocus
                                invalid={isInvalid}
                                label="ایمیل"
                                type="email"
                                value={email}
                                onChange={(e) => { setIsInvalid(false); setEmail(e.target.value.trim()); }}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1 text-primary">
                                    <path fillRule="evenodd" d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z" clipRule="evenodd" />
                                </svg>
                                } />
                        </div>
                        <div className="w-full h-auto flex flex-col justify-center items-center">
                            <button ref={submitRef}
                                onClick={checkEmail}
                                className="w-full md:w-40 h-10 mt-8 md:ml-6 mx-auto lg:ml-0 backdrop-blur-2xl outline-none bg-primary dark:bg-primary/90 border border-transparent rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white dark:text-gray-300 text-semi-small font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-40 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-white before:-z-10 md:hover:border-primary md:hover:text-primary dark:hover:before:bg-white">
                                ثبت&zwnj;نام
                            </button>
                            <span
                                ref={verifyStatementRef}
                                className="text-green-600 dark:text-gray-300 text-center py-8 animate-fade hidden">
                                یک کد تایید به ایمیل شما ارسال شد.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block md:hidden w-full h-screen">
                <div className="flex relative flex-col justify-around dark:border-slate-600 rounded-lg py-4 backdrop-blur-md">
                    <div className="w-11/12 mx-auto h-auto bg-slate-100/20 dark:bg-transparent before:-z-10 before:backdrop-blur-md dark:before:brightness-150 before:blur-sm before:bg-center before:w-10/12 before:h-96 before:bg-[url('/assets/images/logo.svg')] before:bg-no-repeat before:opacity-10 before:content-[''] before:absolute rounded mb-6">
                        <div className="flex justify-end absolute left-4 sm:left-12 top-3 sm:top-11">
                            <Theme />
                        </div>
                        <h1 className="text-gray-900 dark:text-gray-300 text-center text-base msm:text-xl mt-4">ثبت&zwnj;نام</h1>
                        <div className="w-11/12 mx-auto h-auto relative">
                            <div className="w-full sm:w-2/3 h-40 mx-auto flex flex-col justify-center items-center">
                                <TextField
                                    id="email"
                                    autoFocus
                                    label="ایمیل"
                                    placeholder="example@mail.com"
                                    invalid={isInvalid}
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setIsInvalid(false); setEmail(e.target.value.trim()); }}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1 text-primary dark:text-secondary">
                                        <path fillRule="evenodd" d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z" clipRule="evenodd" />
                                    </svg>
                                    } />
                            </div>
                            <div className="w-full sm:w-2/3 h-auto mx-auto flex flex-col justify-center items-center">
                                <button onClick={checkEmail} className="w-10/12 h-10 mx-auto outline-none bg-primary border dark:border-slate-600 rounded py-2 px-4 text-center text-gray-100 text-semi-small font-medium">
                                    ثبت&zwnj;نام
                                </button>
                            </div>
                            <div className="relative mt-8 mb-2 flex flex-col justify-center items-center">
                                <p className="text-gray-900 dark:text-gray-300 text-sm msm:text-base text-center">حساب کاربری دارید؟</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
                                </svg>
                                <div className="w-full h-11 mt-1 flex justify-center">
                                    <a
                                        href="/login"
                                        className="w-28 h-10 border border-slate-300 dark:border-slate-500 rounded text-sm text-center pt-2 text-gray-900 dark:text-gray-300 mx-auto font-medium">
                                        ورود
                                    </a>
                                </div>
                            </div>
                            <span
                                ref={verifyStatementRef}
                                className="absolute left-0 right-0 mx-auto text-green-600 dark:text-gray-300 text-center py-8 animate-fade hidden">
                                یک کد تایید به ایمیل شما ارسال شد.
                            </span>
                        </div>
                    </div>
                </div>
                <p className="w-full h-auto text-gray-900 dark:text-gray-300 text-xs absolute bottom-0 left-0 right-0 text-center pb-2">
                    فروشگاه مال&zwnj;استور
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline-block">
                        <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
                    </svg>
                    1401
                </p>
            </div>
            <Modal open={openModal} onClose={() => { setOpenModal(false); }}>
                <div className="w-full h-auto mt-4">
                    <p className="w-fit mx-auto px-4 py-2 ltr text-center border border-primary text-lg tracking-wide rounded font-bold text-gray-900 my-8 bg-slate-100">{email}</p>
                    <p className="text-center font-medium text-gray-900">آیا ایمیل وارد شده مورد تأیید است؟</p>
                    <div className="w-full h-auto my-8 flex justify-around items-center">
                        <button onClick={submit} className="w-24 h-10 font-medium text-gray-900 border border-slate-400 rounded">
                            بله
                        </button>
                        <button onClick={() => { setOpenModal(false); }} className="w-24 h-10 font-medium text-gray-800 border border-slate-400 rounded">
                            ویرایش
                        </button>
                    </div>
                </div>
            </Modal>
        </div >
    );
}

export default Register;