import React from 'react';

const InfoBoxContainer = props => {
    const style = {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: props.vertical ? 'column' : 'row'
    }

    return (
        <div className="info-box-container" style={style}>
            {props.children}
        </div>
    )
};

export default InfoBoxContainer;