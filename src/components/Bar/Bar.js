import React, { Component } from "react";

import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTheme,
    VictoryContainer
} from "victory";

import "./Bar.css";

const data = [
    { quarter: 1, earnings: 13000, label: "12" },
    { quarter: 2, earnings: 16500, label: "12" },
    { quarter: 3, earnings: 19000, label: "12" }
];

const data2012 = [
    { quarter: 1, earnings: 13000, label: "12" },
    { quarter: 2, earnings: 16500, label: "12" },
    { quarter: 3, earnings: 14250, label: "12" },
    { quarter: 4, earnings: 19000, label: "12" }
];

const data2013 = [
    { quarter: 1, earnings: 15000, label: "13" },
    { quarter: 2, earnings: 12500, label: "13" },
    { quarter: 3, earnings: 19500, label: "13" },
    { quarter: 4, earnings: 13000, label: "13" }
];

const data2014 = [
    { quarter: 1, earnings: 11500 },
    { quarter: 2, earnings: 13250 },
    { quarter: 3, earnings: 20000 },
    { quarter: 4, earnings: 15500 }
];

const data2015 = [
    { quarter: 1, earnings: 18000 },
    { quarter: 2, earnings: 13250 },
    { quarter: 3, earnings: 15000 },
    { quarter: 4, earnings: 12000 }
];

class Bar extends Component {
    state = {
        data: data2012
    };

    render() {

        console.log(this.state);
        return (
            <div className="VictoryC">
                <VictoryChart
                    animate={{ duration: 500, onLoad: { duration: 500 } }}
                    domainPadding={20}
                    theme={VictoryTheme.material}
                    containerComponent={<VictoryContainer responsive={false}/>}

                >
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4]}
                        tickFormat={["Q1", "Q2", "Q3", "Q4"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={x => `$${x / 1000}k`}
                    />
                    <VictoryBar
                        animate={{
                            onExit: {
                                duration: 500,
                                before: () => ({
                                    _y: 0,
                                    label: "BYE"
                                })
                            }
                        }}
                        data={this.state.data}
                        x="quarter"
                        y="earnings"
                        events={[
                            {
                              target: "data",
                              eventHandlers: {
                                onClick:  () => this.setState({data: data})           
                              }
                            }
                          ]}
                    />
                </VictoryChart>
            </div>
        );
    }
}

export default Bar;
