import React, {Component} from 'react';

import ProductDonut from '../Charts/ProductCharts/ProductDonut';
import ProductBar from  '../Charts/ProductCharts/ProductBar';
import Button from '../Button/Button';

import {countObjectKeys} from '../../shared';

class Product extends Component {

    state = {
        isDonut: true
    }

    changeChartHandler = () => this.setState({isDonut: !this.state.isDonut});
    
    render() {
        const salesData = this.props.salesData;
        const productCount = {total: 0};
        
        for (let item of salesData) {
            countObjectKeys(productCount, item.product_id, 1);
            productCount.total++;
        }

        var categoryCount = {}
        var total = 0;

        for (let item of this.props.productData) {
            let productQuantity = productCount[item.product_id];

            // if the product id is invalid it will make the productQuantity undefined and it will break all the data(adding undefined to a number make it undefined). so we need to eliminate the problematic data.
            if (productQuantity === undefined) {
                productQuantity = 0;
            }
            
            if (item.product_category1) {
                countObjectKeys(categoryCount ,item.product_category1.toLowerCase(), productQuantity);
                total += productQuantity;
            }
            if (item.product_category2) {
                countObjectKeys(categoryCount ,item.product_category2.toLowerCase(), productQuantity);
                total += productQuantity;
            }
            if (item.product_category3) {
                countObjectKeys(categoryCount ,item.product_category3.toLowerCase(), productQuantity);
                total += productQuantity;
            }
        }

        return (
            <div className="product">
                <Button 
                    name={`Change to ${this.state.isDonut ? "bar" : "donut"}`} 
                    clicked={this.changeChartHandler} 
                />
                {
                    this.state.isDonut
                    ? <ProductDonut categoryCount={categoryCount} total={total} />
                    : <ProductBar data={categoryCount} />
                }
                
                
            </div>
        )
    }


}

export default Product;
