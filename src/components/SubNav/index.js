import React, { useState } from 'react';

function SubNav({ className = '', allItems, tabs, onChange, ...props }) {
    const [currActive, setCurrActive] = useState(allItems ? -1 : 0)

    return (
        <div className={"subnav " + className} {...props}>
            {allItems ? <span
                className={"tabitem text-nowrap" + (currActive === -1 ? " active" : "") + " " + className}
                onClick={() => {
                    setCurrActive(-1);
                    if (onChange)
                        onChange(0);
                }}>
                All Items
            </span> : null}
            {tabs.map((tab, idx) => (
                <span
                    className={"tabitem text-nowrap" + (currActive === idx ? " active" : "") + " " + tab.className}
                    key={idx}
                    onClick={() => {
                        setCurrActive(idx);
                        if (onChange)
                            onChange(tab, idx);
                    }}>
                    {tab.title}
                </span>
            ))}
        </div>
    );
}

export default SubNav;