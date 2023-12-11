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
    [4, 30],
    [5, 9],
    [6, 0],
    [7, 20],
    [8, 17],
    [9, 9],
    [10, 10],
    [11, 24],
    [12, 40],
    [13, 9],
    [14, 14],
    [15, 10],
    [16, 32],
    [17, 0],
    [18, 10]
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
            color: 'red', // Change line color here
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
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                User Engagement
            </Typography>
            <Chart
                chartType="LineChart"
                width="100%"
                height="200px"
                data={data}
                options={options}
            />
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Top Trending
            </Typography>

            <TabContext value={value} >
                <Box sx={{ borderBottom: 2, borderColor: 'neutral.2000' }}>
                    <TabList
                        variant="scrollable"
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: 'green',
                                width: '30px',
                            }
                        }}

                    >
                        <Tab label="Creations" value="1" />
                        <Tab label="3d" value="2" />
                        <Tab label="Videos" value="3" />
                        <Tab label="Images" value="4" />
                        <Tab label="Text-Links" value="5" />
                        <Tab label="Check-ins" value="6" />

                    </TabList>
                </Box>

                <TabPanel value="1">
                    <TrendingUsers data={trendingData} />
                </TabPanel>

                <TabPanel value="2">
                    <TrendingUsers data={trendingData} />
                </TabPanel>
                <TabPanel value="3">
                    <TrendingUsers data={trendingData} />
                </TabPanel>
                <TabPanel value="4">
                    <TrendingUsers data={trendingData} />
                </TabPanel>
                <TabPanel value="5">
                    <TrendingUsers data={trendingData} />
                </TabPanel>
                <TabPanel value="6">
                    <TrendingUsers data={trendingData} />
                </TabPanel>
            </TabContext>

        </Container>
    );
}

export default Anylatics;   
