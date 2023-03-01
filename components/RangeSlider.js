import React, { useRef, useState } from "react";

function RangeSlider({ min = 0, max = 100, step = 1, threshold = 1, onChange }) {
    
    const sliderRef = useRef();
    const [minValue, setMin] = useState(min);
    const [maxValue, setMax] = useState(max);
    const [thresholdValue, setThreshold] = useState(threshold);

    const changeSlideMin = (e) => {
        const target = e.target;        
        const targetValue = Number(target.value);
        if (targetValue < maxValue + thresholdValue) {
            let value = (target.value / parseInt(target.max)) * 100
            var children = sliderRef.current.firstChild.childNodes;
            children[0].style.width = value + '%';
            children[2].style.left = value + '%';
            children[4].style.left = value + '%';
            children[5].style.left = value + '%';
            children[5].firstChild.innerHTML = target.value;
            setMin(targetValue);
            if((((maxValue - target.value) / target.max) < 0.5) && children[6].style.top !== '-80px'){
                children[5].style.top = '-80px';
                children[5].classList.remove('after:border-t-[12px]');
                children[5].classList.add('after:border-t-[44px]');
            } else {
                children[5].classList.remove('after:border-t-[44px]');
                children[5].classList.add('after:border-t-[12px]');
                children[5].style.top = '-48px';
            }
        }
        onChange({ min: targetValue, maxValue });
    };

    const changeSlideMax = (e) => {
        const target = e.target;
        const targetValue = Number(target.value);
        if (targetValue > minValue + thresholdValue) {
            let value = (target.value / parseInt(target.max)) * 100
            var children = sliderRef.current.firstChild.childNodes;
            children[1].style.width = (100 - value) + '%';
            children[2].style.right = (100 - value) + '%';
            children[3].style.left = value + '%';
            children[6].style.left = value + '%';
            children[6].firstChild.innerHTML = target.value;
            setMax(targetValue);
            if((((target.value - minValue) / target.max) < 0.5) &&  children[5].style.top !== '-80px'){
                children[6].style.top = '-80px';
                children[6].classList.remove('after:border-t-[12px]');
                children[6].classList.add('after:border-t-[44px]');
            } else {
                children[6].classList.remove('after:border-t-[44px]');
                children[6].classList.add('after:border-t-[12px]');
                children[6].style.top = '-48px';
            }
        }
        onChange({ min: minValue, max: targetValue });
    };

    const humanReadablePrice = price => {
        if (price.length < 3) {
            return price;
        } else {
            let currency = '';
            let newPrice = price.toString();
            while(newPrice.length > 2){
                currency = ',' + newPrice.slice(-3) + currency
                newPrice = newPrice.slice(0, newPrice.length - 3)
            }
            currency = newPrice.length ? newPrice + currency : currency.substring(1)

            return currency;
        }
    };

    return(
        <div ref={sliderRef} className="w-full h-10 relative my-1" style={{ direction: 'ltr' }}>
            <div className="absolute left-3 w-[calc(100%_-_20px)] h-1">
                <div style={{ width: '0%' }} className="absolute -ml-3 z-50 top-0 left-0 h-[5px] rounded bg-gray-300 my-0" />
                <div style={{ width: '0%' }} className="absolute -mr-2 z-50 top-0 right-0 h-[5px] rounded bg-gray-300 my-0" />
                <div style={{ left: '0%', right: '0%' }} className="absolute left-0 w-full h-1 rounded" />
                <span style={{ left: '100%' }} className="absolute -ml-3 -top-2 z-10 w-5 h-5 text-left cursor-pointer shadow-md bg-white border border-primary rounded-full outline-none" />
                <span style={{ left: '0%' }} className="absolute -ml-3 -top-2 z-10 w-5 h-5 text-left cursor-pointer shadow-md bg-white border border-primary rounded-full outline-none" />
                <div style={{ left: '0%', top: -48 }} className="absolute -ml-4 min-w-[28px] w-auto h-7 z-20 bg-primary text-white rounded-full px-2 text-center after:w-4 after:h-4 after:absolute after:top-[22px] after:left-1 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:border-t-primary after:border-t-[12px] after:rounded-md after:content-['']">
                    <span className="font-medium leading-7">{humanReadablePrice(minValue)}</span>
                </div>
                <div style={{ left: '100%', top: -48 }} className="absolute -ml-4 min-w-[28px] w-auto h-7 z-10 bg-primary text-white rounded-full px-2 text-center after:w-4 after:h-4 after:absolute after:top-[22px] after:left-1 after:mx-auto after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:border-t-primary after:border-t-[12px] after:rounded-md after:content-['']">
                    <span className="font-medium leading-7">{humanReadablePrice(maxValue)}</span>
                </div>
            </div>
            <input type="range" value={minValue} max={max} min={min} step={step} className="z-10 bg-transparent dual-range" onInput={changeSlideMin} />
            <input type="range" value={maxValue} max={max} min={min} step={step} className="z-10 bg-transparent dual-range" onInput={changeSlideMax} />
        </div>
    );
}

export default RangeSlider;