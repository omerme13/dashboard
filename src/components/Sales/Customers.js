import React from 'react';

import CustomersGenderDonut from '../Charts/CustomersDonuts/CustomersGenderDonut';
import CustomersOSDonut from '../Charts/CustomersDonuts/CustomersOSDonut';

import {countObjectKeys} from '../../shared';

const customers = props => {
    const customersCount = {};
    const customersGender = {};
    const customersOS = {};

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
    }

    return (
        <>
            <CustomersGenderDonut 
                customersGender={customersGender} 
            />
            <CustomersOSDonut 
                customersOS={customersOS}
            />
        </>
    );
}

export default customers;