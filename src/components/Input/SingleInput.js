import React, {useRef, useEffect}  from 'react';
import Button from '../Buttons/Button'
import Icon from '../Icon'

const SingleInput = function({
        className='', 
        value = '', 
        icon='arrow-right', 
        placeholder='', 
        onChange, 
        onClick }) {    
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = value;
    }, [value])

    return (
        <div className={"single-input " + className }>
            <input 
                ref={inputRef}
                type="input" 
                className="form-control" 
                placeholder={placeholder}
                onChange={(event) => {
                    if(onChange) onChange(event.target.value)
                }}
            />
            <Button 
                className="action primary rounded-circle" 
                onClick={() => {
                    if(onClick) onClick(inputRef.current.value)
                }}
            >
                <Icon icon={icon} />
            </Button>
        </div>
    );
}

export default SingleInput;
