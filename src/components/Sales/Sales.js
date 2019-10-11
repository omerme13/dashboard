import React, {Component} from 'react';

import SalesLine from '../Charts/SalesLine/SalesLine';
import SalesDonut from '../Charts/SalesDonut/SalesDonut';
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
            } 
            salesPerDay[item.sold.substring(0,5)]++;
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
         
        const productCount = {total: 0};
        for (let item of salesData) {
            if (isNaN(productCount[item.product_id])) {
                productCount[item.product_id] = 0;
            } 
            productCount[item.product_id]++;
            productCount.total++;
        }

        var categoryCount = {}

        for (let item of this.props.product) {
            let productQuantity = productCount[item.product_id];

            // if the product id is invalid it will make the productQuantity undefined and it will break all the data(adding undefined to a number make it undefined). so we need to eliminate the problematic data.
            if (productQuantity === undefined) {
                productQuantity = 0;
            }
            
            if (item.product_category1) {
                if(isNaN(categoryCount[item.product_category1.toLowerCase()])) {
                    categoryCount[item.product_category1.toLowerCase()] = 0;
                }
                categoryCount[item.product_category1.toLowerCase()] += productQuantity;
            }
            if (item.product_category2) {
                if(isNaN(categoryCount[item.product_category2.toLowerCase()])) {
                    categoryCount[item.product_category2.toLowerCase()] = 0;
                }
                categoryCount[item.product_category2.toLowerCase()] += productQuantity;
            }
            if (item.product_category3) {
                if(isNaN(categoryCount[item.product_category3.toLowerCase()])) {
                    categoryCount[item.product_category3.toLowerCase()] = 0;
                }
                categoryCount[item.product_category3.toLowerCase()] += productQuantity;
            }
        }
        
        let donut = null;
        if (this.state.salesPerDay) {  // if the state has been updated assign the component to the variable. 
            donut = <SalesDonut categoryCount={categoryCount} />; 
        }
        
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
                {donut}
            </section>
        );
    }
}

export default Sales;
