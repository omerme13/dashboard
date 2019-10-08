import React, { Component } from "react";

import Chart from "react-apexcharts";

class Line extends Component {
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
                curve: "straight"
            },
            title: {
                text: "Last quarter monthly sales",
                align: "center"
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.3
                }
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar"]
            }
        },
        series: [
            this.props.isMonth 
            ? { name: "Products sold", data: Object.values(this.props.data.monthlySales), type: "line" }
            : (

                { name: "Products sold", data: Object.values(this.props.data.monthlySales), type: "bar" }
            ) 
        ]
    };

    render() {

        console.log(this.props.data)
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="line"
                height="450"
                width="100%"
            />
        );
    }
}

export default Line;
