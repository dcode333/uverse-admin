import Head from 'next/head';
import { Box, Container, Tab, Tabs, Unstable_Grid2 as Grid } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ProfileInformation from '../sections/user/profileinfo'
import Badges from '../sections/user/badges'
import Anylatics from '../sections/user/Anylatics'

import React from 'react';

const now = new Date();

const Page = () => {

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <>
        <Head>
            <title>
                User-stats | UVERSE
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                backgroundColor: 'neutral.3000',
            }}
        >
            <Container maxWidth="xl">

                <TabContext value={value}>
                    <Box sx={{ borderBottom: 2, borderColor: 'neutral.2000' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: 'neutral.3000',
                                    width: '50px',
                                }
                            }}
                        >
                            <Tab label="Profile Information" value="1" />
                            <Tab label="Badges" value="2" />
                            <Tab label="Anylatics" value="3" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <ProfileInformation />
                    </TabPanel>

                    <TabPanel value="2">
                        <Badges />
                    </TabPanel>
                    <TabPanel value="3">
                        <Anylatics />
                    </TabPanel>
                </TabContext>

            </Container>
        </Box>
    </>
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
