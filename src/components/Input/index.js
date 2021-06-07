import React, { useState, useRef, useEffect } from 'react';
import Button from '../Buttons/Button'
import Icon from '../Icon'

const Input = function ({
    className = '',
    value = '',
    icon = '',
    button = '',
    label = '',
    placeholder = '',
    prefix = '',
    childRef,
    onChange,
    onClick,
    borderRed,
    type,
    required
}) {
    const [padding, setPadding] = useState({ left: 16, right: 16 });
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const prefixRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = value;
    }, [value])

    useEffect(() => {
        let paddingLeft = 16, paddingRight = 16;

        if (buttonRef.current) {
            paddingRight += buttonRef.current.offsetWidth;
        }
        if (prefixRef.current) {
            paddingLeft += prefixRef.current.offsetWidth * 1.2;
        }
        setPadding({
            left: paddingLeft,
            right: paddingRight
        })
    }, [])

    return (
        <div className={"input " + className} ref={childRef}>
            {label !== '' &&
                <div className="label">{label} {required ? <font color="red"><b>*</b></font> : null}</div>
            }
            <input
                type={type ? type : 'input'}
                ref={inputRef}
                className="form-control w-100"
                style={borderRed === true ? {
                    borderColor: "red", borderWidth: 2, paddingLeft: `${padding.left}px`,
                    paddingRight: `${padding.right}px`,
                } : {
                    paddingLeft: `${padding.left}px`,
                    paddingRight: `${padding.right}px`,
                }}
                placeholder={placeholder}
                onChange={(event) => {
                    if (onChange) onChange(event.target.value)
                }}
            />
            {icon !== '' &&
                <Button
                    className="action rounded-circle"
                    onClick={() => {
                        if (onClick) onClick(inputRef.current.value)
                    }}
                    childRef={buttonRef}
                >
                    <Icon icon={icon} />
                </Button>
            }
            {button !== '' &&
                <Button
                    className="action-button small"
                    onClick={() => {
                        if (onClick) onClick(inputRef.current.value)
                    }}
                    childRef={buttonRef}
                >
                    {button}
                </Button>
            }
            {prefix !== '' &&
                <span className="text-prefix text-caption-bold mt-2 mb-2" ref={prefixRef}>
                    {prefix}
                </span>
            }
        </div>
    );
}

export default Input;
