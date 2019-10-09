import React from 'react';

import './InfoBox.scss';

const infoBox = props => {
    let value = (props.value > 0 && props.value < 1)
        ? props.value + '%'
        : props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div className="info-box">
            <h3 className="info-box__title">{props.title}</h3>
            <p 
                className="info-box__value" 
                style={{color: props.value < 0 ? 'red' : 'green'}}
            >
                {value}
            </p>
        </div>
    );
};

export default infoBox;