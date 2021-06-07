import React, {useRef, useEffect}  from 'react';
import Icon from '../Icon'

const SearchBox = function({className='', value = '',placeholder='Search', onChange, onSearch, ...props }) {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = value;
    }, [value])

    return (
        <div className={"search-box input-group rounded " + className} {...props}>
            <input 
                ref={inputRef}
                type="search" 
                className="form-control rounded" 
                placeholder={placeholder} 
                aria-label="Search"
                aria-describedby="search-addon" 
                onChange={(event) => {
                    if(onChange) onChange(event.target.value)
                }}
            />
            <div 
                className="search input-group-text border-0" 
                id="search-addon"
                onClick={() => {
                    if(onSearch) onSearch(inputRef.current.value)
                }}
            >
                <Icon icon="search" size="sm" />
            </div>
        </div>
    );
}

export default SearchBox;
