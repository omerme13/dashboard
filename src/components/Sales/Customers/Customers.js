import React from "react";

import CustomersDonut from "../../Charts/CustomersDonut";
import InfoBox from "../../InfoBox/InfoBox";

import { countObjectKeys } from "../../../shared";

import "./Customers.scss";

const customers = props => {
    const customersCount = {};
    const customersGender = {};
    const customersOS = {};
    const customersCampaign = {};
    const customersCreationDates = {};
    const customersCountNew = {};

    for (let item of props.salesData) {
        countObjectKeys(customersCount, item.customer_id, 1);
    }

    for (let item of props.customersData) {
        let customerFrequency = customersCount[item.customer_id];

        // if the customer id is invalid it will make the customerFrequency undefined and it will break all the data(adding undefined to a number make it undefined). so we need to eliminate the problematic data.
        if (customerFrequency === undefined) {
            customerFrequency = 0;
        }

        countObjectKeys(customersGender, item.gender, customerFrequency);
        countObjectKeys(customersOS, item.operation_system, customerFrequency);
        countObjectKeys(customersCampaign, item.campaign, customerFrequency);

        if (item.agg_sales_performed 
            && item.created_on.split(' ')[0].split('/')[2] === '2016') {
                customersCreationDates[item.customer_id] = item.created_on.split(' ')[0].split('/');
        }
    }

    for (let id in customersCreationDates) {
        countObjectKeys(customersCountNew, customersCreationDates[id][0], 1)
    }

    for (let key in customersCountNew) {
        if (isNaN(customersCountNew[0])) {
            customersCountNew[0] = 0;
        }
        customersCountNew[0] += customersCountNew[key];
    }

    const numOfCustomers = customersCountNew[props.monthNumber];
    const prevNumOfCustomers = customersCountNew["0" + (Number(props.monthNumber) - 1)];

    return (
        <div className="customers">
            <InfoBox 
                value={numOfCustomers} 
                prevValue={prevNumOfCustomers} 
                title="New Customers" />
            <CustomersDonut
                title="products sold by user's gender"
                class="gender"
                customersData={customersGender}
            />
            <CustomersDonut
                title="the OS used To buy products"
                class="os"
                customersData={customersOS}
            />
            <CustomersDonut
                title="how the users found the product"
                class="campaign"
                customersData={customersCampaign}
            />
        </div>
    );
};

export default customers;
