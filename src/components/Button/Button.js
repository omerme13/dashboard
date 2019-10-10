import React from 'react';

import './Button.scss';

const button = props => {

    return (
        <button 
            className="btn" 
            onClick={props.clicked} 
            style={{background: props.active ? 'var(--color-primary-light)' : "" }}
        >
            {props.name}
        </button>
    );
};

export default button;