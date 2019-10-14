const colorSet = ['#F66D44', '#FEAE65', '#AADEA7', '#64C2A6', '#2D87BB', '#7982B9', '#A5C1DC', '#dedede'];

export const donutSettings = data => ({
    series: Object.values(data),
    options: {
        plotOptions: {
            pie: {
                customScale: 0.9,
                expandOnClick: false

            }
        },
        legend: {
            position: 'bottom',
            height: 100,
            offsetY: 30
        },
        colors: colorSet,
        labels: Object.keys(data),
        dataLabels: {
            style: {
                fontSize: "15px",
                fontFamily: "var(--font-main)",
                fontWeight: "400",
                colors: ["var(--color-text)"]
            },
            dropShadow: {
                enabled: false
            }
        }
    }
});

export const barSettings = (data, isHorizontal, seriesDescription) => ({
    options: {
        chart: {
            background: 'whitesmoke',
            foreColor: '#333'
        },
        xaxis: { // it disable the buttons for zooming 
            categories: Object.keys(data)
        },
        plotOptions: {
            bar: {
                horizontal: isHorizontal
            } 
        },
        fill: {
            colors: ['#3498db']
        },
        dataLabels: {
            enabled: false
        }
    },
    series: [{
        name: seriesDescription,
        data: Object.values(data)
    }]
});

