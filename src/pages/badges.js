import React from 'react';
import Head from 'next/head';
import { Box, Container, Tab, Unstable_Grid2 as Grid, Typography, Paper, TextField, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Anylatics from '../sections/badges/Analytics'
import BadgeList from 'src/sections/badges/BadgeList';
import { useAuth } from 'src/hooks/use-auth';
import UploadBadge from 'src/sections/badges/UploadBadge';


const Page = () => {

    const [value, setValue] = React.useState('1');
    const { authToken } = useAuth();
    const handleTabChange = (val) => setValue(val);
    const handleChange = (event, newValue) => setValue(newValue);


    return <>
        <Head>
            <title>
                badges | UVRSE
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
                            <Tab label="Badge List"
                                value="1" />
                            <Tab label="Anylatics"
                                value="2" />
                            <Tab label="Create Badge"
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
                                    Badges
                                </Typography>
                            </Box>
                            <BadgeList
                                authToken={authToken}
                            />
                        </>
                    </TabPanel>
                    <TabPanel value="2">
                        <Anylatics />
                    </TabPanel>

                    <TabPanel value="3">
                        <UploadBadge
                            authToken={authToken}
                            handleTabChange={handleTabChange}
                        />
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
