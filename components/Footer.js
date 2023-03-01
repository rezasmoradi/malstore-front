import React from 'react';

function Footer() {
    return (
        <footer className='w-full h-auto mx-auto mt-4 bg-transparent dark:bg-slate-800 border-t-2 border-primary flex flex-col'>
            <div className='flex flex-col md:flex-row justify-around items-baseline mt-4'>
                <div className='w-full md:w-1/4 h-44 md:h-48 flex flex-col justify-center items-center mb-8 md:mb-0'>
                    <p className='text-medium my-2 dark:text-gray-300'>با ما</p>
                    <ul className='w-full h-40 flex justify-center items-center'>
                        <li className="w-10 h-10 rounded-full bg-primary/10 flex justify-center items-center mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' className='w-10 h-10 text-violet-600 dark:text-violet-300' viewBox="0 0 50 50">
                                <path d="M 25 8 C 15.611 8 8 15.611 8 25 C 8 28.127 8.8590313 31.047453 10.332031 33.564453 L 8.1464844 41.722656 L 16.683594 39.818359 C 19.143594 41.201359 21.977 42 25 42 C 34.389 42 42 34.389 42 25 C 42 15.611 34.389 8 25 8 z M 25 9 C 33.802 9 41 16.198 41 25 C 41 33.802 33.802 41 25 41 C 22.003 41 19.240703 40.197766 16.845703 38.759766 L 9.5449219 40.382812 L 11.40625 33.421875 C 9.87125 30.971875 9 28.105 9 25 C 9 16.198 16.198 9 25 9 z M 18.800781 16.548828 C 18.498781 16.548828 18.013609 16.659375 17.599609 17.109375 C 17.192609 17.559375 16.033203 18.641516 16.033203 20.853516 C 16.033203 23.057516 17.636328 25.194281 17.861328 25.488281 C 18.086328 25.790281 20.964297 30.467625 25.529297 32.265625 C 29.313297 33.755625 30.087016 33.459812 30.916016 33.382812 C 31.737016 33.311813 33.570359 32.299906 33.943359 31.253906 C 34.316359 30.206906 34.316172 29.307187 34.201172 29.117188 C 34.087172 28.935187 33.79375 28.824609 33.34375 28.599609 C 32.89375 28.374609 30.687438 27.286672 30.273438 27.138672 C 29.865438 26.990672 29.563531 26.913281 29.269531 27.363281 C 28.967531 27.813281 28.112703 28.825141 27.845703 29.119141 C 27.586703 29.421141 27.326953 29.455469 26.876953 29.230469 C 26.426953 29.005469 24.978625 28.534906 23.265625 27.003906 C 21.932625 25.816906 21.033437 24.348391 20.773438 23.900391 C 20.513437 23.452391 20.745703 23.205469 20.970703 22.980469 C 21.174703 22.784469 21.419531 22.461172 21.644531 22.201172 C 21.861531 21.934172 21.939891 21.751219 22.087891 21.449219 C 22.242891 21.155219 22.164734 20.889063 22.052734 20.664062 C 21.940734 20.439062 21.069922 18.220938 20.669922 17.335938 C 20.333922 16.591938 19.981203 16.5705 19.658203 16.5625 C 19.396203 16.5485 19.094781 16.548828 18.800781 16.548828 z"/>
                            </svg>
                        </li>
                        <li className="w-10 h-10 rounded-full bg-primary/10 flex justify-center items-center mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' className='w-10 h-10 text-violet-600 dark:text-violet-300' viewBox="0 0 50 50">
                                <path d="M 25 8 C 15.611 8 8 15.611 8 25 C 8 34.389 15.611 42 25 42 C 34.389 42 42 34.389 42 25 C 42 15.611 34.389 8 25 8 z M 25 9 C 33.837 9 41 16.163 41 25 C 41 33.837 33.837 41 25 41 C 16.163 41 9 33.837 9 25 C 9 16.163 16.163 9 25 9 z M 31.986328 18.306641 C 31.593984 18.261266 31.102031 18.367656 30.550781 18.566406 C 29.543781 18.929406 16.672687 24.394938 15.929688 24.710938 C 15.224688 25.010938 14.557641 25.337547 14.556641 25.810547 C 14.556641 26.142547 14.754828 26.329438 15.298828 26.523438 C 15.864828 26.725437 17.290813 27.158625 18.132812 27.390625 C 18.943813 27.614625 19.867766 27.418656 20.384766 27.097656 C 20.932766 26.756656 27.262797 22.521391 27.716797 22.150391 C 28.170797 21.779391 28.531156 22.255953 28.160156 22.626953 C 27.788156 22.998953 23.444094 27.214828 22.871094 27.798828 C 22.175094 28.507828 22.669719 29.243109 23.136719 29.537109 C 23.669719 29.873109 27.502078 32.442469 28.080078 32.855469 C 28.658078 33.267469 29.243297 33.455078 29.779297 33.455078 C 30.315297 33.455078 30.596281 32.748688 30.863281 31.929688 C 31.176281 30.970687 32.642266 21.407438 32.822266 19.523438 C 32.876266 18.953437 32.69675 18.573297 32.34375 18.404297 C 32.237 18.353047 32.117109 18.321766 31.986328 18.306641 z" />
                            </svg>
                        </li>
                        <li className="w-10 h-10 rounded-full bg-primary/10 flex justify-center items-center mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' className='w-10 h-10 text-violet-600 dark:text-violet-300' viewBox="0 0 50 50">
                                <path d="M 24.849609 10 C 11.077609 10 10 11.077609 10 24.849609 L 10 25.150391 C 10 38.922391 11.077609 40 24.849609 40 L 25.150391 40 C 38.922391 40 40 38.922391 40 25.150391 L 40 24.849609 C 40 11.077609 38.922391 10 25.150391 10 L 24.849609 10 z M 23.751953 11 L 26.248047 11 C 38.074047 11 39 11.925953 39 23.751953 L 39 26.248047 C 39 38.074047 38.074047 39 26.248047 39 L 23.751953 39 C 11.925953 39 11 38.074047 11 26.248047 L 11 23.751953 C 11 11.925953 11.925953 11 23.751953 11 z M 33.496094 15 C 32.668094 15.002 31.998 15.674906 32 16.503906 C 32.002 17.331906 32.674906 18.002 33.503906 18 C 34.331906 17.998 35.002 17.325094 35 16.496094 C 34.998 15.668094 34.325094 14.998 33.496094 15 z M 24.980469 17 C 20.562469 17.011 16.989 20.601531 17 25.019531 C 17.01 29.437531 20.601531 33.011 25.019531 33 C 29.437531 32.99 33.011 29.398469 33 24.980469 C 32.99 20.562469 29.398469 16.989 24.980469 17 z M 24.982422 18 C 28.848422 17.991 31.991 21.116422 32 24.982422 C 32.009 28.848422 28.883578 31.991 25.017578 32 C 21.151578 32.009 18.009 28.883578 18 25.017578 C 17.991 21.151578 21.116422 18.009 24.982422 18 z" />
                            </svg>
                        </li>
                    </ul>
                    <div className='w-full flex justify-center items-center'>
                        <span className='w-10 h-10 bg-primary/10 rounded-full flex justify-center items-center mx-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                        </span>
                        <span className='font-medium text-gray-900 text-sm dark:text-gray-300'>ایلام - خیابان پاسداران - روبروی قلعه والی</span>
                    </div>
                </div>
                <div className='w-full md:w-1/4 h-44 md:h-48 flex flex-col justify-center items-center mb-8 md:mb-0'>
                    <p className='text-medium my-2 dark:text-gray-300'>خدمات مشتری</p>
                    <ul className='w-full h-60 flex flex-col justify-center items-center'>
                        <li className='text-semi-small text-medium my-4 dark:text-gray-300'>
                            بازگردانی کالا
                        </li>
                        <li className='text-semi-small text-medium my-4 dark:text-gray-300'>
                            حریم خصوصی
                        </li>
                        <li className='text-semi-small text-medium my-4 dark:text-gray-300'>
                            انتقادات و پیشنهادات
                        </li>
                    </ul>
                </div>
                <div className='w-full md:w-1/4 h-44 md:h-48 flex flex-col justify-center items-center mb-8 md:mb-0'>
                    <p className='text-medium my-2 dark:text-gray-300'>راهنمای خرید</p>
                    <ul className='w-full h-40 flex flex-col justify-center items-center'>
                        <li className='text-semi-small text-medium my-4 dark:text-gray-300'>
                            ثبت سفارش
                        </li>
                        <li className='text-semi-small text-medium my-4 dark:text-gray-300'>
                            پیگیری سفارش
                        </li>
                    </ul>
                </div>
            </div>
            <div className='md:mt-8'>
                <p className='text-medium text-semi-small text-center dark:text-gray-300 flex justify-center items-center'>
                    <span className='text-gray-900 dark:text-gray-300 md:px-2 text-lg'>&#169;</span>
                    تمامی حقوق این وب سایت متعلق به فروشگاه مال&zwnj;استور است.
                </p>
            </div>
        </footer>
    );
}

export default Footer;