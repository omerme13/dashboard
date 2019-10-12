import React, {Component} from 'react';

import SalesDonut from '../Charts/SalesDonut/SalesDonut';

const Product = props => {
        const salesData = props.salesData;
        const productCount = {total: 0};
        
        for (let item of salesData) {
            if (isNaN(productCount[item.product_id])) {
                productCount[item.product_id] = 0;
            } 
            productCount[item.product_id]++;
            productCount.total++;
        }

        var categoryCount = {}
        var total = 0;

        for (let item of props.productData) {
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
                total += productQuantity;
            }
            if (item.product_category2) {
                if(isNaN(categoryCount[item.product_category2.toLowerCase()])) {
                    categoryCount[item.product_category2.toLowerCase()] = 0;
                }
                categoryCount[item.product_category2.toLowerCase()] += productQuantity;
                total += productQuantity;

            }
            if (item.product_category3) {
                if(isNaN(categoryCount[item.product_category3.toLowerCase()])) {
                    categoryCount[item.product_category3.toLowerCase()] = 0;
                }
                categoryCount[item.product_category3.toLowerCase()] += productQuantity;
                total += productQuantity;

            }
        }

        return (
            <SalesDonut categoryCount={categoryCount} total={total} />
        )

}

export default Product;
