import React, {Component} from 'react';

import SalesLine from '../Charts/SalesLine/SalesLine';
import InfoBox from '../InfoBox/InfoBox';
import InfoBoxContainer from '../InfoBox/InfoBoxContainer';
import Button from '../Button/Button';
import Product from './Product';
import Vendor from './Vendor';


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
            if (isNaN(salesPerDay[item.sold.substring(0,5)])) {
                salesPerDay[item.sold.substring(0,5)] = 0;
            } 
            salesPerDay[item.sold.substring(0,5)]++;
        }

        this.setState({salesPerDay, salesData})
    }

    buttonHandler = (num) => {
        this.filter(num); 
        this.setState({monthNum: num})
    }

    listenToScroll = () => {
        const buttonsPosition = this.inputElement.offsetTop;

        if (window.pageYOffset > buttonsPosition) {
            this.inputElement.classList.add("sales__btn-container-fixed");
        } else /*if (window.pageYOffset < buttonsPosition - 100)*/{
            this.inputElement.classList.remove("sales__btn-container-fixed");
        }
    }

    render() {
        const monthlySales = {};

        for (let item of this.props.data) {
            if (isNaN(monthlySales[item.sold.substring(0,5)])) {
                monthlySales[item.sold.substring(0,5)] = 0;
            } 
            monthlySales[item.sold.substring(0,5)]++;
        }

        const {salesData, salesPerDay} = this.state;

        const totalSales = salesData.length;
        const totalRevenue = Object.values(salesData).reduce((acc, curValue) => (
            acc + Number(curValue.price)
        ), 0);

        const avgRevenue = (totalRevenue / Object.keys(salesPerDay).length).toFixed(0);
        const avgSales = (totalSales / Object.keys(salesPerDay).length).toFixed(0);    
         
        return (
            <section className="sales">
                <div className="sales__btn-container" ref={inputEl => this.inputElement = inputEl}>
                    <Button name="Jan" clicked={() => this.buttonHandler("01")} active={this.state.monthNum == "01"} />
                    <Button name="Feb" clicked={() => this.buttonHandler("02")} active={this.state.monthNum == "02"} />
                    <Button name="Mar" clicked={() => this.buttonHandler("03")} active={this.state.monthNum == "03"} />
                    <Button name="Quarter" clicked={() => {this.buttonHandler(0)}} active={!this.state.monthNum} />
                </div>

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

                <Product 
                    salesData={salesData} 
                    productData={this.props.product} 
                />
                <Vendor 
                    salesData={salesData}
                    vendorData={this.props.vendor} 
                />
            </section>
        );
    }
}

export default Sales;
