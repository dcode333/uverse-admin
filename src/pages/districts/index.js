import React from 'react';
import Head from 'next/head';
import { Box, Container, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Districtlist from 'src/sections/districts/districtlist';
import { useAuth } from 'src/hooks/use-auth';
import UploadDistrict from 'src/sections/districts/UploadDistrict';


const Page = () => {

    const [value, setValue] = React.useState('1');
    const { authToken } = useAuth();
    const handleTabChange = (val) => setValue(val);
    const handleChange = (event, newValue) => setValue(newValue);

    return <>
        <Head>
            <title>
                districts | UVRSE
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
                            <Tab label="Districts"
                                value="1" />
                            <Tab label="Create District"
                                value="2" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <>
                            <Box
                                sx={{ display: 'flex' }}>
                                <Typography variant="subtitle1"
                                    sx={{ textAlign: 'start', my: 2 }}
                                    color="neutral.4000"
                                >
                                    Districts
                                </Typography>
                            </Box>
                            <Districtlist authToken={authToken} />
                        </>
                    </TabPanel>

                    <TabPanel value="2">
                        <UploadDistrict
                            authToken={authToken}
                            handleTabChange={handleTabChange}
                        />
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
