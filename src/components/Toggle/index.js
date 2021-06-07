import React, {useState} from 'react';
import Divider from '../Divider';
import Icon from '../Icon'

function Toggle({className='', title, onChange, style = 1, divider = true, ...props}) {
    const [isOpen, setOpen] = useState(true)

    function getIcon () {
        if( style == 2 ) {
            return isOpen ? "minus-square" : "plus-square"
        }

        return isOpen ? "chevron-up" : "chevron-down"
    }

    return (
        <div className={ "toggle " + className } {...props}>
            <div 
                className="text-body-2-bold d-flex justify-content-between align-items-center"
                style={ isOpen ? {marginBottom: '20px'} : {} }
            >
                <div>{title}</div>                        
                <Icon icon={getIcon()} className="pointer" onClick={() => setOpen(!isOpen)}/>
            </div>
            {divider &&
                <Divider class="py-1" />
            }
            {isOpen &&            
                <div style={{marginTop: '20px'}}>
                    {props.children}
                </div>
            }
        </div>
    );
}

export default Toggle;