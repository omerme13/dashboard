import React from 'react';

import './InfoBoxContainer.scss';

const InfoBoxContainer = props => {
    const style = {
        // display: 'flex',
        // justifyContent: 'space-between',
        // flexDirection: props.vertical ? 'column' : 'row',
        // display: 'grid',
        // gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        // gridTemplateRows: '1fr',
        // margin: '30px 0 30px 0'
    }

    return (
        <div className="info-box-container" style={style}>
            {props.children}
        </div>
    )
};

export default InfoBoxContainer;