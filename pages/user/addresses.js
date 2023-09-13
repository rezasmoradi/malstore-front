import React, { useState, useCallback, useEffect, useRef } from "react"

import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux"
import { wrapper } from "../../redux/store"
import axiosClient from "../../utils/axiosClient"

import TextField from '../../components/TextField'
import UserPanelDrawer from "../../components/UserPanelDrawer"
import Modal from "../../components/Modal"
import UserHeader from "../../components/UserHeader"
import { openDrawerAction } from '../../redux/actions/userAction'

import Map from "../../components/SimpleMap"
import axios from "axios"



function Addresses({ token, addresses }) {

    const showAlertRef = useRef();
    const dispatch = useDispatch()
    const [editAddress, setEditAddress] = useState(null)
    const [address, setAddress] = useState(addresses)
    const [index, setIndex] = useState(null)
    const [open, setOpen] = useState(false)
    const [latlng, setLatLng] = useState(null)
    const [deletedAddress, setDeleteAddress] = useState(null)
    const [tempLoc, setTempLoc] = useState([35.699739, 51.338097])
    const [newAddress, setNewAddress] = useState({
        province: '',
        city: '',
        address: '',
        postal_code: '',
    })

    const changeDrawerState = useCallback(() => {
        setOpen(!open);
        dispatch(openDrawerAction)
    }, [open])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(res => {
            setTempLoc([Number(res.coords.latitude + '23'), Number(res.coords.longitude + '23')])
        });
    }, [])

    useEffect(() => {
        if (latlng) {
            axios.get(`https://api.neshan.org/v5/reverse?lat=${latlng.lat}&lng=${latlng.lng}`, {
                headers: {
                    'Api-Key': 'service.b3d59d2f29b846babe1e65f16cbf7d89'
                }
            }).then(result => {
                const addressData = result.data
                setNewAddress({ ...newAddress, province: addressData.state.substr(6), city: addressData.city, address: addressData.formatted_address })
            })
        }
    }, [latlng])

    const handleNewAddress = async () => {
        const res = await axiosClient.post('/address', newAddress, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        setAddress([...address, res.data.address])
        setNewAddress({ province: '', city: '', address: '', postal_code: '' })
    }

    const updateAddress = async () => {
        const { id, ...rest } = editAddress
        const isEqual = _.isEqual(editAddress, address[index])
        if (!isEqual) {
            const res = await axiosClient.put(`/address/${id}`, rest, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            let updatedAddress = address
            updatedAddress.splice(index, 1, res.data.address)
            setEditAddress(null)
            setAddress(updatedAddress)
            setIndex(null)
            showAlertRef.current.classList.remove('opacity-0')
            setTimeout(() => {
                showAlertRef.current.classList.add('opacity-0')
            }, 3000)
        }
    }

    const deleteAddress = async () => {
        const { id } = deletedAddress
        const res = await axiosClient.delete(`/address/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
        let updatedAddress = address
        updatedAddress.splice(index, 1)
        setAddress(address.filter(addr => addr.id !== id))
        setDeleteAddress(null)
        showAlertRef.current.classList.remove('opacity-0')
            setTimeout(() => {
                showAlertRef.current.classList.add('opacity-0')
            }, 3000)
    }

    return (
        <div className="w-full h-full flex justify-start dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={open} onChangeState={changeDrawerState} />
            <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all">
                <UserHeader />
                <main className="w-full h-auto px-1">
                    <div className="w-full h-auto overflow-hidden mt-2">
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
                                    {addresses.length === 0 ? (
                                        <tr className="bg-primary/75 mt-2">
                                            <td colSpan={5} className="leading-10 text-gray-800 dark:text-gray-300 text-center font-bold">
                                                آدرسی برای شما ثبت نشده است
                                            </td>
                                        </tr>
                                    ) :
                                        address.map((addr, index) => (
                                            <tr key={index} className="text-center text-gray-700 dark:text-gray-300 border-b last:border-none">
                                                <td className="px-4 text-sm sm:text-base py-3 leading-10 text-gray-900 whitespace-nowrap dark:text-gray-300">{addr.province}</td>
                                                <td className="px-4 text-sm sm:text-base leading-10 text-gray-900 whitespace-nowrap dark:text-gray-300">{addr.city}</td>
                                                <td className="px-4 text-sm sm:text-base leading-10 text-gray-900 whitespace-nowrap dark:text-gray-300">{addr.address}</td>
                                                <td className="px-4 text-sm sm:text-base leading-10 text-gray-900 whitespace-nowrap dark:text-gray-300">{addr.postal_code}</td>
                                                <td className="flex flex-row justify-around items-center">
                                                    <div className="mt-3.5 lg:mt-2.5 mx-4">
                                                        <button onClick={() => { setEditAddress(addr); setIndex(index) }} className="mr-2 cursor-pointer pt-1 sm:pt-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block w-6 h-6">
                                                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="mt-3.5 lg:mt-2.5 mx-4">
                                                        <button onClick={() => { setDeleteAddress(addr); setIndex(index) }} className="ml-2 cursor-pointer pt-1 sm:pt-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block w-6 h-6">
                                                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-full h-auto flex flex-col border-t-2 border-slate-400 py-4">
                        <span className="inline-block w-auto h-10 text-right text-medium text-semi-small text-primary pr-4 my-2">ثبت آدرس جدید</span>
                        <form onSubmit={e => { e.preventDefault() }} className="w-full h-auto flex flex-col justify-around items-center">
                            <div className="w-full flex flex-col lg:flex-row justify-evenly">
                                <div className="w-11/12 lg:w-4/12 mx-auto lg:mx-12 h-auto grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:flex flex-col justify-evenly mb-4">
                                    <TextField id="province" label='استان' value={newAddress.province} />
                                    <TextField id="city" label='شهر' value={newAddress.city} />
                                    <TextField multiline label='آدرس' value={newAddress.address} className="col-span-full lg:col-span-1" />
                                    <TextField label='کد پستی' onChange={e => { setNewAddress({ ...newAddress, postal_code: e.target.value.trim() }) }} value={newAddress.postal_code} />
                                </div>
                                <div className="w-11/12 mx-auto lg:w-7/12 h-full">
                                    <Map onChangeMarker={ltlg => { setLatLng(ltlg) }} />
                                </div>
                            </div>
                            <div className="w-11/12 xsm:w-3/5 sm:w-40 h-auto self-center sm:self-end mb-8 sm:ml-12">
                                <button onClick={handleNewAddress} className="w-full md:w-40 h-10 mt-8 md:ml-6 mx-auto lg:ml-0 backdrop-blur-2xl outline-none bg-primary dark:bg-primary/75 border dark:border-slate-600 rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white dark:text-gray-200 text-semi-small font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-40 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-white before:-z-10 md:hover:border-primary md:hover:text-primary dark:hover:before:bg-white">
                                    ذخیره تغییرات آدرس
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
                <Modal open={!!editAddress} onClose={() => { setEditAddress(null) }}>
                    <div className="w-11/12 mx-auto h-auto flex flex-col justify-evenly mb-4">
                        <TextField id="province" label='استان' onChange={e => { setEditAddress({ ...editAddress, province: e.target.value.trim() }) }} value={editAddress?.province} />
                        <TextField id="city" label='شهر' onChange={e => { setEditAddress({ ...editAddress, city: e.target.value.trim() }) }} value={editAddress?.city} />
                        <TextField multiline label='آدرس' onChange={e => { setEditAddress({ ...editAddress, address: e.target.value }) }} value={editAddress?.address} className="col-span-full lg:col-span-1" />
                        <TextField id="postal_code" label='کد پستی' onChange={e => { setEditAddress({ ...editAddress, postal_code: e.target.value.trim() }) }} value={editAddress?.postal_code} />
                    </div>
                    <div className="w-11/12 xsm:w-3/5 sm:w-40 h-auto mx-auto self-center mb-8">
                        <button onClick={updateAddress} className="w-full md:w-40 h-10 mt-8 md:ml-6 mx-auto lg:ml-0 backdrop-blur-2xl outline-none bg-primary dark:bg-primary/75 border dark:border-slate-600 rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white dark:text-gray-200 text-semi-small font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-40 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-white before:-z-10 md:hover:border-primary md:hover:text-primary dark:hover:before:bg-white">
                            ذخیره تغییرات
                        </button>
                    </div>
                </Modal>
                <Modal open={!!deletedAddress} onClose={() => { setDeleteAddress(null); }} className="w-11/12 mx-auto">
                    <div className="w-full h-auto mt-4">
                        <p className="w-11/12 mx-auto px-4 py-2 rtl text-center border border-primary text-base tracking-wide rounded font-bold text-gray-900 my-8 bg-slate-100 whitespace-nowrap text-ellipsis overflow-hidden">{deletedAddress?.address}</p>
                        <p className="text-center font-medium text-gray-900 dark:text-gray-300">آیا از حذف آدرس اطمینان دارید؟</p>
                        <div className="w-full h-auto my-8 flex justify-around items-center">
                            <button onClick={deleteAddress} className="w-24 h-10 font-medium text-red-500 border border-red-500 rounded">
                                بله
                            </button>
                            <button onClick={() => { setDeleteAddress(null); }} className="w-24 h-10 font-medium text-gray-800 dark:text-gray-300 border border-slate-400 rounded">
                                لغو
                            </button>
                        </div>
                    </div>
                </Modal>
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
    const res = await axiosClient.get('/address', {
        headers: {
            Authorization: 'Bearer ' + token
        },
    })

    return {
        props: {
            token,
            addresses: res.data.addresses
        }
    }
})


export default Addresses