import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/BreadCrumb";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import FiveStar from "../../components/FiveStar";
import Tooltip from "../../components/Tooltip";
import ProductSummery from '../../components/ProductSummary';

function Product() {

    const router = useRouter();
    const { pid } = router.query;

    const [showMoreIsEnable, setShowMoreIsEnable] = useState(false);

    const tabRef = useRef([]);
    const sectionsRef = useRef();
    const commentsRef = useRef([]);
    const replyCommentRef = useRef();
    const repliedElRef = useRef(null);
    const changeItemsRef = useRef();
    const colorsRef = useRef([]);

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
            const sections = sectionsRef.current.children;
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
            <div className="w-full h-auto  dark:bg-slate-800 overflow-hidden">
                <div className='w-full h-full'>
                    <div className="w-full h-full sm:px-2 mb-2 md:px-6">
                        <Header />
                    </div>
                    <div className="w-full h-full px-1 msm:px-6">
                        <div className="w-full h-full flex flex-col md:flex-row">
                            <div className="w-0 lg:w-1/12" />
                            <div className="w-full md:w-5/12 h-full flex flex-col justify-center items-center msm:pl-2 p-1">
                                <img src="/assets/images/cat-1.jpg" className="w-full msm:w-11/12 h-40 msm:h-96 my-6 rounded drop-shadow-lg" />
                                <ul className="w-full h-full flex flex-row justify-center items-center my-4 msm:my-6">
                                    <li className="w-18 h-12 msm:h-18 mx-1 border rounded flex justify-center items-center">
                                        <img src="/assets/images/cat-1.jpg" className="w-16 h-10 msm:h-16 rounded-sm" />
                                    </li>
                                    <li className="w-18 h-12 msm:h-18 mx-1 border p-1 rounded flex justify-center items-center">
                                        <img src="/assets/images/cat-1.jpg" className="w-16 h-10 msm:h-16 rounded-sm" />
                                    </li>
                                    <li className="w-18 h-12 msm:h-18 mx-1 border p-1 rounded flex justify-center items-center">
                                        <img src="/assets/images/cat-1.jpg" className="w-16 h-10 msm:h-16 rounded-sm" />
                                    </li>
                                    {/*                                     <li className="w-18 h-18 mx-1 border p-1 rounded flex justify-center items-center">
                                        <img src="/assets/images/cat-1.jpg" className="w-16 h-16 rounded-sm" />
                                    </li> */}
                                    <li className="w-18 h-12 msm:h-18 mx-1 border p-1 rounded flex justify-center items-center relative cursor-pointer">
                                        <img src="/assets/images/cat-1.jpg" className="w-16 h-10 msm:h-16 rounded-sm opacity-20" />
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute">
                                            <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                                        </svg>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-1/12 h-auto" />
                            <div className="w-full md:w-5/12 lg:w-4/12 h-full sm:px-2">
                                <div className="w-full h-auto flex flex-col pt-4 overflow-auto">
                                    <Breadcrumb items={['کالای خواب', 'روتختی', 'ژاکارد']} />
                                    <h1 className="text-base md:text-lg pt-3 text-gray-800 dark:text-gray-300">روتختی طرح خرزهره</h1>
                                    <div className="w-full h-20 mt-6">
                                        <p className="text-sm md:text-base text-medium text-gray-900 dark:text-gray-300">ویژگی&zwnj;ها</p>
                                        <ul className="mt-1">
                                            <li className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-gray-400">
                                                    <path fillRule="evenodd" d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm md:text-base text-gray-700 dark:text-gray-400 pl-2">جنس:</span>
                                                <span className="text-sm md:text-base text-gray-800 dark:text-gray-300 text-medium">پنبه</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-gray-400">
                                                    <path fillRule="evenodd" d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm md:text-base text-gray-700 dark:text-gray-400 pl-2">تعداد:</span>
                                                <span className="text-sm md:text-base text-gray-800 dark:text-gray-300 text-medium">دو نفره</span>
                                            </li>
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
                                        <FiveStar rate={4.2} />
                                        <span className="inline-block px-1 text-medium text-gray-900 dark:text-gray-300">4.2</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-400">(12)</span>
                                    </div>
                                </div>
                                <div className="w-full h-24 flex flex-col">
                                    <div className="w-full h-20 mt-6 md:mt-2 flex flex-col">
                                        <p className="text-sm md:text-base text-medium text-gray-800 dark:text-gray-300">رنگ:
                                            <span className="px-2 text-medium text-gray-800 dark:text-gray-300">ارغوانی</span>
                                        </p>
                                        <div className="w-full md:w-2/5 h-10 my-2 flex justify-around sm:justify-evenly md:justify-start">
                                            <button ref={el => { colorsRef.current.push(el); }} onClick={chooseColor} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full outline-none border-2 border-white bg-violet-800 ml-2 relative p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white absolute left-0 right-0 top-0 bottom-0 m-auto">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button ref={el => { colorsRef.current.push(el); }} onClick={chooseColor} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full outline-none border-2 border-white bg-yellow-500 ml-2 relative p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hidden w-5 h-5 md:w-6 md:h-6 text-white absolute left-0 right-0 top-0 bottom-0 m-auto">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button ref={el => { colorsRef.current.push(el); }} onClick={chooseColor} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full outline-none border-2 border-white bg-gray-600 ml-2 relative p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hidden w-5 h-5 md:w-6 md:h-6 text-white absolute left-0 right-0 top-0 bottom-0 m-auto">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </button>
                                        </div>
                                        <span className="inline-block w-full h-1 border-b border-slate-400 pt-1" />
                                    </div>
                                </div>
                                <div className="w-full flex justify-between md:px-1 md:mx-1">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-1 text-gray-800 dark:text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                        </svg>
                                        <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-300 text-medium">قیمت</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex justify-end items-center">
                                            <span className="text-xs md:text-sm text-medium text-gray-500 dark:text-gray-400 line-through">589,000</span>
                                            <div className="w-8 h-6 bg-white rounded mr-1 md:mr-3 flex justify-center items-center">
                                                <span className="text-sm md:text-base text-red-600 text-medium">15%</span>
                                            </div>
                                        </div>
                                        <span className="text-base md:text-xl text-bold text-gray-800 dark:text-gray-300 text-left pl-2">520,000</span>
                                    </div>
                                </div>
                                <div className="w-full h-24 pt-2">
                                    <div className="w-full h-full flex flex-col justify-center items-center">
                                        <button onClick={addToCard} type="button" className="w-full md:w-56 h-10 flex flex-row justify-around items-center mx-auto backdrop-blur-2xl outline-none bg-primary dark:bg-primary/75 border dark:border-slate-600 rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white hover:text-primary dark:text-gray-300 text-semi-small font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-56 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-white before:-z-10 md:hover:border-primary md:hover:text-primary dark:hover:before:bg-slate-800/10">
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
                                    <span className="text-xs msm:text-sm text-gray-900 dark:text-gray-300 px-1 text-justify">
                                        بازگردانی محصول در صورتی پذیرفته می&zwnj;شود که محصول و کاور آن شامل پارگی، لکه و تغییرات ظاهری نباشد.
                                    </span>
                                </p>
                            </div>
                            <div className="w-0 md:w-1/12" />
                        </div>
                    </div>
                    <div className="w-full h-72 border-b">
                        <p className="pr-3 pb-2 font-medium border-b">محصولات مشابه</p>
                        <ul className="w-full h-auto flex flex-row relative">
                            <div className="w-8 h-8 absolute right-0 top-0 bottom-8 my-auto border bg-primary border-primary rounded-full flex justify-center items-center">
                                <span className="inline-block w-3 h-3 border-r-2 border-t-2 border-white mr-1 rounded-sm rotate-45" />
                            </div>
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
                            <div className="w-8 h-8 absolute left-0 top-0 bottom-8 my-auto border bg-primary border-primary rounded-full flex justify-center items-center">
                                <span className="inline-block w-3 h-3 border-l-2 border-b-2 border-white ml-1 rounded-sm rotate-45" />
                            </div>
                        </ul>
                    </div>
                    <div className="w-full h-full px-1 sm:px-4 mt-12">
                        <ul className="w-full h-12 flex justify-start overflow-auto msm:overflow-hidden leading-4 top-0 sticky backdrop-blur rounded bg-slate-50/75 dark:bg-slate-700/30 my-2 pt-3">
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
                        <div ref={sectionsRef}>
                            <section style={{ maxHeight: 320, transitionProperty: 'max-height', transition: 'ease-out', transitionDuration: '0.5s' }} className="w-full rounded bg-slate-50/50 dark:bg-slate-700/30 p-2 pr-4">
                                <h4 className="w-full h-8 msm:h-10 text-start text-sm msm:text-base font-semibold text-gray-800 dark:text-gray-300 border-b-2 mb-1 msm:mb-2 border-slate-300">توضیحات</h4>
                                <p className="text-xs msm:text-sm sm:text-base leading-8 msm:leading-9 text-justify line-clamp-5 text-gray-900 dark:text-gray-300">
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                </p>
                                <button className="h-8 sm:h-10 text-xs msm:text-sm font-medium border rounded text-primary mt-4 px-2 outline-none" onClick={showMore}>
                                    {showMoreIsEnable ? 'نمایش توضیحات کمتر' : 'نمایش توضیحات بیشتر'}
                                </button>
                            </section>
                            <section className="w-full h-auto bg-slate-50/50 dark:bg-slate-700/50 p-2 pr-4 mt-8">
                                <h4 className="w-full h-8 msm:h-10 text-start text-sm msm:text-base border-b-2 font-semibold text-gray-800 dark:text-gray-300">مشخصات محصول</h4>
                                <div className="w-full h-full flex flex-row mt-3 border-slate-300">
                                    <table className="w-2/5 md:w-1/5 h-full flex flex-col justify-start">
                                        <thead className="flex flex-col">
                                            <tr className="px-2 bg-slate-50/50 dark:bg-transparent py-4 border-b">
                                                <td className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-300">نام</td>
                                            </tr>
                                            <tr className="px-2 bg-slate-50/50 dark:bg-transparent py-4 border-b">
                                                <td className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-300">مدل</td>
                                            </tr>
                                            <tr className="px-2 bg-slate-50/50 dark:bg-transparent py-4 border-b">
                                                <td className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-300">جنس</td>
                                            </tr>
                                            <tr className="px-2 bg-slate-50/50 dark:bg-transparent py-4 border-b">
                                                <td className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-300">ابعاد</td>
                                            </tr>
                                            <tr className="px-2 bg-slate-50/50 dark:bg-transparent py-4">
                                                <td className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-300">اقلام همراه</td>
                                            </tr>
                                        </thead>
                                    </table>
                                    <table className="w-3/5 md:w-1/3 h-full flex flex-col justify-start">
                                        <tbody className="flex flex-col">
                                            <tr className="bg-slate-50/50 dark:bg-transparent py-4 border-b">
                                                <td className="text-sm msm:text-base text-gray-900 dark:text-gray-300">روتختی طرح خرزهره</td>
                                            </tr>
                                            <tr className="bg-slate-50/50 dark:bg-transparent py-4 border-b">
                                                <td className="text-sm msm:text-base text-gray-900 dark:text-gray-300">ژاکارد</td>
                                            </tr>
                                            <tr className="bg-slate-50/50 dark:bg-transparent py-4 border-b">
                                                <td className="text-sm msm:text-base text-gray-900 dark:text-gray-300">پنبه</td>
                                            </tr>
                                            <tr className="bg-slate-50/50 dark:bg-transparent py-4 border-b">
                                                <td className="flex flex-row items-center text-gray-900 dark:text-gray-300">
                                                    <span className="text-sm msm:text-base">160</span>
                                                    <span className="px-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </span>
                                                    <span className="text-sm msm:text-base">190</span>
                                                    <span className="text-sm px-2">سانتی&zwnj;متر</span>
                                                </td>
                                            </tr>
                                            <tr className="bg-slate-50/50 dark:bg-transparent py-4">
                                                <td className="text-sm msm:text-base text-gray-900 dark:text-gray-300">کاور روتختی</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                            <section className="w-full h-auto bg-slate-50/50 dark:bg-slate-700/30 p-2 pr-4 mt-8">
                                <h4 className="w-full h-8 msm:h-10 text-start text-sm msm:text-base font-semibold text-gray-800 dark:text-gray-300 border-b-2 border-slate-300 mb-2">نظرات</h4>
                                <div className="w-full h-auto border border-slate-300 p-1 rounded">
                                    <div className="w-full md:w-5/12 flex flex-col msm:flex-row justify-start items-center my-2">
                                        <div className="w-full msm:w-1/2 flex flex-row">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 msm:w-14 h-8 text-gray-800 dark:text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div className="w-40 flex flex-col mx-2">
                                                <span className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-400">مایکل اشنایدر</span>
                                                <span className="text-xs msm:text-sm text-gray-600 dark:text-gray-400">دیروز</span>
                                            </div>
                                        </div>
                                        <div className="w-full msm:w-1/2 mt-6 msm:mt-0 flex justify-center msm:justify-end items-center">
                                            <div className="w-10 msm:ml-3 flex flex-col msm:flex-row justify-between items-center">
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-400">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                                    </svg>
                                                </button>
                                                <span className="text-sm msm:text-base text-gray-800 dark:text-gray-400">12</span>
                                            </div>
                                            <div className="w-10 mr-3 flex flex-col-reverse msm:flex-row justify-between items-center">
                                                <span className="text-sm msm:text-base text-gray-800 dark:text-gray-400">2</span>
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-400">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full h-auto bg-slate-50/60 dark:bg-transparent">
                                        <p className="text-sm msm:text-base text-justify p-2 dark:text-gray-300">
                                            شعر چیست؟ شعر چیزی است که من مینویسم. لطفا به این شعر توجه نکنید. با تشکر، مدیریت
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section className="w-full h-auto bg-slate-50/30 dark:bg-slate-700/30 p-2 pr-4 mt-8">
                                <h4 className="w-full h-8 msm:h-10 text-start text-sm msm:text-base font-semibold text-gray-800 dark:text-gray-300 border-b-2 border-slate-300 mb-2">پرسش&zwnj;ها</h4>
                                <div ref={el => { commentsRef.current.push(el); }} className="w-full h-auto border-r border-t border-slate-300 p-1 rounded-tr">
                                    <div className="w-full md:w-2/5 flex flex-row justify-start items-center my-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-800 dark:text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div className="w-full msm:w-40 flex flex-col mx-2">
                                            <span className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-400">فرزاد ترک خورده</span>
                                            <span className="text-xs msm:text-sm text-gray-600 dark:text-gray-400">دو هفته پیش</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-auto bg-slate-50/60 dark:bg-transparent">
                                        <p className="text-sm msm:text-base text-justify p-2 dark:text-gray-300">
                                            روتختی دونفره است؟
                                        </p>
                                    </div>
                                    <button onClick={handleReply} className="w-24 text-medium text-primary m-2 flex justify-around cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                        <span className="text-sm">پاسخ دادن</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                    </button>
                                </div>
                                <div ref={el => { commentsRef.current.push(el); }} className="w-11/12 h-auto mr-4 md:mr-12 mt-1 border-r border-b border-slate-300 p-1 rounded-br">
                                    <div className="w-full md:w-2/5 flex flex-row justify-start items-center my-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-800 dark:text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div className="w-full msm:w-40 flex flex-col mx-2">
                                            <span className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-400">فرزاد ترک خورده</span>
                                            <span className="text-xs msm:text-sm text-gray-600 dark:text-gray-400">دو هفته پیش</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-auto bg-slate-100/30 dark:bg-transparent">
                                        <p className="text-sm msm:text-base text-justify p-2 dark:text-gray-300">
                                            روتختی دونفره است؟
                                        </p>
                                    </div>
                                    <button onClick={handleReply} className="w-24 text-sm text-medium text-primary m-2 flex justify-around cursor-pointer">
                                        <span>پاسخ دادن</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                    </button>
                                </div>
                                <div style={{ maxHeight: 0, transitionProperty: 'max-height', transition: 'ease-out', transitionDuration: '0.4s' }} ref={replyCommentRef} className="w-11/12 mr-4 invisible md:mr-11 mt-1 border-r border-b border-slate-300 p-1 rounded-br">
                                    <div className="w-full md:w-2/5 flex flex-row justify-start items-center my-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-800 dark:text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div className="w-11/12 msm:w-40 flex flex-col mx-2">
                                            <span className="text-sm msm:text-base font-medium text-gray-800 dark:text-gray-400">فرزاد ترک خورده</span>
                                            <span className="text-xs msm:text-sm hidden text-gray-600 dark:text-gray-400">دو هفته پیش</span>
                                        </div>
                                        <div className="w-20 msm:w-24 h-8 msm:h-10">
                                            <Tooltip text={'لغو پاسخ'}>
                                                <span className="w-full h-10 flex justify-center" onClick={cancelReply}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </span>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="w-full h-auto mx-1 flex flex-col justify-around items-end">
                                        <textarea rows={4} maxLength={1000} className="w-full p-2 border bg-white text-sm msm:text-base dark:bg-transparent border-slate-300 rounded-sm outline-none dark:text-gray-300" />
                                        <button className="w-20 msm:w-24 h-8 msm:h-10 rounded my-2 p-1 bg-primary flex justify-around items-center text-white">
                                            <span className="text-sm msm:text-base">ارسال</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 msm:w-6 h-5 msm:h-6 rotate-180">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full px-2 md:px-8 pb-2">
                <Footer />
            </div>
        </Layout>
    );
}

export default Product;