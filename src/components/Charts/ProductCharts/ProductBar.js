import React, { Component } from 'react';
import Chart from 'react-apexcharts';

import {barSettings} from '../settings';

class ProductBar extends Component {
    state = {}

    static getDerivedStateFromProps(props) {
        return { ...barSettings(props.data, false, "Sold from this category") }
    }    

    render() {
        return (
            <div className="bar-apex">
                <Chart 
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    height="450"
                    width="100%"
                />
            </div>
        );
    }
}

export default ProductBar;