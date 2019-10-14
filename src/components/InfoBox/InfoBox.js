import React from 'react';

import './InfoBox.scss';

const infoBox = props => {
    let value = (props.value > 0 && props.value < 1)
        ? props.value + '%'
        : props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const difference = !props.prevValue || isNaN(props.prevValue)     
        ? null
        : (props.value / props.prevValue);

    const trend = difference 
        ? (Math.abs((difference - 1)) * 100).toFixed(2) + '%'
        : null;


    let color = null;
    let arrow = null;

    if (difference) {
        color = 'green';
        arrow = '↑'; 

        if (difference < 1) {
            color = 'red';
            arrow = '↓';
        }    
    }    

    return (
        <div className="info-box">
            <h3 className="info-box__title">{props.title}</h3>
            <p className="info-box__value">
                {value} &nbsp; 
                <span className="info-box__trend" style={{color}}>
                    {trend} {arrow}
                </span> 
            </p>
        </div>
    );
};

export default infoBox;