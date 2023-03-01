import React, { useEffect, useRef } from "react";

const TextField = React.forwardRef((props, ref) => {

    const inputRef = useRef();

    useEffect(() => {
        if (props.value === undefined || props.value === null || props.value === '') {
            inputRef.current.firstChild.innerHTML = '';
        } else {
            inputRef.current.firstChild.innerHTML = props.label;
        }
    }, [inputRef.current]);

    useEffect(() => {
        if (props.value !== '' && props.type !== 'file') {
            inputRef.current.children[1].classList.remove('msm:flex');
            inputRef.current.children[1].classList.add('hidden');
        }

        if (inputRef.current.children[2].firstChild.placeholder !== props.label) {
            inputRef.current.children[2].firstChild.classList.remove('placeholder:text-right')
            inputRef.current.children[2].firstChild.classList.add('placeholder:text-left')
            inputRef.current.children[2].firstChild.classList.add('ltr')
        } else {
            inputRef.current.children[2].firstChild.classList.remove('placeholder:text-left')
            inputRef.current.children[2].firstChild.classList.remove('rtl')
            inputRef.current.children[2].firstChild.classList.add('placeholder:text-right')
        }
    }, [props.value]);

    const changeInput = e => {
        if (props.type === 'file') {
            inputRef.current.children[2].children[1].classList.remove('opacity-0');
            inputRef.current.children[2].children[1].src = URL.createObjectURL(e.currentTarget.files[0]);
            inputRef.current.children[2].children[2].innerHTML = e.currentTarget.value.split(/[\/|\\]/).pop();
            inputRef.current.children[1].firstChild.classList.add('hidden');
        }

        if (typeof props.onChange === 'function') props.onChange(e);
    };

    useEffect(() => {
        if (props.invalid) {
            ['border-red-500', 'animate-fade'].map(cls => { inputRef.current.classList.add(cls) })
        } else {
            ['border-red-500', 'animate-fade'].map(cls => { inputRef.current.classList.remove(cls) })
        }
    }, [props.invalid]);

    return (
        <div className={`w-full h-16 my-1 flex relative ${props.className}`}>
            <fieldset ref={inputRef} className={`w-full relative border rounded bg-slate-50 dark:bg-slate-700 disabled:border-slate-100 disabled:bg-white disabled:dark:bg-slate-800 disabled:dark:border-slate-700`}>
                <legend className="text-xs h-4 font-medium transition-all text-gray-700 dark:text-gray-300" />
                <label htmlFor={props.id} className={`hidden w-full relative font-medium mr-3 text-sm text-gray-600 dark:text-gray-300 msm:flex`}>
                    {props.type === 'file' && <span className={`absolute right-4 top-2.5 text-right pr-4 pt-0.5`}>
                        {props.label}
                    </span>}
                    <span className="absolute left-4 top-2.5 z-20">
                        {props.icon}
                    </span>
                    {/* {(value || type === 'file') && label} */}
                </label>
                <div className="w-full h-10 relative flex">
                    <input
                        type={props.type ? props.type : "text"}
                        ref={ref}
                        autoComplete="off"
                        id={props.id}
                        onChange={changeInput}
                        readOnly={props.readOnly || false}
                        disabled={props.disabled || false}
                        multiple={props.multiline}
                        placeholder={props.label}
                        value={props.value || ''}
                        className={`w-full h-10 ${props.type === 'file' && 'opacity-0'} placeholder:text-right placeholder:text-sm placeholder:text-gray-600 dark:placeholder:text-gray-400 text-sm sm:text-base select-none px-3 py-1 outline-none text-gray-900 dark:text-gray-300 font-medium bg-slate-100/10 dark:bg-slate-700 rounded ${props.type === 'password' && 'rtl'} disabled:opacity-60 disabled:cursor-not-allowed ${props.value && props.value !== '' && typeof props.value !== 'number' && props.value.charCodeAt(0) <= 126 && 'ltr'}`}
                        onFocus={(e) => {
                            e.currentTarget.placeholder = props.placeholder ? props.placeholder : '';
                            inputRef.current.children[2].firstChild.classList.remove('placeholder:text-gray-600')
                            inputRef.current.children[2].firstChild.classList.add('placeholder:text-gray-400')
                            inputRef.current.children[2].firstChild.classList.remove('placeholder:text-right')
                            inputRef.current.children[2].firstChild.classList.add('placeholder:text-left')
                            inputRef.current.children[1].classList.remove('msm:flex');
                            // inputRef.current.children[1].classList.add('hidden');
                            inputRef.current.classList.add('border-primary');
                            inputRef.current.classList.add('dark:border-primary');
                            inputRef.current.firstChild.innerHTML = props.label ? props.label : '';
                            ['pl-1', 'pr-2'].map(cls => { !props.value && inputRef.current.firstChild.classList.add(cls) });
                            inputRef.current.firstChild.classList.add('animate-[textInput_0.3s_ease-in-out]');
                        }}
                        onBlur={(e) => {
                            inputRef.current.classList.remove('border-primary');
                            inputRef.current.classList.remove('dark:border-primary');
                            if (e.currentTarget.value === '') {
                                e.currentTarget.placeholder = props.label
                                e.currentTarget.classList.remove('placeholder:text-slate-400')
                                e.currentTarget.classList.add('placeholder:text-slate-600')
                                e.currentTarget.classList.remove('placeholder:text-left')
                                e.currentTarget.classList.add('placeholder:text-right')

                                // inputRef.current.children[1].classList.remove('hidden');
                                inputRef.current.children[1].classList.add('msm:flex');
                                inputRef.current.firstChild.innerHTML = '';
                                inputRef.current.children[1].classList.add('animate-[textInputReverse_0.3s_ease-in-out]');
                                ['pl-1', 'pr-2'].map(cls => { inputRef.current.firstChild.classList.remove(cls) });
                            }
                            if (props.onBlur && typeof props.onBlur === 'function') {
                                onBlur();
                            }
                        }}
                    />

                    {props.type === 'file' && <>
                        <img className="w-10 h-10 opacity-0 absolute left-2 top-0" />
                        <p className="max-w-full opacity-0 absolute top-2.5 left-20 font-medium text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap ltr" />
                    </>}

                    {props.type === 'number' && <div className="absolute left-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-800 dark:text-gray-300 cursor-pointer" onClick={() => { typeof props.onChange === 'function' && props.onChange(props.value + 1) }}>
                            <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-800 dark:text-gray-300 cursor-pointer" onClick={() => { typeof props.onChange === 'function' && props.onChange(props.value - 1) }}>
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>}
                </div>
                {props.required && <div className="float-left py-0.5">
                    <span className="text-xs text-red-600">اجباری</span>
                </div>}
                {props.invalid && <div className="float-right py-0.5">
                    <span className="text-xs text-red-600">
                        {props.label} وارد شده نامعتبر است
                    </span>
                </div>}
            </fieldset>
            {props.children}
        </div>
    );
});

export default TextField;