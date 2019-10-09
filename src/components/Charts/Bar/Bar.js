import React, { Component } from 'react';
import Chart from 'react-apexcharts';

import './Bar.scss';

class Bar extends Component {
    state = {
        options: {
            chart: {
                background: 'whitesmoke',
                foreColor: '#333'
            },
            xaxis: { // it disable the buttons for zooming 
                categories: Object.keys(this.props.data)
            },
            plotOptions: {
                bar: {
                    horizontal: false
                } 
            },
            fill: {
                colors: ['#333']
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
            name: this.props.name,
            data: Object.values(this.props.data)
        }]
    }

    toggleOrientationHandler = () => {
        this.setState({
            options: {
                ...this.state.options,
                plotOptions: {
                    ...this.state.options.plotOptions,
                        bar: {
                            ...this.state.options.plotOptions.bar,
                            horizontal: !this.state.options.plotOptions.bar.horizontal
                        }
                    
                }
            }
        })
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
                <button onClick={this.toggleOrientationHandler}>
                    {
                        this.state.options.plotOptions.bar.horizontal
                        ? 'Vertical view'
                        : 'Horizontal view'
                    }
                        
                </button>
            </div>
        );
    }
}

export default Bar;