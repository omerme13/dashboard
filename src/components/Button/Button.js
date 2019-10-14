import React from 'react';

import './Button.scss';
 
const button = props => {

    return (
        <button 
            className={`btn ${props.active ? 'btn-active' : ""}`} 
            onClick={props.clicked} 
        >
            {props.name}
        </button>
    );
};

export default button;