import React, { Component } from "react";

import Chart from "react-apexcharts";

import {donutSettings} from '../settings';

import './ProductDonut.scss';


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
                <h2 className="heading-2">products sold by categories</h2>
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

export default ProductDonut;
