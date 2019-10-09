import React, { Component } from "react";

import Bar from './Charts/Bar/Bar';
import Donut from './Charts/Donut/Donut';
import Sales from './Sales/Sales';

import './App.scss';

class App extends Component {
    state = {
        sales: '', 
        product: '', 
        customers: '', 
        vendor: ''
    }
    
    getData = async () => {
        try {
            let [sales, product, customers, vendor] = await Promise.all([
                fetch("data/sales.json"),
                fetch("data/product.json"),
                fetch("data/customers.json"),
                fetch("data/vendor.json"),
            ]);
            this.setState({
                sales: await sales.json(),
                product: await product.json(),
                customers: await customers.json(),
                vendor: await vendor.json()
            });
        }
        catch(err) {
            console.log(err);
        };
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        let bar = null;
        let donut = null;
        let sales = null;

        if (this.state.customers) {
            var barData = {
                male: 0,
                female: 0,
                unknown: 0
            } 

            var donutData = {
                categories: {
                    books: 0,
                    cinema: 0,
                    diy: 0,
                    home: 0,
                    leisure: 0,
                    electronics: 0,
                    kids: 0,
                    food: 0,
                    sports: 0,
                    jewelry: 0,
                    vouchers: 0, 
                    supermarket: 0,
                    pharmacy: 0,
                    fashion: 0
                },
                total: this.state.product.length
            }

            for (let item of this.state.customers) {
                if (item.gender === '0') {
                    barData.unknown++;
                } else {
                    barData[item.gender]++;
                }    
            }

            for (let item of this.state.product) {
                if (item.product_category1) {
                    donutData.categories[item.product_category1.toLowerCase()]++;
                }
                if (item.product_category2) {
                    donutData.categories[item.product_category2.toLowerCase()]++;
                }
                if (item.product_category3) {
                    donutData.categories[item.product_category3.toLowerCase()]++;
                }
            }

            bar = <Bar data={barData} name="amount" />
            donut = <Donut data={donutData} />
            sales = <Sales data={this.state.sales} categories={donutData} />
        } 
        
        return (
            <div className="app">
                {sales}
                {bar}
                {donut}
            </div>
        );
    }
}

export default App;
