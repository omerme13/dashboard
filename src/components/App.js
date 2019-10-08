import React, { Component } from "react";

import Bar from './Bar/Bar';
import Donut from './Donut/Donut';
import Line from './Line/Line';

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
                fetch("sales.json"),
                fetch("product.json"),
                fetch("customers.json"),
                fetch("vendor.json"),
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
        let line = null;

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

            const monthlySales = {};
            const monthlySalesByCategory = {
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
            };

            for (let item of this.state.sales) {
                var test = item.id;
                if (isNaN(monthlySales[item.sold.split('/')[0]])) {
                    monthlySales[item.sold.split('/')[0]] = 0;
                    monthlySales[item.sold.split('/')[0]]++;
                } else {
                    monthlySales[item.sold.split('/')[0]]++;

                }
            }

            var lineData = {
                totalSales: this.state.sales.length,
                totalRevenue: this.state.sales.reduce((acc, curValue) => (
                    acc + Number(curValue.price)
                ), 0),
                dates: this.state.sales.map(item => item.sold.split(' ')[0]),
                prices: this.state.sales.map(item => item.price),
                monthlySales,
                salesByCategory: donutData.categories
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
            line = <Line data={lineData} isMonth />


            console.log(monthlySales)
            console.log(monthlySalesByCategory)
            console.log(test)
            
        } 
        
        return (
            <div className="App">
                {line}
                {bar}
                {donut}
            </div>
        );
    }
}

export default App;
