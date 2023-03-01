import React, { createRef, useEffect, useRef, useState } from "react";

import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import ProductSummary from '../components/ProductSummary';
import Checkbox from "../components/Checkbox";
import RangeSlider from "../components/RangeSliderM";
import Switch from "../components/Switch";
import ProductItemContainer from "../components/ProductItemContainer";
import Breadcrumb from "../components/Breadcrumb";
import Modal from "../components/Modal";


function Products() {

    const checkboxRefs = useRef([]);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [openFilterModal, setOpenFilterModal] = useState(false);

    const brands = ['ژاکارد', 'رویال جرمنی', 'یونیک', 'تریکو'];

    const handleChange = (e) => {
        console.log(e.target.checked);
    };

    const handleSlider = values => {
        // console.log(values);
    };

    const handleSwitch = e => {
        console.log(e.target.checked);
    };

    const allBrands = brands.map((brand, index) => <Checkbox label={brand} ref={el => checkboxRefs.current.push(el)} key={index} onChange={handleChange} />);

    return (
        <Layout title={'محصولات'}>
            <div className="w-full h-auto relative bg-slate-50/50 dark:bg-slate-800">
                <div className='w-full h-full'>
                    <div className="w-full h-full px-4 mb-2">
                        <Header />
                    </div>
                    <div className="w-full h-auto px-2">
                        <div className="w-full h-auto pr-2 mb-4">
                            <Breadcrumb items={['مال‌استور', 'روتختی']} />
                        </div>
                        <div className="w-full h-auto flex justify-between">
                            <aside className="hidden lg:block min-w-[280px] w-[280px] h-full mb-4 mr-2 sticky top-0 right-0 border dark:border-slate-400 rounded py-4">
                                <div className="w-full px-4 mb-5">
                                    <span className="text-xl font-bold text-gray-800 dark:text-gray-300">فیلترها</span>
                                </div>
                                <div className="w-full h-auto px-4">
                                    <ProductItemContainer textItem={'برند'}>
                                        {allBrands.map(brand => brand)}
                                    </ProductItemContainer>
                                    <span className="inline-block w-full border-b border-slate-200 mt-4 mb-2 px-4" />
                                    <ProductItemContainer textItem={'تعداد'}>
                                        <Checkbox label={'یک نفره'} onChange={handleChange} />
                                        <Checkbox label={'دو نفره'} onChange={handleChange} />
                                    </ProductItemContainer>
                                    <span className="inline-block w-full border-b border-slate-200 mt-4 mb-2 px-4" />
                                    <ProductItemContainer textItem={'جنس'}>
                                        <Checkbox label={'نخی'} onChange={handleChange} />
                                        <Checkbox label={'آکریلیک'} onChange={handleChange} />
                                    </ProductItemContainer>
                                    <span className="inline-block w-full border-b border-slate-200 mt-4 mb-2 px-4" />
                                    <Switch label={'فقط کالاهای موجود'} onChange={handleSwitch} />
                                    <span className="inline-block w-full border-b border-slate-200 mt-4 mb-2 px-4" />
                                    <ProductItemContainer textItem={'محدوده قیمت'}>
                                        <div className="w-full h-full pt-1 mx-auto">
                                            <RangeSlider min={0} max={10083000} step={1000} threshold={10} onChange={handleSlider} />
                                        </div>
                                    </ProductItemContainer>
                                </div>
                            </aside>
                            <div className="w-full h-full flex flex-col px-2 lg:px-4">
                                <div className="w-full h-12 flex flex-row justify-start items-center border-b border-slate-300 dark:border-slate-400">
                                    <div className="w-full h-full flex sm:hidden justify-start">
                                        <div className="w-auto h-10 flex justify-around items-center px-1" onClick={() => { setOpenFilterModal(true); }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 msm:w-6 h-5 msm:h-6 text-gray-800 dark:text-gray-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                            </svg>
                                            <span className="text-xs msm:text-sm font-medium text-gray-800 dark:text-gray-300 mr-0.5">فیلتر</span>
                                        </div>
                                        <Modal open={openFilterModal} fullHeight onClose={() => { setOpenFilterModal(false); }}>
                                            <div className="w-full px-4 mb-5">
                                                <span className="text-lg font-bold text-gray-800 dark:text-gray-300">فیلترها</span>
                                            </div>
                                            <div className="w-full h-auto px-4">
                                                <ProductItemContainer textItem={'برند'}>
                                                    {allBrands.map(brand => brand)}
                                                </ProductItemContainer>
                                                <span className="inline-block w-full border-b border-slate-200 mt-4 mb-2 px-4" />
                                                <ProductItemContainer textItem={'تعداد'}>
                                                    <Checkbox label={'یک نفره'} onChange={handleChange} />
                                                    <Checkbox label={'دو نفره'} onChange={handleChange} />
                                                </ProductItemContainer>
                                                <span className="inline-block w-full border-b border-slate-200 mt-4 mb-2 px-4" />
                                                <ProductItemContainer textItem={'جنس'}>
                                                    <Checkbox label={'نخی'} onChange={handleChange} />
                                                    <Checkbox label={'آکریلیک'} onChange={handleChange} />
                                                </ProductItemContainer>
                                                <span className="inline-block w-full border-b border-slate-200 mt-4 mb-2 px-4" />
                                                <Switch label={'فقط کالاهای موجود'} onChange={handleSwitch} />
                                                <span className="inline-block w-full border-b border-slate-200 mt-4 mb-2 px-4" />
                                                <ProductItemContainer textItem={'محدوده قیمت'}>
                                                    <div className="w-full h-full pt-1 mx-auto">
                                                        <RangeSlider min={0} max={10083000} step={1000} threshold={10} onChange={handleSlider} />
                                                    </div>
                                                </ProductItemContainer>
                                            </div>
                                            <div className="w-full h-12 absolute bottom-2 right-0 border-t pt-2 px-4 flex justify-start items-center">
                                                <span className="text-gray-800 dark:text-gray-300 text-sm font-medium">مشاهده 3,888 کالا</span>
                                            </div>
                                        </Modal>
                                        <div className="w-auto h-10 bg-slate-300 mr-6 flex justify-start items-center mb-2 outline-none px-1" onClick={() => { setOpenOrderModal(true); }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 msm:w-6 h-5 msm:h-6 text-gray-800 dark:text-gray-300 dark:text-gray-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                                            </svg>
                                            <span className="text-xs msm:text-sm font-medium text-gray-800 dark:text-gray-300 mr-0.5">پربازدید&zwnj;ترین&zwnj;ها</span>
                                        </div>
                                        <Modal open={openOrderModal} onClose={() => { setOpenOrderModal(false); }} title={'مرتب‌سازی بر اساس'}>
                                            <ul className="w-full h-auto flex-col justify-center">
                                                <li className="w-full h-14 text-ellipsis text-sm font-medium px-6 border-b border-slate-200 text-gray-800 dark:text-gray-300 flex justify-between items-center mx-auto">
                                                    <span>پربازدید&zwnj;ترین&zwnj;ها</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                    </svg>
                                                </li>
                                                <li className="w-full h-14 text-ellipsis text-sm font-medium px-6 border-b border-slate-200 text-gray-800 dark:text-gray-300 flex justify-between items-center mx-auto">
                                                    پرفروش&zwnj;ترین&zwnj;ها
                                                </li>
                                                <li className="w-full h-14 text-ellipsis text-sm font-medium px-6 border-b border-slate-200 text-gray-800 dark:text-gray-300 flex justify-between items-center mx-auto">
                                                    محبوب&zwnj;ترین&zwnj;ها
                                                </li>
                                                <li className="w-full h-14 text-ellipsis text-sm font-medium px-6 border-b border-slate-200 text-gray-800 dark:text-gray-300 flex justify-between items-center mx-auto">
                                                    ارزان&zwnj;ترین
                                                </li>
                                                <li className="w-full h-14 text-ellipsis text-sm font-medium px-6 text-gray-800 dark:text-gray-300 flex justify-start items-center mx-auto">
                                                    گران&zwnj;ترین
                                                </li>
                                            </ul>
                                        </Modal>
                                    </div>
                                    <div className="w-full h-full hidden sm:flex flex-row justify-start items-center mb-2">
                                        <div className="w-28 h-full text-sm font-medium flex flex-row justify-start items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary dark:text-secondary">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                                            </svg>
                                            <span className="inline-block mx-2 text-gray-800 dark:text-gray-300">مرتب&zwnj;سازی:</span>
                                        </div>
                                        <button className="w-auto h-full text-sm text-primary flex justify-start items-center mx-2">پربازدید&zwnj;ترین&zwnj;ها</button>
                                        <button className="w-auto h-full text-sm text-gray-800 dark:text-gray-300 flex justify-start items-center mx-2">پرفروش&zwnj;ترین&zwnj;ها</button>
                                        <button className="w-auto h-full text-sm text-gray-800 dark:text-gray-300 flex justify-start items-center mx-2">محبوب&zwnj;ترین&zwnj;ها</button>
                                        <button className="w-auto h-full text-sm text-gray-800 dark:text-gray-300 flex justify-start items-center mx-2">جدید&zwnj;ترین</button>
                                        <button className="w-auto h-full text-sm text-gray-800 dark:text-gray-300 flex justify-start items-center mx-2">ارزان&zwnj;ترین</button>
                                        <button className="w-auto h-full text-sm text-gray-800 dark:text-gray-300 flex justify-start items-center mx-2">گران&zwnj;ترین</button>
                                    </div>
                                    <div className="hidden md:block w-40 h-auto text-left">
                                        <span className="text-sm px-2 whitespace-nowrap text-gray-800 dark:text-gray-300">3,888 کالا</span>
                                    </div>
                                </div>
                                <main className="w-auto h-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-items-center content-center">
                                    <ProductSummary />
                                    <ProductSummary />
                                    <ProductSummary />
                                    <ProductSummary />
                                    <ProductSummary />
                                    <ProductSummary />
                                    <ProductSummary />
                                    <ProductSummary />
                                    <ProductSummary />
                                    <ProductSummary />
                                </main>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full px-2 md:px-12">
                        <Footer />
                    </div>
                </div>
            </div>
        </Layout >
    );
}

export default Products;