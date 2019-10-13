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
            sales = (
                <Sales 
                    data={this.state.sales} 
                    product={this.state.product}
                    vendor={this.state.vendor}
                    customers={this.state.customers}
                />
            ) 
        } 

        return (
            <div className="app">{sales}</div>
        );
    }
}

export default App;
