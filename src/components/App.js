import React, { Component } from "react";

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
        let sales = null;

        if (this.state.customers) {

            var categoryCount = {
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

            sales = (
                <Sales 
                    data={this.state.sales} 
                    categories={categoryCount} 
                    product={this.state.product}
                    vendor={this.state.vendor}
                />
            ) 
        } 

        return (
            <div className="app">
                {sales}
            </div>
        );
    }
}

export default App;
