import React, { Component } from "react";

import Chart from "react-apexcharts";

import {donutSettings} from '../settings';

class ProductDonut extends Component {
    state = {};

    static getDerivedStateFromProps(props) {
        const data = props.categoryCount;
        const total = props.total;
        data.others = 0;
        
        for (let category in data) {
            if (isNaN(data[category])) {
                delete data[category];
            }

            if (data[category] / total < 0.03) {
                data.others += data[category];
                delete data[category];
            }
        }        

        return { ...donutSettings(data) }
    }

    render() {
        
        return (
            <div className="product-donut">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="pie"
                    height="450"
                    width="100%"
                />
            </div>
        );
    }
}

export default ProductDonut;
