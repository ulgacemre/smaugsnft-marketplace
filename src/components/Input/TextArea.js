import React, {useRef, useEffect} from 'react';

const TextArea = function({
    className='', 
    value = '', 
    label='', 
    placeholder='', 
    childRef,
    onChange,
}) {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = value;
    }, [value])

    return (
        <div className={ "input " + className } ref={childRef}>
            {label !== '' &&
            <div className="label">{label}</div>
            }
            <textarea
                type="input" 
                ref={inputRef}
                className="form-control w-100" 
                placeholder={placeholder}
                onChange={(event) => {
                    if(onChange) onChange(event.target.value)
                }}
            />
        </div>
    );
}

export default TextArea;
