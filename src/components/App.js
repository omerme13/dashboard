import React, { Component } from "react";

import Pie from './Pie/Pie';
import Bar from './Bar/Bar';

import './App.css';

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
            console.log(this.state)
        }
        catch(err) {
            console.log(err);
        };
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className="App">
                <Pie />
                <Bar />
            </div>
        );
    }
}

export default App;
