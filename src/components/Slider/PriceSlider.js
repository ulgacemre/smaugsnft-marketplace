import React from 'react';
import Slider from './index';

function PriceSlider({className, label, value, min, max, onChange, ...props}) {
    return (
        <div className={className} {...props}>
            <div className="text-hairline-2 neutral-5 mb-12">
                {label}
            </div>
            <div className="special-slider">
                <Slider                                                    
                    value={value}
                    min={0}
                    max={100000}
                    step={10}
                    tooltip={true}
                    format={(v) => ((v / 1) + " SMG")}
                    fillColor="#3772FF"
                    trackColor="#E6E8EC"
                    trackStyle={{
                        clipPath: 'polygon(0% 45%,100% 0%,100% 100%,0% 55%)'
                    }}
                    trackThickness={16}
                    onChange={(v) => {
                         if (onChange) onChange(v)
                    }}
                />
                <div className="text-caption-bold d-flex justify-content-between">
                    <div>{min / 1} SMG</div>
                    <div>{max / 1} SMG</div>
                </div>
            </div>
        </div>
    );
}

export default PriceSlider;
