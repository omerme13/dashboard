import React, {Component} from 'react';

import SalesLine from '../Charts/SalesLine/SalesLine';
import InfoBox from '../InfoBox/InfoBox';
import InfoBoxContainer from '../InfoBox/InfoBoxContainer';
import Button from '../Button/Button';

import './Sales.scss';

class Sales extends Component {
    state = {
        salesPerDay: "",
        salesData: [],
        monthNum: 0
    };

    componentDidMount() {
        this.setState({salesData: this.props.data});
        this.handleButtonHandler(0);
    }

    filter = (monthNumber) => {
        const salesData = monthNumber === 0 
            ? this.props.data 
            : this.props.data.filter(item => item.sold.substring(0,2) === monthNumber);

        const salesPerDay = {};

        for (let item of salesData) {
            if (isNaN(salesPerDay[item.sold.substring(0,5)])) {
                salesPerDay[item.sold.substring(0,5)] = 0;
                salesPerDay[item.sold.substring(0,5)]++;
            } else {
                salesPerDay[item.sold.substring(0,5)]++;
            }
        }

        this.setState({salesPerDay, salesData})
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

        const {salesData, salesPerDay} = this.state;

        const totalSales = salesData.length;
        const totalRevenue = Object.values(salesData).reduce((acc, curValue) => (
            acc + Number(curValue.price)
        ), 0);

        const avgRevenue = (totalRevenue / Object.keys(salesPerDay).length).toFixed(0);
        const avgSales = (totalSales / Object.keys(salesPerDay).length).toFixed(0);    
            
        const productCount = {};
        for (let item of salesData) {
            if (isNaN(productCount[item.product_id])) {
                productCount[item.product_id] = 0;
                productCount[item.product_id]++;
            } else {
                productCount[item.product_id]++;

            }
        }
            console.log(this.state)

        return (
            <section className="sales">
                <Button name="Jan" clicked={() => this.handleButtonHandler("01")} active={this.state.monthNum == "01"} />
                <Button name="Feb" clicked={() => this.handleButtonHandler("02")} active={this.state.monthNum == "02"} />
                <Button name="Mar" clicked={() => this.handleButtonHandler("03")} active={this.state.monthNum == "03"} />
                <Button name="Quarter" clicked={() => {this.handleButtonHandler(0)}} active={!this.state.monthNum} />
                <InfoBoxContainer>
                    <InfoBox value={totalRevenue} title="total revenue" />
                    <InfoBox value={totalSales} title="total products sold" />
                    <InfoBox value={avgRevenue} title="average revenue per day" />
                    <InfoBox value={avgSales} title="average products sold per day" />
                </InfoBoxContainer>
         

                <SalesLine 
                    data={this.state.salesPerDay} 
                    monthNumber={this.state.monthNum}
                />
            </section>
        );
    }
}

export default Sales;
