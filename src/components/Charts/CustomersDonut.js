import React, { Component } from "react";

import Chart from "react-apexcharts";

import { donutSettings } from "./settings";

class CustomersDonut extends Component {
    state = {};

    static getDerivedStateFromProps(props) {
        const data = props.customersData;
        if (props.customersData.male) { // if the data is customers gender 
            delete data.other; // "other" is always very small amount, hence negligible          
            data.unknown = data[0]; // renaming the "0" key to "unknown"
            delete data[0];
        }
        return { ...donutSettings(data) };
    }

    render() {
        return (
            <div className={`customers__${this.props.class}`}>
                <h2 className="heading-2">{this.props.title}</h2>
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

export default CustomersDonut;
