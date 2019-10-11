import React, { Component } from "react";

import Chart from "react-apexcharts";

import './SalesDonut.scss';

class SalesDonut extends Component {
    state = {};

    static getDerivedStateFromProps(props) {
        const data = props.categoryCount;
        
        for (let product in data) {
            if (isNaN(data[product])) {
                delete data[product];
            }
        }

        return {
            categoryCount: data,
            series: Object.values(data),
            options: {labels: Object.keys(data),
                dataLabels: {
                    style: {
                        fontSize: '15px',
                        fontFamily: 'var(--font-main)',
                        fontWeight: '400',
                        colors: ['var(--color-text)']
                    },
                    dropShadow: {
                        enabled: false,
                    }
                  }
            }
        }
    }

    render() {
        
        return (
            <div className="sales-donut">
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

export default SalesDonut;
