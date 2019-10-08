import React, { Component } from "react";

import Chart from "react-apexcharts";

class Donut extends Component {
    state = {
        series: Object.values(this.props.data.categories),
        options: {
            labels: Object.keys(this.props.data.categories),
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                // value: "products",
                                color: "black"
                            },
                            total: {
                                show: true,
                                label: `Total: ${this.props.data.total} products`,
                                formatter: () => {}
                            } 
                        }
                    }
                }
            }
        }
    };

    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="donut"
                height="450"
                width="100%"
            />
        );
    }
}

export default Donut;
