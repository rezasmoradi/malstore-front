import React, { useState } from "react"
import { useRouter } from "next/router"
import { wrapper } from '../../../../../redux/store'
import UserPanelDrawer from "../../../../../components/UserPanelDrawer"
import UserHeader from '../../../../../components/UserHeader'
import TextField from '../../../../../components/TextField'
import Button from '../../../../../components/Button'
import ProductFormFillStepper from '../../../../../components/ProductFormFillStepper'
import { TableContainer, Table, TableBody, TableRow, TableCell } from '../../../../../components/Table'
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectProduct } from "../../../../../redux/slices/productSlice"
import { setProductPropertiesAction } from "../../../../../redux/actions/productAction"

function Features() {

    const dispatch = useDispatch()
    const { properties } = useSelector(selectProduct)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const featureNameRef = useRef()
    const bestFeatureNameRef = useRef()
    const [currentFeature, setCurrentFeature] = useState({ name: '', value: null })
    const [currentBestFeature, setCurrentBestFeature] = useState({ name: '', value: null })
    const [data, setData] = useState({
        features: [],
        best_features: [],
    })

    const handleFeature = e => {
        e.preventDefault()
        if (currentFeature.name !== '' && data.features.filter(feature => feature.name === currentFeature.name).length < 1) {
            let features = data.features
            features.push(currentFeature)
            setData({ ...data, features })
            setCurrentFeature({ name: '', value: null })
            featureNameRef.current.focus()
        }
    }

    const handleBestFeature = e => {
        e.preventDefault()
        if (currentBestFeature.name !== '' && data.best_features.filter(feature => feature.name === currentBestFeature.name).length < 1) {
            let best_features = data.best_features
            best_features.push(currentBestFeature)
            setData({ ...data, best_features })
            setCurrentBestFeature({ name: '', value: null })
            bestFeatureNameRef.current.focus()
        }
    }

    return (
        <div className="w-full h-full flex dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={open} role="admin" onChangeState={() => { setOpen(!open) }} />
            <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all overflow-hidden">
                <UserHeader />
                <div className="w-full h-full">
                    <div className="w-[90%] h-full mx-auto rounded mt-4 mb-12">
                        <div className="w-full h-full flex justify-center items-start">
                            <ProductFormFillStepper properties={properties} />
                        </div>
                        <div className="w-full h-full mt-8 content-center items-center grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-14 sm:gap-y-8">
                            <fieldset className="row-span-4 col-span-2 border border-primary rounded px-2">
                                <legend className="text-xs h-4 font-medium text-gray-800 dark:text-gray-400 transition-colors">ویژگی‌های محصول</legend>
                                <div className="w-full flex flex-col justify-between items-start">
                                    <form onSubmit={handleFeature} className="w-full flex flex-col justify-center items-center mb-6">
                                        <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start">
                                            <TextField ref={featureNameRef} value={currentFeature.name} onChange={e => { setCurrentFeature({ ...currentFeature, name: e.target.value }) }} className="my-2 sm:mx-2" required label="ویژگی" />
                                            <TextField value={currentFeature.value} onChange={e => { setCurrentFeature({ ...currentFeature, value: e.target.value }) }} className="my-2 sm:mx-2" required label="مقدار ویژگی" />
                                        </div>
                                        <Button type="submit" className="mt-8">ثبت</Button>
                                    </form>
                                    <span className="text-xs md:text-sm text-gray-800 dark:text-gray-400 my-1">برای حذف هر مورد روی سطر آن کلیک کنید</span>
                                    <TableContainer className={"border-t mb-2"}>
                                        <Table className={'table-fixed relative'}>
                                            <TableBody>
                                                {data.features.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell className={"border-l border-primary text-sm"}>ویژگی</TableCell>
                                                        <TableCell className={"text-sm"}>مقدار ویژگی</TableCell>
                                                    </TableRow>
                                                ) : data.features.map((feature, index) => (
                                                    <TableRow key={index} className={'border-b border-primary last:border-none'} onClick={() => { setData({ ...data, features: data.features.filter(f => f.name !== feature.name) }) }}>
                                                        <TableCell className={"border-l border-primary text-sm"}>{feature.name}</TableCell>
                                                        <TableCell className={"text-sm"}>{feature.value}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </fieldset>
                            <fieldset className="row-span-3 col-span-2 border border-primary rounded px-2">
                                <legend className="text-xs h-4 font-medium text-gray-800 dark:text-gray-400 transition-colors">ویژگی‌های برجسته محصول</legend>
                                <div className="w-full flex flex-col sm:flex-row justify-between items-start">
                                    <div className="w-full sm:w-1/2 mb-8 sm:mr-4 sm:mb-0">
                                        <form onSubmit={handleBestFeature} className="w-full sm:w-11/12 flex flex-col justify-between items-center">
                                            <TextField ref={bestFeatureNameRef} value={currentBestFeature.name} onChange={e => { setCurrentBestFeature({ ...currentBestFeature, name: e.target.value }) }} className="my-2" required label="ویژگی" />
                                            <TextField value={currentBestFeature.value} onChange={e => { setCurrentBestFeature({ ...currentBestFeature, value: e.target.value }) }} className="mt-6" required label="مقدار ویژگی" />
                                            <Button type="submit" className="mt-8 mb-4">ثبت</Button>
                                        </form>
                                    </div>
                                    <div className="w-full sm:w-1/2 h-auto relative mb-8 sm:mb-0 sm:ml-4">
                                        <fieldset className="w-full h-full min-h-[12rem] border rounded">
                                            <legend className="text-xs h-4 font-medium transition-all ltr text-gray-900 pr-0.5 dark:text-gray-300">ویژگی‌ها</legend>
                                            <div className="mt-2">
                                                {data.best_features.length === 0 ? (
                                                    <span className="inline-block text-base px-2 pb-2 font-medium text-gray-800 dark:text-gray-400 leading-8">ویژگی: مقدار ویژگی</span>
                                                ) : data.best_features.map((feature, index) => (
                                                    <div key={index} className="mt-2" onClick={() => { setData({ ...data, best_features: data.best_features.filter(f => f.name !== feature.name) }) }}>
                                                        <span className="px-1 text-gray-800 dark:text-gray-300">{feature.name}:</span>
                                                        <span className="font-medium text-gray-800 dark:text-gray-300">{feature.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="absolute top-full text-xs md:text-sm text-gray-800 dark:text-gray-400 px-1 mt-0.5">برای حذف هر مورد روی آن کلیک کنید</span>
                                        </fieldset>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="w-full lg:w-1/2 mx-auto my-12 flex flex-col sm:flex-row justify-evenly items-center">
                            <Button style='outlined' className="sm:ml-3 md:ml-0"
                                onClick={() => { router.push('/user/admin/products/new/preview') }}>
                                پیش‌نمایش
                            </Button>
                            <Button className='my-8 sm:mx-2'
                                onClick={() => { router.push('/user/admin/products/new/secondary') }}>
                                رفتن به مرحله قبل
                            </Button>
                            <Button className="sm:mr-3 md:mr-0"
                                onClick={() => { dispatch(setProductPropertiesAction(data)); router.push('/user/admin/products/new/metadata') }}>
                                رفتن به مرحله بعد
                            </Button>
                        </div>
                    </div>
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
            }
        }
    }
})

export default Features