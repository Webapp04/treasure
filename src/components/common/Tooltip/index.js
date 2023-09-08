import React from 'react';
import './style.scss'
import cn from "classnames"

const Tooltip = ({children, tooltipText, top = -55, isBottom, width = 190, left = 50, style}) => {
    return (
        <div className='tooltip'>
            {children}
            <span
                className={`tooltip__text ${isBottom ? 'tooltip__text--isBottom' : ''}`}
                style={{top: `${top}px`, width: `${width}px`, left: `${left}%`, ...style}}>
                {tooltipText}
            </span>
        </div>
    );
};

export default Tooltip;
