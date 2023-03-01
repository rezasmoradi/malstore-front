import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { CreditCardIcon, ClipboardListIcon, TruckIcon } from "@heroicons/react/solid";
import UserPanelDrawer from "../components/UserPanelDrawer";
import UserHeader from "../components/UserHeader";

function Dashboard() {

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const options = {
        responsive: true,
        tension: 0.4,
        barThickness: 8,
        borderRadius: 3,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'فروش ماهیانه',
                font: {
                    family: 'IRANSans',
                    size: 12,
                }
            },
            tooltip: {
                footerFont: {
                    family: 'IRANSans',
                    size: 16,
                },
                bodyFont: {
                    family: 'IRANSans',
                    size: 12,
                },
                titleFont: {
                    family: 'IRANSans',
                    size: 12,
                }
            }
        },
        // onResize: (instance, size) => { console.log(instance, size); }
    };

    const sellData = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'سفارشات',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgb(168 85 247)',
                backgroundColor: 'rgba(192, 132, 252, 0.5)',
            },
        ],
    };

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: '',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Filler
    );


    return (
        <div className="w-screen h-full flex dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={true} />

            <div className="w-full h-full pl-2 bg-white dark:bg-gray-800 transition-all">
                <UserHeader />
                <main>
                    <div className="w-full grid grid-cols-2 gap-y-4 sm:mb-4 md:mb-0 sm:grid-cols-3 md:grid-cols-4 justify-items-center content-center">
                        <div className="w-36 h-36 lg:w-44 lg:h-44 transition-transform hover:border p-1 hover:border-red-400 hover:rounded-full duration-200 hover:scale-105">
                            <div className="h-full border rounded-full border-red-300">
                                <div className="flex flex-col justify-between align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:w-10 lg:h-10 mt-2 self-center text-red-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    <span className="text-semi-small text-sm md:text-base text-center text-gray-700 dark:text-gray-300 py-1 lg:py-2">تراکنش&zwnj;ها</span>
                                    <p className="text-large lg:text-xlarge text-sm md:text-base text-center text-gray-900 dark:text-gray-300 py-1 lg:py-2">10249</p>
                                    <span className="text-semi-small text-sm md:text-base text-center text-gray-500">خرید و فروش</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-36 h-36 lg:w-44 lg:h-44 transition-transform hover:border p-1 hover:border-blue-400 hover:rounded-full duration-200 hover:scale-105">
                            <div className="h-full border rounded-full border-blue-300">
                                <div className="flex flex-col justify-between align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:w-10 lg:h-10 mt-2 self-center text-blue-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>
                                    <span className="text-semi-small text-sm md:text-base text-center text-gray-700 dark:text-gray-300 py-1 lg:py-2">سفارشات</span>
                                    <p className="text-large lg:text-xlarge text-sm md:text-base text-center text-gray-900 dark:text-gray-300 py-1 lg:py-2">10249</p>
                                    <span className="text-semi-small text-sm md:text-base text-center text-gray-500">تا امروز</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-36 h-36 lg:w-44 lg:h-44 transition-transform hover:border p-1 hover:border-amber-400 hover:rounded-full duration-200 hover:scale-105">
                            <div className="h-full border rounded-full border-amber-300">
                                <div className="flex flex-col justify-between align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:w-10 lg:h-10 mt-2 self-center text-amber-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    </svg>
                                    <span className="text-semi-small text-sm md:text-base text-center text-gray-700 dark:text-gray-300 py-1 lg:py-2">ارسال سفارشات</span>
                                    <p className="text-large lg:text-xlarge text-sm md:text-base text-center text-gray-900 dark:text-gray-300 py-1 lg:py-2">964</p>
                                    <span className="text-semi-small text-sm md:text-base text-center text-gray-500">در حال ارسال</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-36 h-36 lg:w-44 lg:h-44 sm:col-span-full md:col-span-1 transition-transform hover:border p-1 hover:border-orange-400 hover:rounded-full duration-200 hover:scale-105">
                            <div className="h-full border rounded-full border-orange-300">
                                <div className="flex flex-col justify-between align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:w-10 lg:h-10 mt-2 self-center text-orange-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                    </svg>
                                    <span className="text-semi-small text-sm md:text-base text-center text-gray-700 dark:text-gray-300 py-1 lg:py-2">محصولات</span>
                                    <p className="text-large lg:text-xlarge text-sm md:text-base text-center text-gray-900 dark:text-gray-300 py-1 lg:py-2">264</p>
                                    <span className="text-small text-sm md:text-base text-center text-gray-500">ثبت&zwnj;شده</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-9/12 mx-auto grid grid-cols-2 gap-y-8 mt-4 sm:mb-0 sm:grid-cols-3 justify-items-center content-center">
                        <div className="w-36 h-36 lg:w-44 lg:h-44 transition-transform hover:border p-1 hover:border-purple-400 hover:rounded-full duration-200 hover:scale-105">
                            <div className="h-full border rounded-full border-purple-300">
                                <div className="flex flex-col justify-between align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:w-10 lg:h-10 mt-2 self-center text-purple-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    <span className="text-semi-small text-sm md:text-base text-center text-gray-700 dark:text-gray-300 py-1 lg:py-2">پیام&zwnj;ها</span>
                                    <p className="text-large lg:text-xlarge text-sm md:text-base text-center text-gray-900 dark:text-gray-300 py-1 lg:py-2">24</p>
                                    <span className="text-small text-sm md:text-base text-center text-gray-500">بدون پاسخ</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-36 h-36 lg:w-44 lg:h-44 transition-transform hover:border p-1 hover:border-green-400 hover:rounded-full duration-200 hover:scale-105">
                            <div className="h-full border rounded-full border-green-300">
                                <div className="flex flex-col justify-between align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:w-10 lg:h-10 mt-2 self-center text-green-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                    </svg>
                                    <span className="text-semi-small text-sm md:text-base text-center text-gray-700 dark:text-gray-300 py-1 lg:py-2">دیدگاه&zwnj;ها</span>
                                    <p className="text-large lg:text-xlarge text-sm md:text-base text-center text-gray-900 dark:text-gray-300 py-1 lg:py-2">264</p>
                                    <span className="text-small text-sm md:text-base text-center text-gray-500">تأیید نشده</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-36 h-36 lg:w-44 lg:h-44 col-span-full sm:col-span-1 transition-transform hover:border p-1 hover:border-pink-400 hover:rounded-full duration-200 hover:scale-105">
                            <div className="h-full border rounded-full border-pink-300">
                                <div className="flex flex-col justify-between align-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:w-10 lg:h-10 mt-2 self-center text-pink-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>

                                    <span className="text-semi-small text-sm md:text-base text-center text-gray-700 dark:text-gray-300 py-1 lg:py-2">پرسش&zwnj;ها</span>
                                    <p className="text-large lg:text-xlarge text-sm md:text-base text-center text-gray-900 dark:text-gray-300 py-1 lg:py-2">264</p>
                                    <span className="text-small text-sm md:text-base text-center text-gray-500">بدون پاسخ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-8 mb-8 sm:mb-2 grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center content-center">
                        <div className="w-64 mx-12 mt-4">
                            <Bar options={options} data={sellData} />
                        </div>
                        <div className="w-64 mx-12 mt-4">
                            <Bar options={options} data={data} />
                        </div>
                        <div className="w-64 mx-12 mt-4">
                            <Bar options={options} data={data} />
                        </div>
                        <div className="w-64 mx-12 mt-4">
                            <Bar options={options} data={data} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;