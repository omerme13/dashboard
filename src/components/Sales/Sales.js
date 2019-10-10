import React, {Component} from 'react';

import SalesChart from '../Charts/SalesChart/SalesChart';
import InfoBox from '../InfoBox/InfoBox';
import InfoBoxContainer from '../InfoBox/InfoBoxContainer';
import Button from '../Button/Button';

import './Sales.scss';

class Sales extends Component {
    state = {
        currentData: "",
        monthNum: 0
    };

    filter = (monthNumber) => {
        if (!monthNumber) {
            const sales = {}
            for (let item of this.props.data) {
                if (isNaN(sales[item.sold.substring(0,5)])) {
                    sales[item.sold.substring(0,5)] = 0;
                    sales[item.sold.substring(0,5)]++;
                } else {
                    sales[item.sold.substring(0,5)]++;
                }
            }
            this.setState({currentData: sales})
            return;
        }
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
        this.setState({currentData: monthToFilterSales})
    }

    handleButtonHandler = (num) => {
        this.filter(num); 
        this.setState({monthNum: num})
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

        let data;
        if (this.state.currentData === "") {
            data = this.props.data;
        } else {
            if (!this.state.monthNum) {
                data = this.props.data;
            } else {
                data = this.props.data.filter(item => item.sold.substring(0,2) === this.state.monthNum);
            }
        }

        const totalSales = data.length;
        const totalRevenue = Object.values(data).reduce((acc, curValue) => (
            acc + Number(curValue.price)
        ), 0);
        const prices = data.map(item => item.price);
        const avgRevenue = this.state.currentData === "" 
            ? (totalRevenue / Object.keys(monthlySales).length).toFixed(0)
            : (totalRevenue / Object.keys(this.state.currentData).length).toFixed(0);

        const avgSales = this.state.currentData === "" 
            ? (totalSales / Object.keys(monthlySales).length).toFixed(0)
            : (totalSales / Object.keys(this.state.currentData).length).toFixed(0);    
            
        
        return (
            <section className="sales">
                <Button name="Jan" clicked={() => this.handleButtonHandler("01")} active={this.state.monthNum == "01"} />
                <Button name="Feb" clicked={() => this.handleButtonHandler("02")} active={this.state.monthNum == "02"} />
                <Button name="Mar" clicked={() => this.handleButtonHandler("03")} active={this.state.monthNum == "03"} />
                <Button name="Quarter" clicked={() => {this.handleButtonHandler(0)}} active={!this.state.monthNum} />
         
                <InfoBoxContainer>
                    <InfoBox value={totalRevenue} title="total revenue" />
                    <InfoBox value={totalSales} title="total products sold" />
                    <InfoBox value={avgRevenue} title="average revenue for a day" />
                    <InfoBox value={avgSales} title="average products sold for a day" />
                </InfoBoxContainer>

                <SalesChart 
                    data={monthlySales} 
                    filteredData={this.state.currentData}
                    monthNumber={this.state.monthNum}
                />
            </section>
        );
    }
}

export default Sales;
