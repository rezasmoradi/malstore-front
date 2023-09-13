import React from "react";

const Button = React.forwardRef(({ type = 'button', children = null, className = '', disabled = false, style = 'filled', onClick }, ref) => {

    const handleClick = e => {
        if (typeof onClick === 'function') onClick(e);
    }

    switch (style) {
        case 'none':
            return <button
                ref={ref}
                type={type}
                disabled={disabled}
                onClick={onClick}
                className={`w-full xsm:w-40 sm:w-40 h-10 mx-auto text-xs xsm:text-sm sm:text-sm whitespace-nowrap backdrop-blur-2xl outline-none py-1 px-4 font-medium md:mx-2 ${className}`}>
                {children}
            </button>
        case 'outlined':
            return <button
                ref={ref}
                type={type}
                disabled={disabled}
                onClick={onClick}
                className={`w-full xsm:w-40 sm:w-40 h-10 mx-auto text-sm xsm:text-base sm:text-sm whitespace-nowrap backdrop-blur-2xl outline-none border border-primary rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-40 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-primary before:-z-10 md:hover:border-transparent md:dark:hover:border-secondary md:hover:text-white dark:hover:before:bg-secondary ${className}`}>
                {children}
            </button>
        default:
            return <button
                ref={ref}
                type={type}
                disabled={disabled}
                onClick={onClick}
                className={`w-full xsm:w-40 sm:w-40 h-10 mx-auto text-xs xsm:text-base sm:text-sm whitespace-nowrap backdrop-blur-2xl outline-none bg-primary dark:bg-secondary border border-transparent rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white dark:text-gray-900 font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-40 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-white before:-z-10 md:hover:border-primary md:hover:text-primary dark:hover:before:bg-white ${className}`}>
                {children}
            </button>
    }

});

export default Button;