import React, { useState, useEffect } from 'react';

const Switch = function({
    className='', 
    title = '', 
    description='', 
    value = false, 
    onChange, 
    ...others
}) {
    const [val, setVal] = useState(false)

    useEffect(() => {
        setVal(value);
    }, [value])

    const onChangeEvt = () => {
        if( onChange ) onChange(!val);

        setVal( !val )
    }

    return (
        <div className={"switch " + className} {...others}>
            <div className="d-flex justify-content-between align-items-center" >
                {title !== '' &&                
                    <div className="text-body-2-bold" >{title}</div>
                }            
                <div className={"control " + (val ? "active" : "")} onClick={onChangeEvt}>                
                </div>
            </div>
            {description !== '' &&                
                <div className="text-caption-2 neutral-4 mt-1" >{description}</div>
            }            
        </div>
    );
}

export default Switch;
