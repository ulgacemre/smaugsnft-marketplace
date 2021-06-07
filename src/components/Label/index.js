import React from 'react';

//
// classname: black, green, red, blue, purple, gray
//
//
const Label = function({fill=false, className='', font='text-hairline-2', ...props }) {
    return (
        <div className={"label " + font + " " + (fill ? "fill " : "") + className} {...props}>
            {props.children}
        </div>
    );
}

export default Label;
