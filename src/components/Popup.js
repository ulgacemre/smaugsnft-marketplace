import React, {useEffect, useRef} from 'react';
import { Overlay } from 'react-bootstrap'

function Popup({target, show, onClose, className, arrowStyle, placement='bottom', ...parentProps}) {    
    const containerRef = useRef(null);
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [])

    const handleClickOutside = (event) => {
        if (target && target.contains(event.target))
            return;
        
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            if( onClose ) onClose();
        }
    }

    return (
        <Overlay 
            target={target} 
            show={show}
            placement={placement}
        >
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div className={"popup-dialog " + className} {...props} style={{...props.style}}> 
                <div className="popup-arrow" style={{...arrowStyle}}></div>
                <div ref={containerRef} >
                    {parentProps.children}
                </div>
            </div>
        )}
      </Overlay>
    );
}

export default Popup;
