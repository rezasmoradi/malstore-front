import React, { useState } from "react"
import UserHeader from '../../components/UserHeader'
import UserPanelDrawer from "../../components/UserPanelDrawer"
import { wrapper } from "../../redux/store"

import axiosClient from "../../utils/axiosClient";

function Messages() {

    const [open, setOpen] = useState(false)

    return (
        <div className="w-full h-full flex dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={open} onChangeState={() => { setOpen(!open) }} />
            <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all overflow-hidden">
                <UserHeader />
                <main className="w-full h-auto px-4 sm:px-16">
                    <div className="w-full h-auto border border-slate-300 rounded px-3 py-2 mt-6 mb-4 flex flex-col">
                        <span className="text-primary text-sm mb-1">نوشتن پیام جدید</span>
                        <div className="w-full flex flex-col msm:flex-row justify-self-center self-center pt-2 pb-3">
                            <textarea rows={5} maxLength={1000} className="w-full ml-4 border rounded text-sm sm:text-base select-none px-3 py-1 outline-none text-gray-900 dark:text-gray-300 font-medium bg-slate-50 bg-slate-100/10 dark:bg-slate-700 disabled:border-slate-100 disabled:bg-white disabled:dark:bg-slate-800 disabled:dark:border-slate-700" value={'متن پیام...'} onChange={e => { console.log(e.target.value); }} />
                            <button className="mx-auto mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary rotate-180">
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 mb-4">
                        <div className="w-auto h-auto border border-slate-300 rounded md:mx-4 mb-8 px-3 py-2 flex flex-col justify-start">
                            <time className="text-primary text-center">1401/11/18</time>
                            <p className="leading-7 text-gray-900 dark:text-gray-300 text-sm md:text-base text-justify line-clamp-6">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
                                و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،
                            </p>
                            <div className="mt-4">
                                <span className="text-primary text-sm">پاسخ مدیریت</span>
                                <p className="leading-7 text-gray-900 dark:text-gray-300 text-sm md:text-base text-justify line-clamp-6">اوه، یس. ممنون</p>
                            </div>
                        </div>
                        <div className="w-auto h-auto border border-slate-300 rounded md:mx-4 mb-8 px-3 py-2 flex flex-col justify-start">
                            <time className="text-primary text-center">1401/11/18</time>
                            <p className="leading-7 text-gray-900 dark:text-gray-300 text-sm md:text-base text-justify line-clamp-6">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
                                و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،
                            </p>
                            <div className="mt-4">
                                <span className="text-primary text-sm">پاسخ مدیریت</span>
                                <p className="leading-7 text-gray-900 dark:text-gray-300 text-sm md:text-base text-justify line-clamp-6">اوه، یس. ممنون</p>
                            </div>
                        </div>
                        <div className="w-auto h-auto border border-slate-300 rounded md:mx-4 mb-8 px-3 py-2 flex flex-col justify-start">
                            <time className="text-primary text-center">1401/11/18</time>
                            <p className="leading-7 text-gray-900 dark:text-gray-300 text-sm md:text-base text-justify line-clamp-6">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
                                و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،
                            </p>
                            <div className="mt-4">
                                <span className="text-primary text-sm">پاسخ مدیریت</span>
                                <p className="leading-7 text-gray-900 dark:text-gray-300 text-sm md:text-base text-justify line-clamp-6">اوه، یس. ممنون</p>
                            </div>
                        </div>
                        <div className="w-auto h-auto border border-slate-300 rounded md:mx-4 mb-8 px-3 py-2 flex flex-col justify-start">
                            <time className="text-primary text-center">1401/11/18</time>
                            <p className="leading-7 text-gray-900 dark:text-gray-300 text-sm md:text-base text-justify line-clamp-6">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
                                و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،
                            </p>
                            <div className="mt-4">
                                <span className="text-primary text-sm">پاسخ مدیریت</span>
                                <p className="leading-7 text-gray-900 dark:text-gray-300 text-sm md:text-base text-justify line-clamp-6">اوه، یس. ممنون</p>
                            </div>
                        </div>
                        <div className="w-auto h-auto border border-slate-300 rounded md:mx-4 mb-8 px-3 py-2 flex flex-col justify-start">
                            <time className="text-primary text-center">1401/11/18</time>
                            <p className="leading-7 text-gray-900 dark:text-gray-300 text-sm md:text-base text-justify line-clamp-6">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
                                و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،
                            </p>
                            <div className="mt-4">
                                <span className="text-primary text-sm">پاسخ مدیریت</span>
                                <p className="leading-7 text-gray-900 dark:text-gray-300 text-sm md:text-base text-justify line-clamp-6">اوه، یس. ممنون</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {

    const { token } = ctx.req.cookies
    const res = await axiosClient.get('/message', {
        headers: {
            Authorization: 'Bearer ' + token
        },
    })

    return {
        props: {
            token,
            messages: res.data.messages
        }
    }
})

export default Messages;