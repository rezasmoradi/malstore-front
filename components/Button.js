import React from "react";

const Button = React.forwardRef(({ title = '', disabled = false, onClick }, ref) => {

    const handleClick = e => {
        if (typeof onClick === 'function') onClick(e);
    }

    return (
        <button disabled={disabled} ref={ref} onClick={handleClick} className="w-10/12 msm:w-auto msm:min-w-[8rem] h-10 mt-8 mx-auto backdrop-blur-2xl outline-none bg-primary border dark:border-slate-600 rounded py-1 px-4 text-gray-100 text-semi-small font-medium">
            {title}
        </button>
    );
});

export default Button;