import React, {Component} from 'react';

import SalesLine from '../Charts/SalesLine/SalesLine';
import InfoBox from '../InfoBox/InfoBox';
import InfoBoxContainer from '../InfoBox/InfoBoxContainer';
import Button from '../Button/Button';
import Product from './Product/Product';
import Vendor from './Vendor/Vendor';
import Customers from './Customers/Customers';
import {countObjectKeys} from '../../shared';


import './Sales.scss';

class Sales extends Component {
    state = {
        salesPerDay: "",
        salesData: [],
        monthNum: 0
    };

    componentDidMount() {
        this.setState({salesData: this.props.data});
        this.buttonHandler(0);
        window.addEventListener('scroll', this.listenToScroll);
    }

    filter = (monthNumber) => {
        const salesData = monthNumber === 0 
            ? this.props.data 
            : this.props.data.filter(item => item.sold.substring(0,2) === monthNumber);

        const salesPerDay = {};

        for (let item of salesData) {
            countObjectKeys(salesPerDay, item.sold.substring(0,5), 1);
        }
        return {salesPerDay, salesData};
    }

    buttonHandler = (num) => {
        const {salesPerDay, salesData} = this.filter(num); 

        this.setState({
            salesPerDay, 
            salesData,
            monthNum: num
        })
    }

    listenToScroll = () => {
        const buttonsPosition = this.inputElement.offsetTop;

        if (window.pageYOffset > buttonsPosition + 80) {
            this.inputElement.classList.add("btn-container-fixed");
        } else /*if (window.pageYOffset < buttonsPosition - 100)*/{
            this.inputElement.classList.remove("btn-container-fixed");
        }
    }

    render() {
        const {salesData, salesPerDay} = this.state;
        const prevState = this.filter("0" + (this.state.monthNum - 1));

        const prevSalesData = prevState.salesData;
        const prevSalesPerDay = prevState.salesPerDay;


        console.log(String(this.state.monthNum - 1))
        console.log(this.state)
        console.log(prevState)

        const totalSales = salesData.length;
        const prevTotalSales = prevSalesData.length;

        const totalRevenue = Object.values(salesData).reduce((acc, curValue) => (
            acc + Number(curValue.price)
        ), 0);
        const prevTotalRevenue = Object.values(prevSalesData).reduce((acc, curValue) => (
            acc + Number(curValue.price)
        ), 0);

        const avgRevenue = (totalRevenue / Object.keys(salesPerDay).length).toFixed(0);
        const prevAvgRevenue = (prevTotalRevenue / Object.keys(prevSalesPerDay).length).toFixed(0);

        const avgSales = (totalSales / Object.keys(salesPerDay).length).toFixed(0);    
        const prevAvgSales = (prevTotalSales / Object.keys(prevSalesPerDay).length).toFixed(0);    
         
        return (
            <main className="sales">
                <div className="btn-container" ref={inputEl => this.inputElement = inputEl}>
                    <Button name="Jan" clicked={() => this.buttonHandler("01")} active={this.state.monthNum === "01"} />
                    <Button name="Feb" clicked={() => this.buttonHandler("02")} active={this.state.monthNum === "02"} />
                    <Button name="Mar" clicked={() => this.buttonHandler("03")} active={this.state.monthNum === "03"} />
                    <Button name="Quarter" clicked={() => {this.buttonHandler(0)}} active={!this.state.monthNum} />
                    <span className="btn-container__text">Sales - 2016</span>
                </div>

                <InfoBoxContainer>
                    <InfoBox value={totalRevenue} prevValue={prevTotalRevenue} title="total revenue" />
                    <InfoBox value={totalSales} prevValue={prevTotalSales} title="total products sold" />
                    <InfoBox value={avgRevenue} prevValue={prevAvgRevenue} title="average revenue per day" />
                    <InfoBox value={avgSales} prevValue={prevAvgSales} title="average products sold per day" />
                </InfoBoxContainer>
                <h2 className="heading-2">products sold by day</h2>
                <SalesLine 
                    data={this.state.salesPerDay} 
                    monthNumber={this.state.monthNum}
                />
                <div className="sales__graphs">
                    <Product 
                        salesData={salesData} 
                        productData={this.props.product} 
                    />
                    <Vendor 
                        salesData={salesData}
                        vendorData={this.props.vendor} 
                    />
                    <Customers 
                        salesData={salesData}
                        customersData={this.props.customers} 
                    />
                </div>
            </main>
        );
    }
}

export default Sales;
