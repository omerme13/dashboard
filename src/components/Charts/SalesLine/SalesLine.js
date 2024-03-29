import React, { Component } from "react";

import Chart from "react-apexcharts";

class SalesLine extends Component {
    state = {
        options: {
            chart: {
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                // enabled: true
            },
            stroke: {
                curve: "smooth"
            },
            // title: {
            //     text: "2016 quarter / monthly sales",
            //     align: "center",
            //     style: {
            //         fontSize: 30,
            //         fontFamily: 'Lato'
            //     }
            // },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.3
                }
            },
            xaxis: {
                categories: Object.keys(this.props.data),
                type: 'datetime'
            }
        },
        series: [
            { name: "Products sold", data: Object.values(this.props.data), type: "line" }
        ],
    };

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                series: [
                    { name: "Products sold", data: Object.values(this.props.data), type: "line" }                    
                ],
                options: {
                    ...this.state.options,
                    xaxis: {
                        ...this.state.xaxis,
                        categories:  Object.keys(this.props.data)
                    } 
                } 
            })
        }    
    }

    render() {
        return (
            <div className="sales-chart">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height="450"
                    width="100%"
                />
            </div>
        );
    }
}

export default SalesLine;
