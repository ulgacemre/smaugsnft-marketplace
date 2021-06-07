import React from 'react';

function Divider({size = 1, className, style, ...props}) {
    return (
        <div 
            className={"bg-neutral-6 w-100 " + className} 
            style={{height: `${size}px`, ...style}}
            {...props}
        >
        </div>
    );
}

export default Divider;
