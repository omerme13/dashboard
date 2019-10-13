import React, { Component } from "react";

import Chart from "react-apexcharts";

import {donutSettings} from '../settings';

class CustomersOSDonut extends Component {
    state = {};

    static getDerivedStateFromProps(props) {
        const osData = props.customersOS;

        return { ...donutSettings(osData) }
    }

    render() {
        return (
            <div className="product-os-donut">
                <h2 className="heading-2">OS used for purchasing</h2>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="donut"
                    height="450"
                    width="100%"
                />
            </div>
        );
    }
}

export default CustomersOSDonut;
