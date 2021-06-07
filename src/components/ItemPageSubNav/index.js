import React, { useState } from 'react';

function ItemPageSubNav({ className = '', tabs, nftTab, setNftTab, ...props }) {
    return (
        <div className={"subnav " + className} {...props}>
            {tabs.map((tab, idx) => (
                <span
                    className={"tabitem text-nowrap" + (nftTab === idx ? " active" : "") + " " + tab.className}
                    key={idx}
                    onClick={() => {
                        setNftTab(idx);
                    }}>
                    {tab.title}
                </span>
            ))}
        </div>
    );
}

export default ItemPageSubNav;