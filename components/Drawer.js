import React, { useEffect } from "react";

function Drawer({ children, size, onClick, onBlur, open = false }) {

    const width = size === 'large' ? 'w-9/12 md:w-1/6' : 'w-20';

    const drawerRef = React.useRef();

    useEffect(() => {
        if (open) drawerRef.current.focus();
    }, [drawerRef.current]);

    return (
        <aside ref={drawerRef} style={{ zIndex: 99999 }} className={`${open ? width : 'w-0'} transition-all duration-300 bg-inherit fixed sm:relative z-50 md:z-auto right-0 h-full backdrop-blur-xl`} onBlur={onBlur}>
            <button onClick={onClick} className={"absolute z-10 top-6 -left-4"}>
                {open ?
                    <span className="absolute border-r-2 border-slate-300 rounded-full -left-1 bg-white outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 pl-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </span>
                    :
                    <span className="absolute shadow shadow-slate-400 rounded-full -left-1 bg-white outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 pr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </span>
                }
            </button>
            <div
                className="shadow-md dark:shadow-sm dark:shadow-slate-50 relative"
                style={{
                    width: open ? '100%' : 0,
                    height: '100vh',
                    overflowX: 'hidden',
                    transition: '0.3s',
                }}>
                {children}
            </div>
        </aside>
    );
}

export default Drawer;