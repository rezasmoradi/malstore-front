import React, { useEffect, useState } from "react"
import { wrapper } from '../../../redux/store'
import axiosClient from "../../../utils/axiosClient"
import { useDispatch, useSelector } from "react-redux"
import { selectView } from "../../../redux/slices/userSlice"

import UserPanelDrawer from "../../../components/UserPanelDrawer"
import UserHeader from '../../../components/UserHeader'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination } from '../../../components/Table'
import TextField from '../../../components/TextField'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import SelectBox from "../../../components/SelectBox"
import Image from "next/image"
import { useRouter } from "next/router"
import { changeViewAction } from "../../../redux/actions/userAction"

const loader = ({ src }) => src

function List({ list, sub = '' }) {
    return list.map((cat, index) => {
        const created = cat.created_at.split('-')
        return (
            <React.Fragment key={index}>
                <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                    <TableCell>{cat.id}</TableCell>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>{cat.url_name}</TableCell>
                    <TableCell>
                        {sub ? sub : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-14 mx-auto">
                            <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>}
                    </TableCell>
                    <TableCell className={'w-8 h-8'}>
                        {
                            cat.thumbnail ?
                                <Image loader={loader} src={cat.thumbnail} width={48} height={48} className="inline-block rounded-sm" /> :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-14 mx-auto">
                                    <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                </svg>
                        }
                    </TableCell>
                    <TableCell className={'w-8 h-8'}>
                        {
                            cat.image ?
                                <Image loader={loader} src={cat.image} width={48} height={48} className="inline-block rounded-sm" /> :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-14 mx-auto">
                                    <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                </svg>
                        }
                    </TableCell>
                    <TableCell className={'w-8 h-8'}>
                        {new Date(created[0], created[2], created[1]).toLocaleDateString('fa-IR')}
                    </TableCell>
                </TableRow>
                {cat.sub_categories.length !== 0 && <List list={cat.sub_categories} sub={cat.name} />}
            </React.Fragment>
        )
    })
}

function Categories({ token, categories }) {

    const [cats, setCats] = useState(categories)
    const [open, setOpen] = useState(false)
    const [flattenCats, setFlattenCats] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [data, setData] = useState({ name: '', url_name: '' })
    const [view, setView] = useState(useSelector(selectView))
    const dispatch = useDispatch()

    const router = useRouter()

    const changeView = () => {
        const newView = view === 'table' ? 'grid' : 'table'
        setView(newView)
        dispatch(changeViewAction(newView))
    }

    var category = []
    const showTable = (cats = [], sub = 0) => {
        cats.map((cat, index) => {
            if (cat.sub_categories.length !== 0) {
                showTable(cat.sub_categories, sub++)
            }
            if (Array.isArray(cat)) {
                showTable(cat)
            } else {
                const { sub_categories, ...rest } = cat
                category[sub] = rest
                sub++
            }
        })
    }

    useEffect(() => {
        showTable(cats)
        const sortedCats = category.sort((a, b) => a.id - b.id)
        setFlattenCats(sortedCats)
    }, [cats])

    const handleNewCategory = async () => {

        if (data.name !== '' && data.url_name !== '') {
            let formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value)
            })

            const result = await axiosClient.post('/category', formData, {
                headers: {
                    Authorization: token,
                    "Content-Type": 'multipart/form-data'
                }
            })
            setCats([...cats, result.data.category])
            setOpenModal(false)
            setData({ name: '', url_name: '' })
        } else {
            setInvalid(true)
        }
    }

    return (
        <div className="w-full h-auto flex dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={open} role="admin" onChangeState={() => { setOpen(!open) }} />
            <div className="w-full h-full bg-white dark:bg-gray-800 transition-all overflow-hidden">
                <UserHeader role="admin" />
                <div className="w-full h-auto">
                    <div className="w-full h-auto sm:h-16 flex flex-col sm:flex-row justify-around items-center my-2">
                        <div className="w-full sm:w-1/3 h-auto sm:h-16 flex flex-row sm:flex-row-reverse justify-around items-center my-2">
                            <button onClick={() => { setOpenModal(true) }} className="w-auto h-9 md:h-10 mt-3 px-3 py-2 bg-transparent flex flex-row justify-around items-center text-gray-800 dark:text-gray-300 border border-primary rounded outline-none">
                                <span className="px-1 text-sm md:text-base font-medium">ثبت دسته&zwnj;بندی جدید</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 md:w-6 h-5 md:h-6">
                                    <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button onClick={changeView} className="w-auto h-9 md:h-10 mt-3 px-3 py-2 bg-transparent flex flex-row justify-around items-center text-gray-800 dark:text-gray-300 border border-primary rounded outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 md:w-6 h-5 md:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                            </button>
                        </div>
                        <div className="w-11/12 sm:w-96 h-auto">
                            <TextField value={''} label={'جستجو'} type={'text'} />
                        </div>
                    </div>
                    {view === 'table' ? (
                        <div className="w-[98%] mt-12 h-auto mx-auto border rounded">
                            <TableContainer>
                                <Table className={'lg:table-fixed'}>
                                    <TableHead>
                                        <TableRow className={'text-center h-12 text-sm border-b-2 border-slate-300 dark:border-slate-200'}>
                                            <TableCell component="th">
                                                <span className="inline-block mx-auto px-0.5">ردیف</span>
                                            </TableCell>
                                            <TableCell component="th">
                                                <span className="inline-block mx-auto px-0.5">نام</span>
                                            </TableCell>
                                            <TableCell component="th">
                                                <span className="inline-block mx-auto px-0.5">نام انگلیسی</span>
                                            </TableCell>
                                            <TableCell component="th">
                                                <span className="inline-block mx-auto px-0.5">زیر مجموعه</span>
                                            </TableCell>
                                            <TableCell component="th">
                                                <span className="inline-block mx-auto px-0.5">تصویر بندانگشتی</span>
                                            </TableCell>
                                            <TableCell component="th">
                                                <span className="inline-block mx-auto px-0.5">تصویر اصلی (برای نمایش دسته)</span>
                                            </TableCell>
                                            <TableCell component="th">
                                                <span className="inline-block mx-auto px-0.5">تاریخ ثبت</span>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <List list={cats} />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination />
                        </div>
                    ) : (
                        <div className="w-[98%] mt-12 h-auto mx-auto">
                            <div className="w-auto mx-auto flex flex-row sm:flex-col">
                                <div className="w-fit border rounded">
                                    <Image loader={loader} src={`${router.basePath}/assets/images/4671145.jpg`} width={128} height={128} />
                                    <div className="w-full mx-4 sm:mx-0 mt-1">
                                        <p className="text-gray-900 text-base font-medium">لوازم آشپزخانه</p>
                                        <p className="text-gray-800 text-sm mt-2">kitchen appliances</p>
                                        <p className="text-gray-800 text-sm mt-2">
                                            دارای
                                            <span className="inline-block px-1">2</span>
                                            زیرمجموعه
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Modal open={openModal} title={'ثبت دسته‌بندی جدید'} onClose={() => { setOpenModal(false) }}>
                    <div className="w-11/12 mx-auto flex flex-col justify-around items-center">
                        <TextField required invalid={invalid} className="my-3" label="نام فارسی دسته‌بندی" value={data.name} onChange={e => { setInvalid(false); setData({ ...data, name: e.target.value }) }} />
                        <TextField required className="my-3" label="نام انگلیسی دسته‌بندی" value={data.url_name} onChange={e => { setData({ ...data, url_name: e.target.value }) }} />
                        <TextField className="my-3" label="شرایط بازگشت محصولات در این دسته بندی" value={data.url_name} onChange={e => { setData({ ...data, url_name: e.target.value }) }} />
                        <SelectBox label="نام زیر مجموعه" value={data.parent_id || null} data={flattenCats} onSelect={item => { setData({ ...data, parent_id: item.id }) }} />
                        <TextField className="my-3" type={'file'} accept=".jpg,.jpeg,.png" label="تصویر بندانگشتی دسته‌بندی" onChange={e => setData({ ...data, thumbnail: e.currentTarget.files[0] })} />
                        <TextField type={'file'} accept=".jpg,.jpeg,.png" label="تصویر دسته‌ برای نمایش در بخش دسته‌بندی‌ها" onChange={e => setData({ ...data, image: e.currentTarget.files[0] })} />
                        <Button onClick={handleNewCategory} className="mt-6 mb-1">
                            ثبت دسته‌بندی
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {

    const { token } = ctx.req.cookies

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const res = await axiosClient.get('/category', {
        headers: {
            Authorization: token
        }
    })

    return {
        props: {
            token,
            categories: res.data.categories
        }
    }
})

export default Categories;