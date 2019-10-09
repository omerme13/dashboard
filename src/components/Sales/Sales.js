import React, {Component} from 'react';

import SalesChart from '../Charts/SalesChart/SalesChart';
import InfoBox from '../InfoBox/InfoBox';
import InfoBoxContainer from '../InfoBox/InfoBoxContainer';

import './Sales.scss';

class Sales extends Component {
    state = {
        dataToTransfer: ""
    };

    filter = (monthNumber) => {
        const monthToFilter = this.props.data.filter(item => item.sold.substring(0,2) === monthNumber);
        const monthToFilterSales = {};

        for (let item of monthToFilter) {
            if (isNaN(monthToFilterSales[item.sold.substring(0,5)])) {
                monthToFilterSales[item.sold.substring(0,5)] = 0;
                monthToFilterSales[item.sold.substring(0,5)]++;
            } else {
                monthToFilterSales[item.sold.substring(0,5)]++;
            }
        }
        this.setState({dataToTransfer: monthToFilterSales})
    }

    render() {
        const monthlySales = {};

        for (let item of this.props.data) {
            if (isNaN(monthlySales[item.sold.substring(0,5)])) {
                monthlySales[item.sold.substring(0,5)] = 0;
                monthlySales[item.sold.substring(0,5)]++;
            } else {
                monthlySales[item.sold.substring(0,5)]++;
            }
        }

        const salesData = {
            totalSales: this.props.data.length,
            totalRevenue: this.props.data.reduce((acc, curValue) => (
                acc + Number(curValue.price)
            ), 0),
            dates: this.props.data.map(item => item.sold.split(' ')[0]),
            prices: this.props.data.map(item => item.price),
            monthlySales
        }

        console.log("dataToTransfer", this.state.dataToTransfer)

        return (
            <div className="sales">
                {/* <h1>SALES</h1> */}
                <button onClick={() => this.filter("01")}>Jan</button>
                <button onClick={() => this.filter("02")}>Feb</button>
                <button onClick={() => this.filter("03")}>Mar</button>
                <button onClick={() => this.setState({dataToTransfer: monthlySales})}>Reset</button>
                <InfoBoxContainer>
                    <InfoBox value={-5000} title="total revenue" />
                    <InfoBox value={0.5} title="new customers" />
                </InfoBoxContainer>
                <SalesChart 
                    data={salesData} 
                    filteredData={this.state.dataToTransfer}
                />
            </div>
        );
    }
}

export default Sales;
