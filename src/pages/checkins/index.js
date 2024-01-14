import React from 'react';
import Head from 'next/head';
import { Box, Container, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Anylatics from '../../sections/checkIn/Analytics'
import CheckIns from 'src/sections/checkIn/CheckIn';
import { useAuth } from 'src/hooks/use-auth';
import UploadCheckIn from 'src/sections/checkIn/UploadCheckIn';


const Page = () => {

    const [value, setValue] = React.useState('1');
    const { authToken } = useAuth();
    const handleTabChange = (val) => setValue(val);
    const handleChange = (event, newValue) => setValue(newValue);

    return <>
        <Head>
            <title>
                checkins | UVRSE
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
                            <Tab label="Check-ins List"
                                value="1" />
                            <Tab label="Anylatics"
                                value="2" />
                            <Tab label="Create Check-Ins"
                                value="3" />
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
                                    Check-Ins
                                </Typography>
                            </Box>
                            <CheckIns authToken={authToken} />
                        </>
                    </TabPanel>
                    <TabPanel value="2">
                        <Anylatics />
                    </TabPanel>

                    <TabPanel value="3">
                        <UploadCheckIn
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
