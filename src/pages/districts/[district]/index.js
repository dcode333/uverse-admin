import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import DistrictInformation from '../../../sections/districts/districtinfo'
import React from 'react';


const Page = () => {

    const { query: { district } } = useRouter()

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <>
        <Head>
            <title>
                district-info | UVRSE
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
                            <Tab label="District Information"
                                value="1" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <DistrictInformation districtId={district} />
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
