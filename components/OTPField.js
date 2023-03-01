import React, { useEffect, useRef, useState } from "react";

function OTPField({ inputNumber, onComplete, disabled = false, value = null, getCurrentValue = null }) {

    let otp = [];
    let currentValue = [];
    const [val, setVal] = useState([]);

    const inputsRef = useRef();

    const handleOTP = e => {
        const input = e.currentTarget;
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
            let value = input.value;
            input.value = '';
            input.value = value ? value[0] : ''

            let fieldIndex = Number(input.dataset.index);

            if (e.key === 'Backspace' && fieldIndex > 0) {
                input.previousElementSibling.focus();
            }

            otp[fieldIndex] = input.value;
            if (fieldIndex === [...inputsRef.current.children].length - 1 || currentValue.length === 6) {
                submit();
            } else {
                if (input.classList.contains('border-red-600')) {
                    input.classList.remove('border-red-600');
                    input.classList.add('border-slate-400');
                }
                [...inputsRef.current.children][fieldIndex + 1].focus();
            }
        } else {
            if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(input.value)) {

                input.classList.remove('focus:border-primary/75');
                input.classList.add('focus:border-red-600');
                setTimeout(() => {
                    input.classList.remove('focus:border-red-600');
                    ['focus:border-indigo-600', 'dark:focus:border-indigo-300'].map(cls => { input.classList.add(cls); });
                }, 500);
                input.value = '';
            }
        }
        if (typeof getCurrentValue === 'function') getCurrentValue(currentValue.reduce((prev, val) => prev + val, ''));
    };

    const handlePasteOTP = e => {
        const data = e.clipboardData.getData('text');
        const value = data.split('');
        otp = value
        if (/[0-9]/.test(data) && value.length === inputNumber) {
            // [...inputsRef.current.children].forEach((input, index) => input.value = value[index]);
            setVal(value)
            submit();
        }
    };

    const handleChange = (e, index) => {
        setVal(val => [...val, e.target.value.trim()]);
    }

    const submit = () => {
        let otpValue = '';
        let otpArray = otp.filter(value => !!value);
        if (otpArray.length < 6) {
            [...inputsRef.current.children].forEach(input => {
                if (input.value === '') {
                    input.classList.remove('border-slate-400');
                    input.classList.add('border-red-600');
                }
            });
        } else {
            [...inputsRef.current.children].forEach(input => {
                otpValue += input.value;
                input.value = '';
            });
        }
        console.log(otpValue);
        onComplete(otpValue);
    };

    useEffect(() => {
        if (value) {
            currentValue = value.split('');
        }
    }, [value]);

    return (
        <div ref={inputsRef} className="w-full mx-auto flex flex-row-reverse justify-evenly items-center">
            {[...Array(inputNumber)].map((_, index) => (
                <input
                    key={index}
                    data-index={index}
                    maxLength={1}
                    disabled={disabled}
                    onKeyUp={handleOTP}
                    value={val[index] ? val[index] : ''}
                    onPaste={handlePasteOTP}
                    onChange={e => handleChange(e, index)}
                    className="w-9 h-10 text-center outline-none text-lg text-gray-900 dark:text-gray-300 border focus:border-2 disabled:border-0 focus:border-primary focus:shadow-md border-slate-400 bg-slate-50 dark:bg-slate-800 rounded disabled:bg-slate-300 disabled:dark:bg-slate-600" />
            ))}
        </div>
    );
}

export default OTPField;