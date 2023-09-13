import React, { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import Error from "next/error";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../redux/store";
import axiosClient from "../../utils/axiosClient";
import { selectDrawerIsOpen } from '../../redux/slices/userSlice'

import TextField from '../../components/TextField'
import UserPanelDrawer from "../../components/UserPanelDrawer"
import UserHeader from "../../components/UserHeader"
import { openDrawerAction } from '../../redux/actions/userAction'
import { useRouter } from "next/router";


function Profile({ token, user, error }) {

    const router = useRouter()
    const showAlertRef = useRef()
    const [userDetail, setUserDetail] = useState(user)
    const drawerIsOpen = useSelector(selectDrawerIsOpen)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(drawerIsOpen)
    const [data, setData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        card_number: user.card_number,
        phone_number: user.phone_number,
    });

    const { email, ...newData } = data;
    const updateUser = async () => {
        const result = await axiosClient.put('/user', newData, {
            headers: {
                Authorization: token
            }
        })
        if (result.status === 202) {
            setData(result.data.user)
            setUserDetail(result.data.user)
            showAlertRef.current.classList.remove('opacity-0')
            setTimeout(() => {
                showAlertRef.current?.classList.add('opacity-0')
            }, 3000)
            router.push('/')
        }
    }

    const changeDrawerState = () => {
        setOpen(!open);
        dispatch(openDrawerAction)
    }

    return (
        <div className="w-full h-full flex justify-start dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={open} role={user.role} onChangeState={changeDrawerState} />
            <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all">
                <UserHeader />
                <main className="w-full h-auto px-1">
                    <div className="w-full h-auto flex flex-col">
                        <span className="inline-block w-auto h-10 text-right text-medium text-semi-small text-primary pr-4 my-2">اطلاعات کاربری شما</span>
                        <div className="w-auto h-auto mx-auto mb-8 flex justify-between items-center">
                            <div className="w-1/2 h-full relative px-3">
                                <div className="w-18 h-18 border border-primary rounded-full flex justify-center items-baseline">
                                    <Image src={'/assets/images/user.png'} alt="profile" width={64} height={64} className="opacity-75" />
                                </div>
                            </div>
                            <div className="w-full h-full flex flex-row justify-center items-center">
                                <span className='text-medium pl-1 text-gray-700 dark:text-gray-300'>
                                    {userDetail.first_name}
                                </span>
                                <span className='text-medium text-gray-700 dark:text-gray-300'>
                                    {userDetail.last_name}
                                </span>
                            </div>
                        </div>
                        <form onSubmit={e => { e.preventDefault() }} className="w-full h-auto sm:h-40 flex flex-col justify-around items-center sm:mt-12 mb-4">
                            <div className="w-11/12 msm:w-3/5 h-auto sm:h-20 my-4 flex flex-col sm:flex-row justify-around">
                                <TextField
                                    id="last_name"
                                    label="نام"
                                    value={data.first_name}
                                    onChange={e => { setData({ ...data, first_name: e.target.value }) }} />
                                <div className="mx-8" />
                                <TextField
                                    id="last_name"
                                    label="نام خانوادگی"
                                    value={data.last_name}
                                    onChange={e => { setData({ ...data, last_name: e.target.value }) }} />
                            </div>
                            <div className="w-11/12 msm:w-3/5 h-auto sm:h-20 flex flex-col sm:flex-row justify-around">
                                <TextField
                                    id="email"
                                    label="ایمیل"
                                    value={user.email}
                                    disabled={true} />
                                <div className="mx-8" />
                                <TextField
                                    id="username"
                                    label="شماره کارت"
                                    value={'5859 8310 2819 3754'}>
                                    <span className="absolute text-xs pt-0.5 top-full text-gray-900">جهت بازگشت پول</span>
                                </TextField>
                            </div>
                            <div className="w-11/12 msm:w-3/5 h-auto sm:h-20 my-4 flex flex-col sm:flex-row justify-around">
                                <TextField
                                    id="email"
                                    label="شماره همراه"
                                    value={'09123121441'}
                                    disabled={true} />
                                <div className="w-full mx-8" />
                            </div>
                            <div className="w-11/12 xsm:w-3/5 sm:w-40 h-12 self-center sm:self-end sm:ml-12">
                                <button onClick={updateUser} className="w-full md:w-40 h-10 mt-8 md:ml-6 mx-auto lg:ml-0 backdrop-blur-2xl outline-none bg-primary dark:bg-primary/75 border dark:border-slate-600 rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white dark:text-gray-200 text-semi-small font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-40 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-white before:-z-10 md:hover:border-primary md:hover:text-primary dark:hover:before:bg-white">
                                    ذخیره تغییرات
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
                <div ref={showAlertRef} className="w-56 h-16 opacity-0 absolute bottom-16 right-1/2 left-1/2 translate-x-1/2 animate-fade duration-300 top-48 md:top-16 bg-primary rounded grid justify-center content-center">
                    <p className="w-full h-full text-gray-100">تغییرات با موفقیت ذخیره شد</p>
                    <span onClick={() => { showAlertRef.current.classList.add('opacity-0') }} className="absolute right-1 top-1 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {

    const { token } = ctx.req.cookies

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const res = await axiosClient.get('/user/me', {
        headers: {
            Authorization: token
        },
    })

    return {
        props: {
            token,
            user: res.data.user,
            error: { code: res.status, message: res.statusText }
        },
    }

})

export default Profile;