import React, { useRef, useState } from "react";

function TableContainer({ className, children }) {
    return (
        <div className={`w-full max-h-[calc(100vh_-_13rem)] overflow-auto ${className}`}>
            {children}
        </div>
    );
}

function Table({ className, children }) {
    return (
        <table className={`w-full border-collapse ${className}`}>
            {children}
        </table>
    );
}

function TableHead({ className, children }) {
    return (<thead className={className}>{children}</thead>);
}

function TableBody({ className, children }) {
    return (<tbody className={`overflow-auto ${className}`}>{children}</tbody>);
}

function TableRow({ className, children, onClick }) {
    return (
        <tr className={className} onClick={onClick}>
            {children}
        </tr>
    );
}

function TableCell({ component = 'td', style, className, children, comparable = true }) {
    return component === 'td'
        ? (<td style={style} className={`text-gray-800 dark:text-gray-300 px-2 py-2 whitespace-nowrap ${className}`}>{children}</td>)
        : (<th className={`w-auto h-auto sticky top-0 text-gray-800 dark:text-gray-300 bg-white/75 dark:bg-slate-700/80 dark:backdrop-blur-0 p-1 whitespace-nowrap cursor-pointer ${className}`}>
            {comparable && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block text-primary" onClick={e => { console.log(e.target); }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                </svg>)}
            {children}
        </th>);
}

function TablePagination({ rows, defaultRowsPerPage = 10, rowsPerPage = [10, 20, 50] }) {

    const [length] = useState(rows)
    const [pagination, setPagination] = useState(defaultRowsPerPage);
    const paginationRef = useRef();

    const showPageList = e => {
        ['-bottom-96', 'bottom-12', 'animate-slideTopSelect', 'animate-slideDownSelect', 'opacity-0'].map(cls => {
            paginationRef.current.firstChild.classList.toggle(cls);
        });
        paginationRef.current.focus();
    };

    return (
        <div className="w-full lg:w-11/12 mx-auto h-12 relative">
            <div className="w-full h-full mx-auto flex justify-end lg:justify-center items-center">
                <span className="mx-1 sm:mx-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                        <path fillRule="evenodd" d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                </span>
                <span className="mx-1 sm:mx-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                </span>
                <span className="inline-block min-w-[36px] w-9 h-9 leading-9 cursor-pointer bg-primary text-gray-800 dark:text-gray-100 text-center text-base border border-primary rounded-full mx-1.5 sm:mx-3">1</span>
                <span className="hidden msm:inline-block min-w-[36px] w-9 h-9 leading-9 cursor-pointer hover:bg-primary/50 text-gray-800 dark:text-gray-100 text-center text-base border border-primary rounded-full mx-1.5 sm:mx-3">2</span>
                <span className="hidden msm:inline-block w-9 h-9 leading-9 cursor-pointer hover:bg-primary/50 text-gray-800 dark:text-gray-100 text-center text-base border border-primary rounded-full mx-1.5 sm:mx-3">3</span>
                <span className="hidden md:inline-block w-9 h-9 leading-9 cursor-pointer hover:bg-primary/50 text-gray-800 dark:text-gray-100 text-center text-base border border-primary rounded-full mx-3">4</span>
                <span className="hidden md:inline-block w-9 h-9 leading-9 cursor-pointer hover:bg-primary/50 text-gray-800 dark:text-gray-100 text-center text-base border border-primary rounded-full mx-3">5</span>
                <span className="hidden sm:inline-block w-6 h-9 leading-9 text-gray-800 dark:text-gray-100 text-center mx-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-9">
                        <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                    </svg>
                </span>
                <span className="hidden sm:inline-block w-9 h-9 leading-9 cursor-pointer hover:bg-primary/50 text-gray-800 dark:text-gray-100 text-center text-base border border-primary rounded-full mx-3">20</span>
                <span className="mx-1 sm:mx-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                </span>
                <span className="mx-1 sm:mx-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                        <path fillRule="evenodd" d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className="w-14 sm:w-16 h-auto absolute bottom-0 right-2 lg:right-12">
                <div ref={paginationRef} className="w-full h-full relative" onBlur={e => { if (paginationRef.current.firstChild.classList.contains('bottom-12')) showPageList(e); }}>
                    <div tabIndex={1} className="w-full h-[132px] z-50 transition-all opacity-0 animate-slideDownSelect backdrop-blur shadow-lg dark:shadow dark:shadow-gray-300 bg-slate-50 dark:bg-slate-600 rounded absolute -bottom-96">
                        <ul className="w-full h-auto">
                            <li className="w-full h-11 text-center text-gray-800 dark:text-gray-300 cursor-pointer leading-[2.75rem] border-b border-primary" onClick={() => { setPagination(10); }}>10</li>
                            <li className="w-full h-11 text-center text-gray-800 dark:text-gray-300 cursor-pointer leading-[2.75rem] border-b border-primary" onClick={() => { setPagination(20); }}>20</li>
                            <li className="w-full h-11 text-center text-gray-800 dark:text-gray-300 cursor-pointer leading-[2.75rem]" onClick={() => { setPagination(50); }}>50</li>
                        </ul>
                    </div>
                    <div tabIndex={0} className="w-full h-10 bg-slate-50 dark:bg-slate-600 z-10 border focus:border-primary outline-none absolute bottom-1 right-0 flex justify-center items-center cursor-pointer rounded" onClick={showPageList}>
                        <span className="inline-block ml-2 text-base sm:text-lg font-medium  text-gray-800 dark:text-gray-300">{pagination}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 sm:w-6 h-5 sm:h-6 absolute left-0 text-gray-800 dark:text-gray-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination };