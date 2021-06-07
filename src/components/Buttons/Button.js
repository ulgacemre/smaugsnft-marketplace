import React from 'react';
import Icon from '../Icon'

const Button = function({
    className='',
    icon, 
    iconPos = 'right', 
    iconsize, 
    disabled = false, 
    onClick, 
    circle=false, 
    childRef,
    ...others
}) {
    
    return (
        <button 
            className={"button " + className + (disabled ? " disabled" : "")  + (circle ? " circle" : "")} 
            onClick={(e) => {
                if( disabled ) return;
                if( onClick ) onClick(e)
            }}
            ref={childRef}
            {...others}>
            {circle &&
                <Icon icon={icon} size={iconsize}/>
            }
            
            {(!circle && iconPos === 'left') &&
                <Icon icon={icon}  className="mr-2" size={iconsize}/>
            }
            <span className="text-nowrap">{others.children}</span>
            {(!circle && iconPos === 'right') &&
                <Icon icon={icon} className="ml-2" size={iconsize}/>
            }
            
        </button>
    );
}

export default Button;
