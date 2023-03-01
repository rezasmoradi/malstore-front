import React from 'react';

function Tooltip({ text, children }) {

    const showTooltip = e => {
        const elem = e.currentTarget;
        elem.firstChild.classList.remove('opacity-0');
/* 
        setTimeout(() => {
            elem.firstChild.classList.add('opacity-0');
        }, 2000); */
    };

    return (
        <div className={`w-auto h-10 relative flex justify-center cursor-pointer`} onMouseOver={showTooltip} onMouseLeave={e => { e.currentTarget.firstChild.classList.add('opacity-0'); }}>
            <span className="w-fit px-px h-6 border border-slate-300 text-gray-900 rounded leading-5 bg-white dark:bg-slate-600 dark:text-gray-200 absolute mx-auto left-0 right-0 -top-6 text-xs msm:text-sm text-center opacity-0 after:content-[''] after:absolute after:w-0 after:h-0 after:bg-transparent after:left-0 after:right-0 after:mx-auto after:top-full after:border-r-[7px] after:border-r-transparent after:border-l-[7px] after:border-l-transparent after:border-t-[7px] after:border-t-slate-50 dark:after:border-t-slate-600 after:rounded inline-block transition-all animate-fade before:content-[''] before:absolute before:right-0 before:left-0 before:mx-auto before:w-0 before:h-0 before:border-r-8 before:border-r-transparent before:border-l-8 before:border-l-transparent before:border-t-8 before:border-t-slate-300 dark:before:border-t-white before:top-full">
                {text}
            </span>
            {children}
        </div>
    );
}

export default Tooltip;