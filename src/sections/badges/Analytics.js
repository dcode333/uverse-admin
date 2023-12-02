import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Tab, Typography } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";
import TrendingUsers from "./components/trendingTable";

const data = [
    ["Day", "The Avengers"],
    [1, 0],
    [2, 20],
    [3, 10],
    [4, 60],
    [5, 9],
    [6, 0],
    [7, 40],
    [8, 57],
    [9, 9],
    [10, 60],
    [11, 34],
    [12, 40],
    [13, 9],
    [14, 34],
    [15, 10],
    [16, 42],
    [17, 20],
    [18, 5]
];
const options = {
    chartArea: {
        backgroundColor: 'transparent'
    },
    backgroundColor: 'transparent',
    legend: 'none',
    hAxis: {
        gridlines: {
            color: 'transparent' // Hide horizontal gridlines
        },
    },
    vAxis: {
        gridlines: {
            color: 'transparent' // Hide vertical gridlines
        },
    },
    series: {
        0: { // Index of the series (first series in this case)
            color: 'green', // Change line color here
        },
    },

};


const trendingData = [
    {
        img: '/assets/avatars/avatar.png',
        title: 'MoonBlash 241 | Neptune',
        type: 'Organic',
        userEngagement: '12',
    },
    {
        img: '/assets/avatars/avatar.png',
        title: 'MoonBlash 241 | Neptune',
        type: 'Organic',
        userEngagement: '12',
    },
    {
        img: '/assets/avatars/avatar.png',
        title: 'MoonBlash 241 | Neptune',
        type: 'Organic',
        userEngagement: '12',
    },
    {
        img: '/assets/avatars/avatar.png',
        title: 'MoonBlash 241 | Neptune',
        type: 'Organic',
        userEngagement: '12',
    },
    {
        img: '/assets/avatars/avatar.png',
        title: 'MoonBlash 241 | Neptune',
        type: 'Organic',
        userEngagement: '12',
    },
]


function Anylatics() {

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ color: 'neutral.4000' }}>
            <Typography variant="subtitle2"
                sx={{ mb: 1 }}>
                Badge Distribution Metrics
            </Typography>
            <Chart
                chartType="LineChart"
                width="100%"
                height="200px"
                data={data}
                options={options}
            />
            <Typography variant="subtitle2"
                sx={{ mb: 3 }}>
                Trending Badges
            </Typography>
            <TrendingUsers data={trendingData} />

        </Container>
    );
}

export default Anylatics;   
