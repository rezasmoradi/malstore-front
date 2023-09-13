import React from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import FiveStar from './FiveStar';

export function ProductCaption() {
    return (
        <div className="w-full h-full flex flex-col justify-between items-start pt-6">
            <div className="w-auto h-auto self-start sm:self-center px-3">
                <h5 className='w-full h-12 sm:h-10 line-clamp-3 xsm:line-clamp-2 sm:line-clamp-2 text-xs xsm:text-base sm:text-sm font-medium pb-2 text-right sm:text-center text-gray-900 dark:text-gray-300'>
                    روتختی طرح خرزهره 10 تیکه دونفره
                </h5>
            </div>
            <div className="w-full h-8 flex flex-row justify-between items-center">
                <div className="w-auto h-auto pr-3">
                    <span className="text-2xs sm:text-xs text-red-600 dark:text-red-300">تنها 1 عدد در انبار باقی مانده</span>
                </div>
                <div className="w-auto h-auto flex justify-end items-center pl-1">
                    <span className="text-xs msm:text-sm font-medium text-gray-800 dark:text-gray-300 px-0.5">4.2</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="w-full h-10 mb-1 -mr-2 flex justify-end items-center pb-1 sm:pb-3">
                <span className="font-medium text-sm msm:text-base text-gray-900 dark:text-gray-300">900,000</span>
                <span className="font-medium text-xs px-1 text-gray-900 dark:text-gray-300">تومان</span>
            </div>
        </div>
    )
}



function ProductSummary() {

    const router = useRouter();

    return (
        <div className="w-full sm:w-[19rem] md:w-80 h-48 sm:h-100 msm:my-4 overflow-x-auto border-b last:border-b-0 sm:border sm:last:border-b dark:border-slate-400 md:mx-3 xl:mx-5 sm:rounded flex flex-row sm:flex-col justify-start items-center sm:shadow-sm dark:shadow-none hover:cursor-pointer xl:hover:shadow-lg">
            <div className="w-60 sm:w-full h-auto flex flex-row justify-center relative">
                <img src={`${router.basePath}/assets/images/cat-1.jpg`} loading={"lazy"} className='w-60 sm:w-64 h-36 sm:h-64 p-1 rounded-md' />
                <div className="w-full sm:w-4 absolute h-4 sm:h-16 top-36 sm:top-4 left-0 flex flex-row sm:flex-col justify-center sm:justify-start items-start">
                    <span className="w-2 h-2 rounded-full outline-none bg-violet-800 my-1 ml-1 relative p-1" />
                    <span className="w-2 h-2 rounded-full outline-none bg-yellow-500 my-1 ml-1 relative p-1" />
                    <span className="w-2 h-2 rounded-full outline-none bg-gray-600 my-1 ml-1 relative p-1" />
                </div>
            </div>
            <ProductCaption />
        </div>
    );
}

export default ProductSummary;