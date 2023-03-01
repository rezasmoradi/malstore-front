import React, { useRef, useState } from "react";

function RangeSliderM({ min = 0, max = 100, step = 1, threshold = 1, onChange }) {

    const sliderRef = useRef();
    const [minValue, setMin] = useState(min);
    const [maxValue, setMax] = useState(max);
    const [thresholdValue, setThreshold] = useState(threshold);

    const changeSlideMin = (e, manualValue = null) => {
        let realValue = manualValue === null ? null : manualValue.replace(/,/g, '');
        const target = e.target;
        const targetValue = realValue !== null ? Number(realValue) : Number(target.value);
        if (targetValue < maxValue + thresholdValue) {
            let value = realValue !== null ? (realValue / parseInt(max)) * 100 : (target.value / parseInt(target.max)) * 100;
            var children = sliderRef.current.firstChild.childNodes;
            children[0].style.width = value + '%';
            children[2].style.left = value + '%';
            children[4].style.left = value + '%';
            setMin(targetValue);
        }
        onChange({ min: targetValue, max: maxValue });
    };

    const changeSlideMax = (e, manualValue = null) => {
        if (manualValue !== null) {
            let targetValue = Number(manualValue.replace(/,/g, ''));
            if (targetValue > minValue + thresholdValue && targetValue < max) {
                let value = (targetValue / parseInt(max)) * 100;
                var children = sliderRef.current.firstChild.childNodes;
                children[1].style.width = (100 - value) + '%';
                children[2].style.right = (100 - value) + '%';
                children[3].style.left = value + '%';
                setMax(targetValue);
            } else if (targetValue < max) {
                setMax(targetValue);
            }
            onChange({ min: minValue, max: targetValue });
        } else {
            const target = e.target;
            const targetValue = Number(target.value);
            if (targetValue > minValue + thresholdValue) {
                let value = (target.value / parseInt(target.max)) * 100;
                var children = sliderRef.current.firstChild.childNodes;
                children[1].style.width = (100 - value) + '%';
                children[2].style.right = (100 - value) + '%';
                children[3].style.left = value + '%';
                setMax(targetValue);
            }
            onChange({ min: minValue, max: targetValue });
        }
    };

    const humanReadablePrice = price => {
        if (price.length < 3) {
            return price;
        } else {
            let currency = '';
            let newPrice = price.toString();
            while (newPrice.length > 2) {
                currency = ',' + newPrice.slice(-3) + currency
                newPrice = newPrice.slice(0, newPrice.length - 3)
            }
            currency = newPrice.length ? newPrice + currency : currency.substring(1)

            return currency;
        }
    };

    return (
        <div ref={sliderRef} className="w-full h-48 relative my-3" style={{ direction: 'ltr' }}>
            <div className="absolute left-3 w-[calc(100%_-_20px)] h-1 rounded-sm bg-primary">
                <div style={{ width: '0%' }} className="absolute -ml-3 z-50 top-0 left-0 h-[5px] rounded bg-slate-200 my-0" />
                <div style={{ width: '0%' }} className="absolute -mr-2 z-50 top-0 right-0 h-[5px] rounded bg-slate-200 my-0" />
                <div style={{ left: '0%', right: '0%' }} className="absolute left-0 w-full h-1 rounded" />
                <span style={{ left: '100%' }} className="absolute -ml-3 -top-2 z-10 w-5 h-5 text-left cursor-pointer shadow-md bg-primary border border-primary rounded-full outline-none" />
                <span style={{ left: '0%' }} className="absolute -ml-3 -top-2 z-10 w-5 h-5 text-left cursor-pointer shadow-md bg-primary border border-primary rounded-full outline-none" />
            </div>
            <input type="range" value={minValue} max={max} min={min} step={step} className="z-10 bg-transparent dark:bg-primary/40 dual-range" onInput={changeSlideMin} />
            <span className="text-sm absolute -right-2 top-4 text-gray-800 dark:text-gray-300">گران&zwnj;ترین</span>
            <input type="range" value={maxValue} max={max} min={min} step={step} className="z-10 bg-transparent dark:bg-primary/40 dual-range" onInput={changeSlideMax} />
            <span className="text-sm absolute -left-2 top-4 text-gray-800 dark:text-gray-300">ارزان&zwnj;ترین</span>
            <div className="w-full h-28 pt-12">
                <div style={{ direction: 'rtl' }} className="w-full h-12 mb-2 flex flex-row justify-around items-center">
                    <span className="text-sm text-gray-800 dark:text-gray-300">از</span>
                    <input type={'text'} className="w-9/12 h-12 leading-8 font-bold px-1 text-2xl outline-none bg-transparent border-b border-slate-400 text-gray-800 dark:text-gray-300 text-left" value={humanReadablePrice(minValue)} onChange={e => { changeSlideMin(e, e.target.value) }} />
                    <span className="text-xs font-medium mr-1 text-gray-800 dark:text-gray-300">تومان</span>
                </div>
                <div style={{ direction: 'rtl' }} className="w-full h-12 mb-2 flex flex-row justify-around items-center">
                    <span className="text-sm text-gray-800 dark:text-gray-300">تا</span>
                    <input type={'text'} className="w-9/12 h-12 leading-8 font-bold px-1 text-2xl outline-none bg-transparent border-b border-slate-400 text-gray-800 dark:text-gray-300 text-left" value={humanReadablePrice(maxValue)} onChange={e => { changeSlideMax(e, e.target.value) }} />
                    <span className="text-xs font-medium mr-1 text-gray-800 dark:text-gray-300">تومان</span>
                </div>
            </div>
        </div>
    );
}

export default RangeSliderM;