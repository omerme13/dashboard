import React, { Component } from "react";

import Chart from "react-apexcharts";

import './SalesDonut.scss';

const colorSet = ['#F66D44', '#FEAE65', '#E6F69D', '#AADEA7', '#64C2A6', '#2D87BB', '#7982B9', '#A5C1DC'];

class SalesDonut extends Component {
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

        return {
            categoryCount: data,
            series: Object.values(data),
            options: {
                colors: colorSet,
                labels: Object.keys(data),
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
