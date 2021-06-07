import React, {useEffect, useRef} from 'react';

function ScrollView({className, horizontal = true, ...props}) {
    const eleRef = useRef(null);
    let pos = { grab: false, top: 0, left: 0, x: 0, y: 0 };

    useEffect(() => {
        window.addEventListener('mousedown', mouseDownHandler);        
        window.addEventListener('mouseup', mouseUpHandler);        
        window.addEventListener('mousemove', mouseMoveHandler);  
        return () => {
            window.removeEventListener('mousedown', mouseDownHandler);        
            window.removeEventListener('mouseup', mouseUpHandler);        
            window.removeEventListener('mousemove', mouseMoveHandler);  
        };
    }, [])

    const mouseDownHandler = (e) => {
        pos = {
            grab: true,
            left: eleRef.current.scrollLeft,
            top: eleRef.current.scrollTop,
            x: e.clientX,
            y: e.clientY
        }
    }

    const mouseUpHandler = (e) => {
        pos = {grab: false}
    }
    
    const mouseMoveHandler = (e) => {
        if( pos.grab ) {
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;
            eleRef.current.scrollTop = pos.top - dy;
            eleRef.current.scrollLeft = pos.left - dx;    
        }
    }

    return (
        <div 
            ref={eleRef} 
            className={"scroll-container " + (horizontal ? "horizon " : "vertical ") + className} 
            {...props}
        >
            {props.children}
        </div>
    );
}

export default ScrollView;
