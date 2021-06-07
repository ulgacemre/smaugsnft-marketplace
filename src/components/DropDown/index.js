import React, { useState, useEffect, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';
import Button from '../Buttons/Button';
import Icon from '../Icon';

const DropDown = function ({ values, allItems, label = '', className = '', required, ...props }) {
    const [current, setCurrent] = useState(allItems ? { title: "All Items" } : values[0])
    const [isShowList, setShowList] = useState(false)

    const listRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [])

    const handleClickOutside = (event) => {
        if (listRef.current && !listRef.current.contains(event.target)) {
            setShowList(false);
        }
    }

    return (
        <div className={className}>
            {label !== '' &&
                <div className="dropdown-label" >{label} {required ? <font color="red"><b>*</b></font> : null}</div>
            }
            <div ref={listRef} className="custom-dropdown" {...props} >
                {current.title}
                <Button className="dropdown-btn circle size-32 ml-3"
                    onClick={() => {
                        setShowList(!isShowList);
                    }}
                >
                    <Icon icon="chevron-down" />
                </Button>

                <ListGroup className={"dropdown-list " + (isShowList ? "d-block" : "d-none")}>
                    {allItems ? <ListGroup.Item onClick={() => {
                        setCurrent({ title: "All Items", id: -1 })
                        setShowList(false)
                        if (props.onChange)
                            props.onChange({ title: "All Items", id: -1 })
                    }}>
                        All Items
                    </ListGroup.Item> : null}
                    {values.map((child, idx) => (
                        <ListGroup.Item key={idx} onClick={() => {
                            setCurrent(child)
                            setShowList(false)
                            if (props.onChange)
                                props.onChange(child)
                        }}>
                            {child.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );
}

export default DropDown;
