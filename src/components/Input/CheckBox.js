import React, { useState, useEffect } from 'react';
import Icon from '../Icon'

const CheckBox = function ({
    className = '',
    title = '',
    value = false,
    onChange,
    required,
    ...others
}) {
    const [val, setVal] = useState(false)

    useEffect(() => {
        setVal(value);
    }, [value])

    const onChangeEvt = () => {
        if (onChange) onChange(!val);

        setVal(!val)
    }

    return (
        <div className={"checkbox w-100 " + className} {...others}>
            <div className="d-flex align-items-center" >
                <div style={required ? { borderWidth: 1, borderColor: "red" } : null} className={"control " + (val ? "active" : "")} onClick={onChangeEvt}>
                    {val &&
                        <Icon icon="check" className="svg-neutral-8" />
                    }
                </div>
                <div className="text-caption-bold ml-12" style={required ? { color: "red" } : null}>{title}</div>
            </div>
        </div>
    );
}

export default CheckBox;
