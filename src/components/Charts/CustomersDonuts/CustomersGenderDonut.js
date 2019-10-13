import React, { Component } from "react";

import Chart from "react-apexcharts";

import {donutSettings} from '../settings';

class CustomersGenderDonut extends Component {
    state = {};

    static getDerivedStateFromProps(props) {
        const genderData = props.customersGender;
        
        // "other" is always very small amount, hence negligible
        delete genderData.other;

        // renaming the "0" key to "unknown"
        genderData.unknown = genderData[0];
        delete genderData[0];

        return { ...donutSettings(genderData) }
    }

    render() {
        
        return (
            <div className="product-gender-donut">
                <h2 className="heading-2">User's gender</h2>
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

export default CustomersGenderDonut;
