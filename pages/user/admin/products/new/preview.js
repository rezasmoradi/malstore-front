import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { wrapper } from '../../../../../redux/store'
import axiosClient from '../../../../../utils/axiosClient'
import Layout from '../../../../../components/Layout'
import Header from '../../../../../components/Header'
import Footer from '../../../../../components/Footer'
import Breadcrumb from '../../../../../components/Breadcrumb'
import Button from '../../../../../components/Button'
import Tooltip from '../../../../../components/Tooltip'
import FiveStar from '../../../../../components/FiveStar'
import { Table, TableHead, TableBody, TableRow, TableCell } from '../../../../../components/Table'
import { selectProduct } from "../../../../../redux/slices/productSlice";

function Preview({ token }) {

    const router = useRouter();
    const { properties } = useSelector(selectProduct)

    const [showMoreIsEnable, setShowMoreIsEnable] = useState(false);

    console.log(properties);

    const [categories, setCategoies] = useState([])
    const tabRef = useRef([]);
    const sectionsRef = useRef();
    const commentsRef = useRef([]);
    const replyCommentRef = useRef();
    const repliedElRef = useRef(null);
    const changeItemsRef = useRef();
    const colorsRef = useRef([]);

    useEffect(() => {
        // if (properties.category_id) {
        const checkCategory = async () => {
            const res = await axiosClient.get(`/category/${4}`, {
                headers: {
                    Authorization: token,
                }
            })
            let cats = []
            const { parent_category } = res.data.category
            parent_category.map(cat => { cats.push(cat.name) })
            cats.push(res.data.category.name)
            setCategoies(cats)
        }
        checkCategory()
        // }
    }, [])

    const handleTab = el => {
        const target = el.currentTarget;

        tabRef.current.map((elem, index) => {
            if (elem.children[0].classList.contains('after:w-full')) {
                ['after:w-full', 'after:w-0', 'after:scale-x-0', 'after:scale-x-100'].map(cls => { elem.children[0].classList.toggle(cls); });
            }

            if (elem === target) {
                sectionsRef.current.children[index].scrollIntoView({ behavior: 'smooth' });
            }

        });

        ['after:w-0', 'after:w-full', 'after:scale-x-0', 'after:scale-x-100'].map(cls => { target.children[0].classList.toggle(cls); });
    };

    useEffect(() => {
        sectionsRef.current.firstChild.style.maxHeight = showMoreIsEnable
            ? sectionsRef.current.firstChild.children[1].offsetHeight + 120 + 'px'
            : '320px';
    }, [showMoreIsEnable]);

    useEffect(() => {
        sectionsRef.current.onscroll = (e) => {
            console.log(e);
        }
    }, [sectionsRef.current]);

    const addTabToList = tab => {
        if (tab !== null && tabRef.current.includes(tab) === false) {
            tabRef.current.push(tab);
        }
    };

    const handleScroll = index => {
        tabRef.current.map((el) => {
            if (el === tabRef.current[index]) {
                ['after:w-0', 'after:scale-x-0'].map(cls => { tabRef.current[index].firstChild.classList.remove(cls); });
                ['after:w-full', 'after:scale-x-100'].map(cls => { tabRef.current[index].firstChild.classList.add(cls); });
            } else {
                ['after:w-full', 'after:scale-x-100'].map(cls => { el.firstChild.classList.remove(cls); });
                ['after:w-0', 'after:scale-x-0'].map(cls => { el.firstChild.classList.add(cls); });
            }
        });
    };

    useEffect(() => {
        document.body.onscroll = e => {
            const sections = sectionsRef.current?.children;
            if (sections) {
                switch (true) {
                    case sections[0].getBoundingClientRect().top + 1 + window.screenY > 0:
                        handleScroll(0)
                        break;
                    case sections[1].getBoundingClientRect().top + 1 + window.screenY > 0:
                        handleScroll(1);
                        break;
                    case sections[2].getBoundingClientRect().top + 1 + window.screenY > 0:
                        handleScroll(2);
                        break;
                    case sections[3].getBoundingClientRect().top + 1 + window.screenY > 0:
                        handleScroll(3);
                        break;
                    default:
                        tabRef.current.map((el) => {
                            ['after:w-full', 'after:scale-x-100'].map(cls => { el.firstChild.classList.remove(cls); });
                            ['after:w-0', 'after:scale-x-0'].map(cls => { el.firstChild.classList.add(cls); });
                        });
                        break;
                }
            }
        }
    });

    const showMore = () => {
        sectionsRef.current.firstChild.children[1].classList.toggle('line-clamp-5');
        setShowMoreIsEnable(!showMoreIsEnable);
    };

    const addToCard = (e) => {
        changeItemsRef.current.style.maxHeight = '32px';
        changeItemsRef.current.style.paddingTop = '8px';
        changeItemsRef.current.style.paddingBottom = '8px';
    };

    const reduceItems = (e) => {
        if (changeItemsRef.current.children[1].innerHTML == 1) {
            changeItemsRef.current.style.maxHeight = 0;
            changeItemsRef.current.style.paddingTop = 0;
            changeItemsRef.current.style.paddingBottom = 0;
        } else {
            changeItemsRef.current.children[1].innerHTML = Number(changeItemsRef.current.children[1].innerHTML) - 1
        }
    };

    const addItems = (e) => {
        changeItemsRef.current.children[1].innerHTML = Number(changeItemsRef.current.children[1].innerHTML) + 1
    };

    const handleReply = e => {
        if (repliedElRef.current === null) {
            e.currentTarget.disabled = true;
            repliedElRef.current = e.currentTarget;
            replyCommentRef.current.classList.remove('invisible');
            e.currentTarget.parentElement.append(replyCommentRef.current);
            replyCommentRef.current.style.maxHeight = replyCommentRef.current.scrollHeight + replyCommentRef.current.firstChild.offsetHeight + 'px';
        }
    };

    const cancelReply = () => {
        replyCommentRef.current.classList.add('invisible');
        setTimeout(() => {
            replyCommentRef.current.style.maxHeight = 0;
            ['disabled:opacity-50', 'disabled:cursor-not-allowed'].map(cls => { repliedElRef.current.classList.remove(cls); });
            repliedElRef.current.disabled = false;
            repliedElRef.current = null;
        }, 250);
    };

    const chooseColor = e => {
        for (let i = 0; i <= 2; i++) {
            if (e.currentTarget === colorsRef.current[i]) {
                e.currentTarget.firstChild.classList.remove('hidden');
            } else {
                colorsRef.current[i].firstChild.classList.add('hidden');
            }
        }
    };

    return (
        <Layout title={'محصولات'}>
            <div className="w-full h-auto bg-white dark:bg-slate-900 dark:text-slate-400 overflow-hidden">
                <div className='w-full h-full'>
                    <div className="w-full h-full sm:px-2 mb-2 md:px-6">
                        <Header />
                    </div>
                    <div className="w-full h-full px-1 msm:px-6">
                        <Breadcrumb items={categories} className='flex sm:hidden' />
                        <div className="w-full h-full flex flex-col justify-between md:justify-center sm:flex-row">
                            {/* <div className="w-0 lg:w-1/12" /> */}
                            <div className="w-full sm:w-1/2 md:w-5/12 h-full flex flex-col justify-center items-center msm:pl-2 p-1">
                                {properties.images ? properties.images.filter(photo => photo.main === true).map((image, index) => (
                                    <img key={index} src={URL.createObjectURL(image.file)} className="w-full msm:w-11/12 msm:h-80 xsm:w-10/12 sm:w-11/12 h-40 xsm:h-80 sm:h-60 my-6 rounded drop-shadow-lg" />
                                )) : (
                                    <p className='mt-8'>
                                        تصویری ثبت نشده است
                                    </p>
                                )}
                                <ul className="w-full h-full flex flex-row justify-center items-center my-4 msm:my-6">
                                    {properties.images ? properties.images.filter(photo => photo.main === false).slice(0, 3).map((image, index) => (
                                        <li key={index} className="w-18 h-12 msm:h-18 mx-1 border rounded flex justify-center items-center">
                                            <img src={URL.createObjectURL(image.file)} className="w-16 h-10 msm:h-16 rounded-sm" />
                                        </li>
                                    )) : null}
                                    {properties.images?.length > 4 && (
                                        <li className="w-18 h-12 msm:h-18 mx-1 border p-1 rounded flex justify-center items-center relative cursor-pointer">
                                            <img src={URL.createObjectURL(properties.images.filter(photo => photo.main === false)[4])} className="w-16 h-10 msm:h-16 rounded-sm opacity-20" />
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute">
                                                <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                                            </svg>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="w-0 md:w-1/12 h-auto" />
                            <div className="w-full sm:w-5/12 lg:w-4/12 h-full sm:px-2">
                                <div className="w-full h-auto flex flex-col pt-4 overflow-auto">
                                    <Breadcrumb items={categories} className='hidden sm:flex' />
                                    <h1 className="text-base md:text-lg pt-3 text-gray-800 dark:text-gray-300">
                                        {properties.display_name ? properties.display_name : ''}
                                    </h1>
                                    <div className="w-full h-20 mt-3">
                                        <p className="text-sm md:text-base text-medium text-gray-900 dark:text-gray-300">ویژگی&zwnj;ها</p>
                                        <ul className="mt-1">
                                            {properties.best_features.length ? properties.best_features.map((feature, index) => (
                                                <li className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-slate-600">
                                                        <path fillRule="evenodd" d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm md:text-base text-gray-700 dark:text-gray-400 pl-2">{feature.name}:</span>
                                                    <span className="text-sm md:text-base text-gray-800 dark:text-gray-300 text-medium">{feature.value}</span>
                                                </li>
                                            )) : (
                                                <span className='text-sm'>هیچ ویژگی تعریف نشده است</span>
                                            )}
                                        </ul>
                                    </div>
                                    <span className="inline-block w-full h-1 border-b border-slate-400 mt-2 pt-1" />
                                </div>
                                <div className="w-full h-10 flex flex-col sm:flex-row justify-center md:justify-around items-center mt-6 md:mt-3">
                                    <div className="w-full sm:w-1/3">
                                        <Tooltip text={'افزودن به علاقه‌مندی‌ها'}>
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8 text-red-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div className="w-full sm:w-2/3 h-full flex justify-center items-center">
                                        <FiveStar rate={0} />
                                        <span className="inline-block px-1 text-medium text-gray-900 dark:text-gray-300">0</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-400">(0)</span>
                                    </div>
                                </div>
                                <div className="w-full h-auto flex flex-col mt-4">
                                    <div className="w-full h-auto mt-6 md:mt-2 flex flex-col">
                                        <p className="text-sm md:text-base text-medium text-gray-800 dark:text-gray-300">رنگ:
                                            <span className="px-2 text-medium text-gray-800 dark:text-gray-300">
                                                {properties.colors ? properties.colors[0].name : 'رنگی تعریف نشده است'}
                                            </span>
                                        </p>
                                        <div className="w-full md:w-2/5 h-auto my-2 flex justify-around sm:justify-evenly md:justify-start">
                                            {properties.colors && properties.colors.map((color, index) => (
                                                <button key={index} ref={el => { colorsRef.current.push(el); }} onClick={chooseColor} className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full outline-none border-2 border-white bg-[${color.color}] ml-2 relative p-1`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white absolute left-0 right-0 top-0 bottom-0 m-auto">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <span className="inline-block w-full h-1 border-b border-slate-400 pt-1" />
                                <div className="w-full flex justify-between md:px-1 md:mx-1">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-1 text-gray-800 dark:text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                        </svg>
                                        <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-300 text-medium">قیمت</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="w-full flex justify-end items-center">
                                            <span className="inline-block w-fit text-xs md:text-sm text-medium text-gray-500 dark:text-gray-400 line-through">{properties.unit_price ? properties.unit_price : 'قیمتی تعیین نشده است'}</span>
                                            <div className="w-fit h-6 bg-white rounded mr-1 md:mr-3 flex justify-center items-center">
                                                <span className="text-sm md:text-base text-red-600 text-medium whitespace-nowrap">درصد تخفیف</span>
                                            </div>
                                        </div>
                                        <span className="text-base md:text-xl text-bold text-gray-800 dark:text-gray-300 text-left pl-2">{properties.unit_price ? properties.unit_price : 'قیمتی تعیین نشده است'}</span>
                                    </div>
                                </div>
                                <div className="w-full h-24 pt-2">
                                    <div className="w-full h-full flex flex-col justify-center items-center">
                                        <button onClick={addToCard} type="button" className="w-full xsm:w-40 sm:w-40 md:w-56 h-10 flex justify-around items-center mx-auto text-xs xsm:text-base sm:text-sm whitespace-nowrap backdrop-blur-2xl outline-none bg-primary dark:bg-secondary border border-transparent rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white dark:text-gray-900 font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-56 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-white before:-z-10 md:hover:border-primary md:hover:text-primary dark:hover:before:bg-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                                            </svg>
                                            <span className="hidden msm:inline-block">افزودن به سبد خرید</span>
                                        </button>
                                        <div style={{ maxHeight: 0, transitionProperty: 'max-height', transition: 'ease-out', transitionDuration: '0.150s' }}
                                            ref={changeItemsRef}
                                            className="w-1/2 overflow-hidden bg-transparent rounded mx-auto mt-2 flex justify-between items-center">
                                            <button onClick={reduceItems} className="w-8 h-8 border-2 border-primary/75 dark:border-violet-400 rounded flex justify-center items-center outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-300">
                                                    <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <span className="text-xl font-medium text-gray-800 dark:text-gray-300">1</span>
                                            <button onClick={addItems} className="w-8 h-8 border-2 border-primary/75 dark:border-violet-400 rounded flex justify-center items-center outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-300">
                                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="w-full mt-1 flex flex-row justify-start items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 msm:w-8 msm:h-8 text-blue-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                    <span className="text-xs msm:text-sm text-gray-700 font-medium dark:text-gray-300 px-1 text-justify">
                                        بازگردانی محصول در صورتی پذیرفته می&zwnj;شود که محصول و کاور آن شامل پارگی، لکه و تغییرات ظاهری نباشد.
                                    </span>
                                </p>
                            </div>
                            {/* <div className="w-0 sm:w-1/12" /> */}
                        </div>
                    </div>
                    <div className="w-full h-72">
                        <p className="pr-3 pb-2 font-medium">محصولات مشابه</p>
                        <ul className="w-full h-auto flex flex-row relative overflow-scroll">
                            <li className="my-1">
                                <div className="w-full sm:w-[19rem] md:w-60 h-full overflow-x-auto border-b last:border-b-0 sm:border sm:last:border-b dark:border-slate-400 md:mx-0.5 sm:rounded flex flex-row sm:flex-col justify-start items-center sm:shadow-sm dark:shadow-none hover:cursor-pointer xl:hover:shadow-md">
                                    <div className="w-60 sm:w-full h-auto flex flex-row justify-center relative">
                                        <img src={`${router.basePath}/assets/images/cat-1.jpg`} loading={"lazy"} className='w-60 sm:w-40 h-36 sm:h-36 p-1 rounded-md' />
                                        <div className="w-full sm:w-4 absolute h-4 sm:h-16 top-36 sm:top-4 left-0 flex flex-row sm:flex-col justify-center sm:justify-start items-start">
                                            <span className="w-2 h-2 rounded-full outline-none bg-violet-800 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-yellow-500 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-gray-600 my-1 ml-1 relative p-1" />
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex flex-col justify-between items-start pt-6">
                                        <div className="w-auto h-auto self-start sm:self-center px-3">
                                            <h5 className='w-full h-12 sm:h-8 line-clamp-3 xsm:line-clamp-2 sm:line-clamp-2 text-xs xsm:text-base sm:text-sm font-medium pb-2 text-right sm:text-center text-gray-900 dark:text-gray-300'>
                                                روتختی طرح خرزهره 10 تیکه دونفره
                                            </h5>
                                        </div>
                                        <div className="w-full h-9 mb-2 -mr-2 flex justify-center items-center">
                                            <span className="font-medium text-sm msm:text-base text-gray-900 dark:text-gray-300">900,000</span>
                                            <span className="font-medium text-xs px-1 text-gray-900 dark:text-gray-300">تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="my-1">
                                <div className="w-full sm:w-[19rem] md:w-60 h-full overflow-x-auto border-b last:border-b-0 sm:border sm:last:border-b dark:border-slate-400 md:mx-0.5 sm:rounded flex flex-row sm:flex-col justify-start items-center sm:shadow-sm dark:shadow-none hover:cursor-pointer xl:hover:shadow-md">
                                    <div className="w-60 sm:w-full h-auto flex flex-row justify-center relative">
                                        <img src={`${router.basePath}/assets/images/cat-1.jpg`} loading={"lazy"} className='w-60 sm:w-40 h-36 sm:h-36 p-1 rounded-md' />
                                        <div className="w-full sm:w-4 absolute h-4 sm:h-16 top-36 sm:top-4 left-0 flex flex-row sm:flex-col justify-center sm:justify-start items-start">
                                            <span className="w-2 h-2 rounded-full outline-none bg-violet-800 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-yellow-500 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-gray-600 my-1 ml-1 relative p-1" />
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex flex-col justify-between items-start pt-6">
                                        <div className="w-auto h-auto self-start sm:self-center px-3">
                                            <h5 className='w-full h-12 sm:h-8 line-clamp-3 xsm:line-clamp-2 sm:line-clamp-2 text-xs xsm:text-base sm:text-sm font-medium pb-2 text-right sm:text-center text-gray-900 dark:text-gray-300'>
                                                روتختی طرح خرزهره 10 تیکه دونفره
                                            </h5>
                                        </div>
                                        <div className="w-full h-9 mb-2 -mr-2 flex justify-center items-center">
                                            <span className="font-medium text-sm msm:text-base text-gray-900 dark:text-gray-300">900,000</span>
                                            <span className="font-medium text-xs px-1 text-gray-900 dark:text-gray-300">تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="my-1">
                                <div className="w-full sm:w-[19rem] md:w-60 h-full overflow-x-auto border-b last:border-b-0 sm:border sm:last:border-b dark:border-slate-400 md:mx-0.5 sm:rounded flex flex-row sm:flex-col justify-start items-center sm:shadow-sm dark:shadow-none hover:cursor-pointer xl:hover:shadow-md">
                                    <div className="w-60 sm:w-full h-auto flex flex-row justify-center relative">
                                        <img src={`${router.basePath}/assets/images/cat-1.jpg`} loading={"lazy"} className='w-60 sm:w-40 h-36 sm:h-36 p-1 rounded-md' />
                                        <div className="w-full sm:w-4 absolute h-4 sm:h-16 top-36 sm:top-4 left-0 flex flex-row sm:flex-col justify-center sm:justify-start items-start">
                                            <span className="w-2 h-2 rounded-full outline-none bg-violet-800 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-yellow-500 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-gray-600 my-1 ml-1 relative p-1" />
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex flex-col justify-between items-start pt-6">
                                        <div className="w-auto h-auto self-start sm:self-center px-3">
                                            <h5 className='w-full h-12 sm:h-8 line-clamp-3 xsm:line-clamp-2 sm:line-clamp-2 text-xs xsm:text-base sm:text-sm font-medium pb-2 text-right sm:text-center text-gray-900 dark:text-gray-300'>
                                                روتختی طرح خرزهره 10 تیکه دونفره
                                            </h5>
                                        </div>
                                        <div className="w-full h-9 mb-2 -mr-2 flex justify-center items-center">
                                            <span className="font-medium text-sm msm:text-base text-gray-900 dark:text-gray-300">900,000</span>
                                            <span className="font-medium text-xs px-1 text-gray-900 dark:text-gray-300">تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="my-1">
                                <div className="w-full sm:w-[19rem] md:w-60 h-full overflow-x-auto border-b last:border-b-0 sm:border sm:last:border-b dark:border-slate-400 md:mx-0.5 sm:rounded flex flex-row sm:flex-col justify-start items-center sm:shadow-sm dark:shadow-none hover:cursor-pointer xl:hover:shadow-md">
                                    <div className="w-60 sm:w-full h-auto flex flex-row justify-center relative">
                                        <img src={`${router.basePath}/assets/images/cat-1.jpg`} loading={"lazy"} className='w-60 sm:w-40 h-36 sm:h-36 p-1 rounded-md' />
                                        <div className="w-full sm:w-4 absolute h-4 sm:h-16 top-36 sm:top-4 left-0 flex flex-row sm:flex-col justify-center sm:justify-start items-start">
                                            <span className="w-2 h-2 rounded-full outline-none bg-violet-800 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-yellow-500 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-gray-600 my-1 ml-1 relative p-1" />
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex flex-col justify-between items-start pt-6">
                                        <div className="w-auto h-auto self-start sm:self-center px-3">
                                            <h5 className='w-full h-12 sm:h-8 line-clamp-3 xsm:line-clamp-2 sm:line-clamp-2 text-xs xsm:text-base sm:text-sm font-medium pb-2 text-right sm:text-center text-gray-900 dark:text-gray-300'>
                                                روتختی طرح خرزهره 10 تیکه دونفره
                                            </h5>
                                        </div>
                                        <div className="w-full h-9 mb-2 -mr-2 flex justify-center items-center">
                                            <span className="font-medium text-sm msm:text-base text-gray-900 dark:text-gray-300">900,000</span>
                                            <span className="font-medium text-xs px-1 text-gray-900 dark:text-gray-300">تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="my-1">
                                <div className="w-full sm:w-[19rem] md:w-60 h-full overflow-x-auto border-b last:border-b-0 sm:border sm:last:border-b dark:border-slate-400 md:mx-0.5 sm:rounded flex flex-row sm:flex-col justify-start items-center sm:shadow-sm dark:shadow-none hover:cursor-pointer xl:hover:shadow-md">
                                    <div className="w-60 sm:w-full h-auto flex flex-row justify-center relative">
                                        <img src={`${router.basePath}/assets/images/cat-1.jpg`} loading={"lazy"} className='w-60 sm:w-40 h-36 sm:h-36 p-1 rounded-md' />
                                        <div className="w-full sm:w-4 absolute h-4 sm:h-16 top-36 sm:top-4 left-0 flex flex-row sm:flex-col justify-center sm:justify-start items-start">
                                            <span className="w-2 h-2 rounded-full outline-none bg-violet-800 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-yellow-500 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-gray-600 my-1 ml-1 relative p-1" />
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex flex-col justify-between items-start pt-6">
                                        <div className="w-auto h-auto self-start sm:self-center px-3">
                                            <h5 className='w-full h-12 sm:h-8 line-clamp-3 xsm:line-clamp-2 sm:line-clamp-2 text-xs xsm:text-base sm:text-sm font-medium pb-2 text-right sm:text-center text-gray-900 dark:text-gray-300'>
                                                روتختی طرح خرزهره 10 تیکه دونفره
                                            </h5>
                                        </div>
                                        <div className="w-full h-9 mb-2 -mr-2 flex justify-center items-center">
                                            <span className="font-medium text-sm msm:text-base text-gray-900 dark:text-gray-300">900,000</span>
                                            <span className="font-medium text-xs px-1 text-gray-900 dark:text-gray-300">تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="my-1">
                                <div className="w-full sm:w-[19rem] md:w-60 h-full overflow-x-auto border-b last:border-b-0 sm:border sm:last:border-b dark:border-slate-400 md:mx-0.5 sm:rounded flex flex-row sm:flex-col justify-start items-center sm:shadow-sm dark:shadow-none hover:cursor-pointer xl:hover:shadow-md">
                                    <div className="w-60 sm:w-full h-auto flex flex-row justify-center relative">
                                        <img src={`${router.basePath}/assets/images/cat-1.jpg`} loading={"lazy"} className='w-60 sm:w-40 h-36 sm:h-36 p-1 rounded-md' />
                                        <div className="w-full sm:w-4 absolute h-4 sm:h-16 top-36 sm:top-4 left-0 flex flex-row sm:flex-col justify-center sm:justify-start items-start">
                                            <span className="w-2 h-2 rounded-full outline-none bg-violet-800 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-yellow-500 my-1 ml-1 relative p-1" />
                                            <span className="w-2 h-2 rounded-full outline-none bg-gray-600 my-1 ml-1 relative p-1" />
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex flex-col justify-between items-start pt-6">
                                        <div className="w-auto h-auto self-start sm:self-center px-3">
                                            <h5 className='w-full h-12 sm:h-8 line-clamp-3 xsm:line-clamp-2 sm:line-clamp-2 text-xs xsm:text-base sm:text-sm font-medium pb-2 text-right sm:text-center text-gray-900 dark:text-gray-300'>
                                                روتختی طرح خرزهره 10 تیکه دونفره
                                            </h5>
                                        </div>
                                        <div className="w-full h-9 mb-2 -mr-2 flex justify-center items-center">
                                            <span className="font-medium text-sm msm:text-base text-gray-900 dark:text-gray-300">900,000</span>
                                            <span className="font-medium text-xs px-1 text-gray-900 dark:text-gray-300">تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full h-full px-1 sm:px-4 mt-12">
                        <div className='h-14'>
                            <ul className="w-full h-12 sticky top-0 flex justify-start leading-4 backdrop-blur rounded bg-slate-50/75 dark:bg-slate-700/30 my-2 pt-3">
                                <li className="cursor-pointer mx-1 sm:mx-3 md:mx-4" ref={addTabToList} onClick={handleTab}>
                                    <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-300 after:pt-2 after:transition-transform after:duration-500 after:block after:content-[''] after:ease-in-out after:w-0 after:h-1 after:scale-x-0 hover:after:scale-x-100 after:border-b-2 after:border-primary dark:after:border-violet-400">توضیحات</span>
                                </li>
                                <li className="cursor-pointer mx-1 sm:mx-3 md:mx-4" ref={addTabToList} onClick={handleTab}>
                                    <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-300 after:pt-2 after:transition-transform after:duration-500 after:block after:content-[''] after:ease-in-out after:w-0 after:h-1 after:scale-x-0 hover:after:scale-x-100 after:border-b-2 after:border-primary dark:after:border-violet-400">مشخصات</span>
                                </li>
                                <li className="cursor-pointer mx-1 sm:mx-3 md:mx-4" ref={addTabToList} onClick={handleTab}>
                                    <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-300 after:pt-2 after:transition-transform after:duration-500 after:block after:content-[''] after:ease-in-out after:w-0 after:h-1 after:scale-x-0 hover:after:scale-x-100 after:border-b-2 after:border-primary dark:after:border-violet-400">نظرات</span>
                                </li>
                                <li className="cursor-pointer mx-1 sm:mx-3 md:mx-4" ref={addTabToList} onClick={handleTab}>
                                    <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-300 after:pt-2 after:transition-transform after:duration-500 after:block after:content-[''] after:ease-in-out after:w-0 after:h-1 after:scale-x-0 hover:after:scale-x-100 after:border-b-2 after:border-primary dark:after:border-violet-400">پرسش&zwnj;ها</span>
                                </li>
                            </ul>
                        </div>
                        <div ref={sectionsRef}>
                            <section style={{ maxHeight: 320, transitionProperty: 'max-height', transition: 'ease-out', transitionDuration: '0.5s' }} className="w-full rounded bg-slate-50/50 dark:bg-slate-700/30 p-2 pr-4">
                                <h4 className="w-full h-8 msm:h-10 text-start text-sm msm:text-base font-semibold text-gray-800 dark:text-gray-300 border-b-2 mb-1 msm:mb-2 border-slate-300">توضیحات</h4>
                                <p className="text-xs msm:text-sm sm:text-base leading-8 msm:leading-9 text-justify line-clamp-5 text-gray-900 dark:text-gray-300">
                                    {properties.long_desc ? properties.long_desc : 'توضیحاتی نوشته نشده است'}
                                </p>
                                <Button style="none" className="text-sm" onClick={showMore}>
                                    {showMoreIsEnable ? 'نمایش توضیحات کمتر' : 'نمایش توضیحات بیشتر'}
                                </Button>
                            </section>
                            <section className="w-full h-auto bg-slate-50/50 dark:bg-slate-700/50 p-2 pr-4 mt-8">
                                <h4 className="w-full h-8 msm:h-10 text-start text-sm msm:text-base border-b-2 font-semibold text-gray-800 dark:text-gray-300">مشخصات محصول</h4>
                                <div className="w-full h-full flex flex-row mt-3 border-slate-300">
                                    <Table className="w-2/5 md:w-1/5 h-full flex flex-col justify-start">
                                        <TableHead className="flex flex-col">
                                            <TableRow className="px-2 dark:bg-transparent py-4 border-b border-primary">
                                                <TableCell className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-300">نام</TableCell>
                                            </TableRow>
                                            <TableRow className="px-2 dark:bg-transparent py-4 border-b border-primary">
                                                <TableCell className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-300">مدل</TableCell>
                                            </TableRow>
                                            <TableRow className="px-2 dark:bg-transparent py-4 border-b border-primary">
                                                <TableCell className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-300">جنس</TableCell>
                                            </TableRow>
                                            <TableRow className="px-2 dark:bg-transparent py-4 border-b border-primary">
                                                <TableCell className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-300">ابعاد</TableCell>
                                            </TableRow>
                                            <TableRow className="px-2 dark:bg-transparent py-4">
                                                <TableCell className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-300">اقلام همراه</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                    <Table className="w-3/5 md:w-1/3 h-full flex flex-col justify-start">
                                        <TableBody className="flex flex-col">
                                            <TableRow className="dark:bg-transparent py-4 border-b border-primary">
                                                <TableCell className="text-sm msm:text-base text-gray-900 dark:text-gray-300">روتختی طرح خرزهره</TableCell>
                                            </TableRow>
                                            <TableRow className="dark:bg-transparent py-4 border-b border-primary">
                                                <TableCell className="text-sm msm:text-base text-gray-900 dark:text-gray-300">ژاکارد</TableCell>
                                            </TableRow>
                                            <TableRow className="dark:bg-transparent py-4 border-b border-primary">
                                                <TableCell className="text-sm msm:text-base text-gray-900 dark:text-gray-300">پنبه</TableCell>
                                            </TableRow>
                                            <TableRow className="dark:bg-transparent py-4 border-b border-primary">
                                                <TableCell className="flex flex-row items-center text-gray-900 dark:text-gray-300">
                                                    <span className="text-sm msm:text-base">160</span>
                                                    <span className="px-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </span>
                                                    <span className="text-sm msm:text-base">190</span>
                                                    <span className="text-sm px-2">سانتی&zwnj;متر</span>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className="bg-slate-50/50 dark:bg-transparent py-4">
                                                <TableCell className="text-sm msm:text-base text-gray-900 dark:text-gray-300">کاور روتختی</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </section>
                            <section className="w-full h-auto bg-slate-50/50 dark:bg-slate-700/30 p-2 pr-4 mt-8">
                                <h4 className="w-full h-8 msm:h-10 text-start text-sm msm:text-base font-semibold text-gray-800 dark:text-gray-300 border-b-2 border-slate-300 mb-2">نظرات</h4>
                            </section>
                            <section className="w-full h-auto bg-slate-50/30 dark:bg-slate-700/30 p-2 pr-4 mt-8">
                                <h4 className="w-full h-8 msm:h-10 text-start text-sm msm:text-base font-semibold text-gray-800 dark:text-gray-300 border-b-2 border-slate-300 mb-2">پرسش&zwnj;ها</h4>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full px-2 md:px-8 pb-2">
                <Footer />
            </div>
        </Layout>
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

    return {
        props: {
            token
        }
    }
})

export default Preview