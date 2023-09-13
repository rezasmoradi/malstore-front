import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import axiosClient from "../../../../../utils/axiosClient"
import { wrapper } from '../../../../../redux/store'
import UserPanelDrawer from "../../../../../components/UserPanelDrawer"
import UserHeader from '../../../../../components/UserHeader'
import TextField from '../../../../../components/TextField'
import Button from '../../../../../components/Button'
import ProductFormFillStepper from '../../../../../components/ProductFormFillStepper'
import { selectProduct } from "../../../../../redux/slices/productSlice"
import { setProductPropertiesAction } from "../../../../../redux/actions/productAction"
import Checkbox from "../../../../../components/Checkbox"
import SelectBox from "../../../../../components/SelectBox"

function Primary({ token, categories }) {

    const [open, setOpen] = useState(false)
    const { properties } = useSelector(selectProduct)
    const dispatch = useDispatch()
    const router = useRouter()
    const [flattenCats, setFlattenCats] = useState([])
    const [data, setData] = useState({
        name: properties.name,
        display_name: properties.display_name,
        model: properties.model,
        category_id: properties.category_id,
        weight: properties.weight,
        unit_price: properties.unit_price,
        long_desc: properties.long_desc,
        short_desc: properties.short_desc,
        active: properties.active
    })

    var category = []
    const showTable = (cats = [], sub = 0) => {
        cats.map(cat => {
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
        showTable(categories)
        const sortedCats = category.sort((a, b) => a.id - b.id)
        setFlattenCats(sortedCats)
    }, [])

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
                        <div className="w-full h-full mt-6 sm:mt-3 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-x-14 sm:gap-y-8">
                            <TextField value={data.name} onChange={e => { setData({ ...data, name: e.target.value }) }} required label="نام محصول" />
                            <TextField value={data.display_name} onChange={e => { setData({ ...data, display_name: e.target.value }) }} required label="عنوان نمایشی محصول" hint="نمایش در بخش نام محصول" />
                            <TextField value={data.model} onChange={e => { setData({ ...data, model: e.target.value }) }} required label="مدل محصول" />
                            <SelectBox required defaultValue={flattenCats.filter(cat => cat.id === data.category_id)[0]?.name} onSelect={item => { setData({ ...data, category_id: item.id }) }} required data={flattenCats} label="دسته‌بندی محصول" />
                            <TextField value={data.weight} onChangeValue={val => { setData({ ...data, weight: val }) }} onChange={e => { setData({ ...data, weight: e.target.value }) }} required type="number" label="وزن (گرم)" />
                            <TextField value={data.unit_price} onChange={e => { setData({ ...data, unit_price: e.target.value }) }} required label="قیمت واحد (تومان)" />
                            <Checkbox label="موجود برای نمایش در سایت" onChange={e => { setData({ ...data, active: e.target.checked }) }} defaultChecked />
                            <fieldset className="h-auto row-span-3 col-span-full border border-primary rounded px-4 pb-4">
                                <legend className="text-xs h-4 font-medium transition-all">توضیحات</legend>
                                <div className="w-full flex flex-col md:flex-row justify-around items-center md:items-start">
                                    <TextField value={data.long_desc} onChange={e => { setData({ ...data, long_desc: e.target.value }) }} className="mx-2 mb-4 md:mb-0" required multiline={true} maxLength={1000} label="توضیح کامل" />
                                    <TextField value={data.short_desc} onChange={e => { setData({ ...data, short_desc: e.target.value }) }} className="mx-2" multiline={true} label="توضیح کوتاه" />
                                </div>
                            </fieldset>
                        </div>
                        <div className="w-full md:w-1/2 mx-auto my-12 flex flex-col sm:flex-row justify-evenly items-center">
                            <Button className='mt-8 sm:mt-0 sm:mr-2' onClick={() => { dispatch(setProductPropertiesAction(data)); router.push('/user/admin/products/new/secondary') }}>
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

    try {
        const res = await axiosClient.get('/category', {
            headers: {
                Authorization: token
            }
        })

        if (res.status === 200) {
            return {
                props: {
                    token,
                    categories: res.data.categories
                }
            }
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                }
            }
        } else {
            console.error(err);
        }
    }
})

export default Primary