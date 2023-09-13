import React, { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../redux/store";
import axiosClient from "../../utils/axiosClient";
import { selectDrawerIsOpen } from '../../redux/slices/userSlice'

import UserPanelDrawer from "../../components/UserPanelDrawer"
import UserHeader from "../../components/UserHeader"
import { openDrawerAction } from '../../redux/actions/userAction'
import ProductSummary from '../../components/ProductSummary'


function Favorites({ token, favorites }) {

    const showAlertRef = useRef()
    const drawerIsOpen = useSelector(selectDrawerIsOpen)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(drawerIsOpen)

    const changeDrawerState = () => {
        setOpen(!open);
        dispatch(openDrawerAction)
    }

    return (
        <div className="w-full h-full flex justify-start dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={open} onChangeState={changeDrawerState} token={token} />
            <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all">
                <UserHeader />
                <main className="w-full h-auto px-1">
                    <div className="w-full h-auto flex flex-row flex-wrap">
                        <ProductSummary />
                        <ProductSummary />
                        <ProductSummary />
                        <ProductSummary />
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
    const res = await axiosClient.get('/favorite', {
        headers: {
            Authorization: 'Bearer ' + token
        },
    })

    return {
        props: {
            token,
            favorites: res.data.favorites
        }
    }
})

export default Favorites;