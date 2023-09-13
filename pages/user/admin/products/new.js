import React, { useState, useEffect } from "react";
import axiosClient from "../../../../utils/axiosClient";
import { wrapper } from '../../../../redux/store'
import UserPanelDrawer from "../../../../components/UserPanelDrawer";
import UserHeader from '../../../../components/UserHeader';
import TextField from '../../../../components/TextField';
import ComboBox from '../../../../components/ComboBox';
import CheckBox from '../../../../components/CheckBox';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '../../../../components/Table'

/* 

            $table->unsignedBigInteger('category_id');
            $table->string('name', 255)->unique();
            $table->string('model', 255);
            $table->integer('width')->comment('in cm');
            $table->integer('length');
            $table->integer('height')->nullable();
            $table->text('long_desc');
            $table->text('short_desc')->nullable();
            $table->integer('weight')->comment('in gram');
            $table->string('display_name', 255);
            $table->bigInteger('unit_price');
            $table->string('slug', 255)->unique();
            $table->string('meta_description', 255);
            $table->string('meta_keywords', 255);
            $table->string('meta_title', 128);

            $table->string('color_name', 7);

            $table->string('image', 255);
            $table->boolean('main')->default(false)->comment('for display product in category');
            
            $table->string('tag_name', 45)->unique()

            $table->string('feature_name', 255)->unique();
            $table->string('feature_value', 255);
            $table->unsignedInteger('stock');
            $table->boolean('active');
*/

function NewProduct({ token, categories }) {

    const [open, setOpen] = useState(false)
    const [flattenCats, setFlattenCats] = useState([])

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
                <div className="w-full h-auto">
                    <div className="w-[96%] h-auto mx-auto rounded mt-4 mb-12">
                        <div className="w-full h-full grid grid-cols-4 gap-6">
                            <TextField value={'mard'} required className="col-span-2" label="نام محصول" />
                            <TextField required className="col-span-2" label="عنوان نمایشی محصول" hint="نمایش در بخش عنوان محصول" />
                            <TextField required label="مدل محصول" />
                            <TextField required type="number" label="وزن (گرم)" />
                            <TextField required label="قیمت واحد (تومان)" />
                            <ComboBox required data={flattenCats} label="دسته‌بندی محصول" />
                            <div className="w-full col-span-full mt-6 mb-4 h-1 border-t-2 border-primary dark:border-secondary" />
                            <fieldset className="row-span-3 col-span-1 border rounded px-2">
                                <legend className="text-xs h-4 font-medium transition-all text-primary dark:text-secondary">ابعاد محصول</legend>
                                <TextField required label="عرض" type="number" />
                                <TextField className="mt-8" required label="طول" type="number" />
                                <TextField className="mt-8" label="ارتفاع" type="number" />
                            </fieldset>
                            <fieldset className="row-span-3 col-span-2 border rounded px-2">
                                <legend className="text-xs h-4 font-medium transition-all text-primary dark:text-secondary">ویژگی‌های برجسته محصول</legend>
                                <div className="w-full flex flex-row justify-between items-start">
                                    <div className="w-full flex flex-col justify-between items-start ml-8">
                                        <TextField required label="ویژگی" />
                                        <TextField className="mt-4" required label="مقدار ویژگی" />
                                    </div>
                                    <TextField inputClassName="sm:text-sm resize-none" hint="حداکثر 5 ویژگی" multiline label="ویژگی‌ها" value="ویژگی: مقدار ویژگی" readOnly rows={10} />
                                </div>
                            </fieldset>
                            <fieldset className="row-span-3 border rounded px-2">
                                <legend className="text-xs h-4 font-medium transition-all text-primary dark:text-secondary">برچسب‌های محصول</legend>
                                <ComboBox required data={[]} label="برچسب جدید" />
                                <TextField className="mt-4" inputClassName="sm:text-sm resize-none" hint="حداکثر 8 برچسب" multiline label="برچسب‌ها" value="روتختی، روتختی دونفره" readOnly rows={6} />
                            </fieldset>
                            <fieldset className="h-auto row-span-4 col-span-2 flex flex-row justify-evenly border border-primary rounded px-2">
                                <legend className="text-xs h-4 font-medium transition-all">رنگ‌های محصول</legend>
                                <div className="w-auto flex flex-col">
                                    <TextField required label="رنگ" />
                                    <TextField className="my-6" required label="تعداد موجود" type="number" />
                                </div>
                                <div className="w-full max-w-[40%] h-auto border rounded mb-2 py-2">
                                    <div>
                                        <span></span>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="row-span-4 col-span-2 border rounded px-2">
                                <legend className="text-xs h-4 font-medium transition-all text-primary dark:text-secondary">ویژگی‌های محصول</legend>
                                <div className="w-full flex flex-col justify-between items-start">
                                    <div className="w-full flex flex-row justify-between items-start mb-6">
                                        <TextField className="mx-2" required label="ویژگی" />
                                        <TextField className="mx-2" required label="مقدار ویژگی" />
                                    </div>
                                    <TableContainer className={"border-t"}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className={"border-l border-primary text-sm"}>ویژگی</TableCell>
                                                    <TableCell className={"text-sm"}>مقدار ویژگی</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </fieldset>
                            <fieldset className="h-auto row-span-3 col-span-2 border rounded px-4">
                                <legend className="text-xs h-4 font-medium transition-all text-primary dark:text-secondary">فراداده</legend>
                                <TextField required label="عنوان فراداده" />
                                <TextField className="mt-8" required maxLength={1000} label="کلمات کلیدی" />
                                <TextField className="mt-8" required multiline={true} maxLength={1000} label="توضیح فراداده" />
                            </fieldset>
                            <TextField type="file" required label="تصاویر محصول" />
                            <div className="w-full col-span-full mt-6 mb-4 h-1 border-t-2 border-primary dark:border-secondary" />
                            <fieldset className="h-auto row-span-3 col-span-full border rounded px-2">
                                <legend className="text-xs h-4 font-medium transition-all text-primary dark:text-secondary">توضیحات</legend>
                                <div className="w-full flex flex-row justify-around">
                                    <TextField className="mx-2" required multiline={true} maxLength={1000} label="توضیح کامل" />
                                    <TextField className="mx-2" multiline={true} label="توضیح کوتاه" />
                                </div>
                            </fieldset>
                            <CheckBox label="فعال" defaultChecked />
                        </div>
                    </div>
                </div>
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

export default NewProduct;