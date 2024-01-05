import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container, Tab, Tabs, Unstable_Grid2 as Grid } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ProfileInformation from '../../../sections/user/profileinfo'
import Badges from '../../../sections/user/badges'
import Anylatics from '../../../sections/user/Anylatics'
import Feed from '../../../sections/user/Feed'
import React from 'react';


const Page = () => {

    const { query: { user } } = useRouter()

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <>
        <Head>
            <title>
                user-stats | UVRSE
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
                            <Tab label="Profile Information"
                                value="1" />
                            <Tab label="Badges"
                                value="2" />
                            <Tab label="Anylatics"
                                value="3" />
                            <Tab label="Feed"
                                value="4" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <ProfileInformation userId={user} />
                    </TabPanel>

                    <TabPanel value="2">
                        <Badges userId={user} />
                    </TabPanel>
                    <TabPanel value="3">
                        <Anylatics />
                    </TabPanel>

                    <TabPanel value="4">
                        <Feed />
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
