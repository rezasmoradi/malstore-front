import React, { useRef } from "react";
import Link from "next/link";
import Theme from "./Theme";
import { useRouter } from "next/router";
import { setAuth } from "../utils/auth";

function UserHeader() {

    const userMenuRef = useRef();
    const router = useRouter();

    const routes = [
        { route: '/dashboard', title: 'سلام رضا' },
        { route: '/users', title: 'کاربران' },
        { route: '/orders', title: 'سفارشات' },
        { route: '/shipping', title: 'حمل و نقل' },
        { route: '/products-list', title: 'محصولات' },
        { route: '/categories', title: 'دسته‌بندی محصولات' },
        { route: '/payments', title: 'پرداخت‌ها' },
        { route: '/discounts', title: 'تخفیف‌ها' },
        { route: '/comments', title: 'دیدگاه‌ها' },
        { route: '/change-password', title: 'تغییر رمز عبور' },
        { route: '/profile', title: 'اطلاعات شخصی' },
        { route: '/messages', title: 'پیام‌ها' },
    ];

    return (
        <header className="w-full h-16 mt-1 flex justify-between align-center pr-4 mb-1">
            <div className="w-2/5 md:w-1/4 h-full flex justify-around align-center">
                <p className="text-bold overflow-hidden text-ellipsis whitespace-nowrap text-gray-800 px-2 self-center dark:text-gray-300">
                    {routes.map(path => {
                        if (path.route === router.route) return path.title;
                    })}
                </p>
                <div className="self-center">
                    <Theme />
                </div>
            </div>
            <div className="w-1/2 md:w-1/5 h-full flex justify-around align-center">
                <button className="ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-600 dark:text-gray-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-slate-600 dark:text-gray-300">
                        <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                    </svg>
                </button>
                <div ref={userMenuRef} className="relative self-center mt-2 z-50" onBlur={() => { setTimeout(() => { userMenuRef.current !== null && userMenuRef.current.children[1].classList.add('hidden') }, 100); }}>
                    <button onClick={() => { userMenuRef.current.children[1].classList.toggle('hidden'); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-600 dark:text-gray-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    <div tabIndex={0} className="w-48 h-32 absolute transform-gpu bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-md dark:shadow-sm dark:shadow-gray-300 overflow-hidden left-0 z-10 animate-[raise_0.3s_ease-in-out] hidden">
                        <ul className="px-2 my-2">
                            <Link href="/profile">
                                <li>
                                    <button className="flex justify-start my-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-600 dark:text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                        </svg>
                                        <span className="px-2 text-semi-small text-medium text-gray-800 dark:text-gray-300">ورود به حساب کاربری</span>
                                    </button>
                                </li>
                            </Link>
                            <Link href="/change-password">
                                <li>
                                    <button className="flex justify-start my-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-slate-600 dark:text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                        </svg>
                                        <span className="px-2 text-semi-small text-medium text-gray-800 dark:text-gray-300">تغییر رمز عبور</span>
                                    </button>
                                </li>
                            </Link>
                            <li onClick={() => { setAuth(null); router.push('/') }}>
                                <button className="flex justify-start my-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 dark:text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>
                                    <span className="px-2 text-semi-small text-medium text-red-600 dark:text-red-500">خروج</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default UserHeader;