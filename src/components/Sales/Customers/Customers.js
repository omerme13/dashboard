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
    }

    return (
        <div className="customers">
            <InfoBox value={5000} prevValue={2000} title="New Customers" />
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
