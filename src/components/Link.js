import React from 'react';

function Link({className = '', ...props}) {
    return (
        <a className={"text-decoration-none " + className} {...props}>
            {props.children}
        </a>
    );
}

export default Link;
