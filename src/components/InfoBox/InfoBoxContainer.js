import React from 'react';

import './InfoBoxContainer.scss';

const InfoBoxContainer = props => {
    return (
        <div className="info-box-container">
            {props.children}
        </div>
    )
};

export default InfoBoxContainer;