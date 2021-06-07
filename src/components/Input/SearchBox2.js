import React, { useState, useEffect, useRef }  from 'react';
import Input from './index'
import Button from '../Buttons/Button';

const SearchBox2 = function({className='', value = '',placeholder='Search', onChange, onSearch }) {
    const [isOpen, setOpen] = useState(false)
    
    const inputRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [])

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setOpen(false);
        }
    }

    return (
        <div className={"search-box-2 " + className} >
            <div className="d-none d-lg-block">
                {isOpen ? (
                    <Input 
                        className="small"
                        icon="search" 
                        placeholder={placeholder} 
                        value={value} 
                        onChange={onChange} 
                        onClick={onSearch}
                        childRef={inputRef}
                    />
                ) : (
                    <div className="p-1">
                        <Button 
                            icon="search" 
                            iconsize="sm"
                            className="primary small border-0" 
                            circle={true}
                            onClick={() => setOpen(true)}
                        />
                    </div>
                )}
            </div>
            <div className="d-lg-none">
                <Input 
                    icon="search" 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange} 
                    onClick={onSearch} 
                />
            </div>
        </div>
    );
}

export default SearchBox2;
