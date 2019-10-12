import React, { Component } from 'react';
import Chart from 'react-apexcharts';

import './VendorBar.scss';

class VendorBar extends Component {
    state = {}

    static getDerivedStateFromProps(props) {
        return {
            options: {
                chart: {
                    background: 'whitesmoke',
                    foreColor: '#333'
                },
                xaxis: { // it disable the buttons for zooming 
                    categories: Object.keys(props.data)
                },
                plotOptions: {
                    bar: {
                        horizontal: false
                    } 
                },
                fill: {
                    colors: ['#3498db']
                },
                dataLabels: {
                    enabled: false
                },
                title: {
                    text: 'Sales - 2016 Q1',
                    align: 'center',
                    margin: 20,
                    offset: 20, 
                    style: {
                        fontSize: '25px'
                    }
                }
            },
            series: [{
                name: "product sold from this country",
                data: Object.values(props.data)
            }]
        }
    }    

    render() {
        return (
            <div className="bar-apex">
                <Chart 
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    height="450"
                    width="100%"
                />
            </div>
        );
    }
}

export default VendorBar;