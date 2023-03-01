import React, { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import axiosClient from "../utils/axiosClient";
import { selectDrawerIsOpen } from '../redux/slices/userSlice'

import TextField from '../components/TextField'
import ComboBox from "../components/ComboBox"
import UserPanelDrawer from "../components/UserPanelDrawer"
import UserHeader from "../components/UserHeader"


function Profile({ user }) {

    const drawerIsOpen = useSelector(selectDrawerIsOpen)
    const [open, setOpen] = useState(drawerIsOpen)

    const provinceList = [
        { code: 'teh', label: 'تهران' },
        { code: 'raz', label: 'خراسان رضوی' },
    ];

    return (
        <div className="w-full h-full flex justify-start dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={open} role={user.role} />

            <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all">
                <UserHeader />
                <main className="w-full h-auto px-1">
                    <div className="w-full h-auto flex flex-col">
                        <span className="inline-block w-auto h-10 text-right text-medium text-semi-small text-primary pr-4 my-2">اطلاعات کاربری شما</span>
                        <div className="w-auto h-auto mx-auto mb-8 flex justify-between items-center">
                            <div className="w-1/2 h-full relative px-3">
                                <div className="w-18 h-18 border border-primary rounded-full flex justify-center items-baseline">
                                    <Image src={'/assets/images/user.png'} alt="profile" width={64} height={64} />
                                </div>
                                <button className='absolute right-1 bottom-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                    </svg>
                                </button>
                                <input type={'file'} accept="image/jpg,image/jpeg,image/png" className="w-16 h-16 outline-none absolute right-3 top-4 opacity-0 appearance-none cursor-pointer" />
                            </div>
                            <div className="w-full h-16 flex flex-col justify-around items-center px-3">
                                <div className="w-full h-full flex flex-row justify-center items-center">
                                    <span className='text-medium pl-1 text-gray-700 dark:text-gray-300'>رضا</span>
                                    <span className='text-medium text-gray-700 dark:text-gray-300'>صیدمرادی</span>
                                </div>
                                <span className='text-medium text-gray-600 dark:text-gray-400 ltr'>@reza_seidmoradi</span>
                            </div>
                        </div>
                        <form className="w-full h-auto sm:h-40 flex flex-col justify-around items-center sm:mt-4 mb-4">
                            <div className="w-11/12 msm:w-3/5 h-auto sm:h-20 my-4 flex flex-col sm:flex-row justify-around">
                                <TextField
                                    id="first_name"
                                    label="نام"
                                    value={'رضا'} />
                                <div className="mx-8" />
                                <TextField
                                    id="last_name"
                                    label="نام خانوادگی"
                                    value={'صیدمرادی'} />
                            </div>
                            <div className="w-11/12 msm:w-3/5 h-auto sm:h-20 flex flex-col sm:flex-row justify-around">
                                <TextField
                                    id="username"
                                    label="نام کاربری"
                                    value={'reza_seidmoradi'} />
                                <div className="mx-8" />
                                <TextField
                                    id="email"
                                    label="ایمیل"
                                    value={'resam217@gmail.com'}
                                    disabled={true} />
                            </div>
                            <div className="w-11/12 xsm:w-3/5 sm:w-40 h-12 self-center sm:self-end sm:ml-12">
                                <button className="w-full md:w-40 h-10 mt-8 md:ml-6 mx-auto lg:ml-0 backdrop-blur-2xl outline-none bg-primary dark:bg-primary/75 border dark:border-slate-600 rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white dark:text-gray-300 text-semi-small font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-40 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-white before:-z-10 md:hover:border-primary md:hover:text-primary dark:hover:before:bg-slate-800/10">
                                    ذخیره تغییرات پروفایل
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full h-auto mt-16 overflow-hidden">
                        <span className="inline-block w-auto h-10 text-right text-medium text-semi-small text-primary pr-4 my-2">آدرس&zwnj;های ثبت شده&zwnj;ی شما</span>
                        <div className="w-full h-auto overflow-auto">
                            <table className="w-full h-auto mb-4 mx-auto">
                                <thead>
                                    <tr className="text-center text-gray-700 dark:text-gray-300">
                                        <th className="px-4 text-sm sm:text-base">استان</th>
                                        <th className="px-4 text-sm sm:text-base">شهر</th>
                                        <th className="px-4 text-sm sm:text-base">آدرس</th>
                                        <th className="px-4 text-sm sm:text-base">کد پستی</th>
                                        <th className="px-4 text-sm sm:text-base">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center text-gray-700 dark:text-gray-300">
                                        <td className="px-4 text-sm sm:text-base leading-10 text-gray-900 whitespace-nowrap dark:text-gray-300">تهران</td>
                                        <td className="px-4 text-sm sm:text-base leading-10 text-gray-900 whitespace-nowrap dark:text-gray-300">تهران</td>
                                        <td className="px-4 text-sm sm:text-base leading-10 text-gray-900 whitespace-nowrap dark:text-gray-300">فردوسی - خیابان آزادی - کوچه شهید کاظمیان - پلاک 4</td>
                                        <td className="px-4 text-sm sm:text-base leading-10 text-gray-900 whitespace-nowrap dark:text-gray-300">4913298719</td>
                                        <td className="flex flex-row justify-around items-center">
                                            <div className="mt-1 mx-4">
                                                <button className="mr-2 cursor-pointer pt-1 sm:pt-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block w-6 h-6">
                                                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="mt-1 mx-4">
                                                <button className="ml-2 cursor-pointer pt-1 sm:pt-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block w-6 h-6">
                                                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-full h-auto border-t pt-2 border-slate-100 dark:border-slate-600">
                        <p className="w-auto h-10 text-right text-medium text-semi-small text-primary pr-4 mt-8 mb-2">ثبت آدرس جدید</p>
                        <form className="w-full h-auto flex flex-col justify-around items-center">
                            <div className="w-11/12 msm:w-2/3 sm:w-11/12 h-auto flex flex-col sm:flex-row justify-evenly mb-4">
                                <ComboBox data={provinceList} />
                                <div className="mx-4" />
                                <TextField id="city" label='شهر' value={'اسلامشهر'} />
                                <div className="mx-4" />
                                <TextField label='کد پستی' value={'6931369996'} />
                            </div>
                            <div className="w-11/12 h-20 flex flex-row justify-center items-center">
                                <TextField multiline label='آدرس' value={'فردوسی - شهرک ولایت - خیابان دانشجو - بلوک 131 - واحد 6'} fullWidth />
                            </div>
                            <div className="w-11/12 xsm:w-3/5 sm:w-40 h-auto self-center sm:self-end mb-12 sm:ml-12">
                                <button className="w-full md:w-40 h-10 mt-8 md:ml-6 mx-auto lg:ml-0 backdrop-blur-2xl outline-none bg-primary dark:bg-primary/75 border dark:border-slate-600 rounded dark:shadow-slate-700/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white dark:text-gray-300 text-semi-small font-medium md:mx-2 before:content-[''] before:w-0 before:h-0 hover:before:w-full md:hover:before:w-40 hover:before:h-10 before:duration-300 before:rounded before:transition-all before:absolute before:bottom-0 before:left-0 hover:before:bg-white before:-z-10 hover:border-primary hover:text-primary dark:hover:before:bg-slate-800/10">
                                    ذخیره تغییرات آدرس
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {

    const res = await axiosClient.get('/user/me', {
        headers: {
            Authorization: 'Bearer ' + ctx.req.cookies.token
        },
    })

    return {
        props: {
            user: res.data.user
        }
    }
})

export default Profile;