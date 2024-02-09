import React from 'react';
import Head from 'next/head';
import { Box, Container, Tab, Unstable_Grid2 as Grid, Typography, TextField, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import BrandRequests from 'src/sections/brands/brandRequests'
import ApprovedBrands from 'src/sections/brands/approvedBrands'
import { useAuth } from 'src/hooks/use-auth';


const Page = () => {

    const [value, setValue] = React.useState('1');
    const { authToken } = useAuth();
    // const handleTabChange = (val) => setValue(val);
    const handleChange = (event, newValue) => setValue(newValue);

    return <>
        <Head>
            <title>
                brands | UVRSE
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
                            <Tab label="Brand Requests"
                                value="1" />
                            <Tab label="Approved Brands"
                                value="2" />

                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <BrandRequests authToken={authToken} />
                    </TabPanel>
                    <TabPanel value="2">
                        <ApprovedBrands authToken={authToken} />
                    </TabPanel>
                </TabContext>

            </Container>
        </Box >
    </>
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;