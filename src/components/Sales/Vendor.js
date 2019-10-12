import React from 'react';

import Bar from '../Charts/VendorBar/VendorBar';

const vendor = props => {
    const vendorLocation = {};
    const locationCount = {};

    for (let vendor of props.vendorData) {
        vendorLocation[vendor.vendor_name] = vendor.vendor_country;
    }

    for (let item of props.salesData) {
        if (isNaN(locationCount[vendorLocation[item.vendor]])) {
            locationCount[vendorLocation[item.vendor]] = 0;
        }
        locationCount[vendorLocation[item.vendor]]++;
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