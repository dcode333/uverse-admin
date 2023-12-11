import React from 'react';
import Head from 'next/head';
import { Box, Container, Tab, Unstable_Grid2 as Grid, Typography, Paper, TextField, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Anylatics from '../sections/badges/Analytics'
import BadgeList from 'src/sections/badges/BadgeList';
import UserPlusIcon from '@heroicons/react/24/outline/PaperClipIcon';

const now = new Date();

const Page = () => {

    const [value, setValue] = React.useState('1');

    const [alignment, setAlignment] = React.useState('1');

    const handleSwitchChange = (event, newAlignment) => {
        setAlignment(alignment === '1' ? '2' : '1');
    };
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
                            <Tab label="Attach Drops"
                                value="1" />
                            <Tab label="General Notification"
                                value="2" />
                            <Tab label="Choose Recipients"
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
                                {/* <Box width={'40'}>

                                    <ToggleButtonGroup
                                        color="primary"
                                        sx={{ justifySelf: 'center', height: '40px' }}
                                        value={alignment}
                                        onChange={handleSwitchChange}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton  value="1">All Check Ins</ToggleButton>
                                        <ToggleButton value="2">User specific</ToggleButton>
                                    </ToggleButtonGroup>
                                </Box> */}
                            </Box>
                            <BadgeList
                                items={[
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                    {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    }, {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    }, {
                                        title: "UVRSE Carlost",
                                        description: 'Neptune Work'
                                    },
                                ]} />
                        </>
                    </TabPanel>
                    <TabPanel value="3">
                        {/* <Anylatics /> */}
                    </TabPanel>

                    <TabPanel value="2">
                        <Grid container
                            spacing={3}>
                            <Grid item
                                xs={12}
                                sm={6}
                                lg={12}>
                                <TextField
                                    id="title-input"
                                    label="Title"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="filled"
                                    fullWidth
                                    sx={{ mb: 6 }}
                                    inputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item
                                xs={12}
                                sm={6}
                                lg={12}>
                                <TextField
                                    id="audience-input"
                                    label="Audience"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="filled"
                                    fullWidth
                                    sx={{ mb: 6 }}
                                    inputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            sx={{ color: 'white', bgcolor: 'neutral.2000', px: 4 }}
                            variant="contained">Save</Button>
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
