import React from 'react';

import Bar from '../Charts/VendorBar/VendorBar';
import {countObjectKeys} from '../../shared';

const vendor = props => {
    const vendorLocation = {};
    const locationCount = {};

    for (let vendor of props.vendorData) {
        vendorLocation[vendor.vendor_name] = vendor.vendor_country;
    }

    for (let item of props.salesData) {
        countObjectKeys(locationCount, vendorLocation[item.vendor], 1);
    }

    let bar = null;
    if (Object.keys(locationCount).length) { // if the object is not empty
        bar = <Bar data={locationCount} />
    }

    return (
        <>
            {bar}
        </>
    );
}

export default vendor;