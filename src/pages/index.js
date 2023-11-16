import Head from 'next/head';
import { Box, Container, Tab, Tabs, Unstable_Grid2 as Grid } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import FeaturedAssets from '../sections/overview/featuredAssets'
import TrendingUsers from '../sections/overview/trendingUsers'
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
        Home | UVERSE
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
                  width: '80px',
                }
              }}
            >
              <Tab label="Featured 3D Asset" value="1" />
              <Tab label="Trending Users" value="2" />
              <Tab label="Recent Activity" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <FeaturedAssets items={[
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
          </TabPanel>
          <TabPanel value="2">
            <TrendingUsers data={[
              {
                userName: 'Roselinda',
                badges: 3,
                creations: 10,
                checkIns: 5,
                archieved: 0,
                reposts: 10,
                img: '/assets/avatars/avatar.png'
              },
              {
                userName: 'Roselinda',
                badges: 5,
                creations: 15,
                checkIns: 7,
                archieved: 0,
                reposts: 10,
                img: '/assets/avatars/avatar.png'

              },
              {
                userName: 'Roselinda',
                badges: 5,
                creations: 15,
                checkIns: 7,
                archieved: 0,
                reposts: 10,
                img: '/assets/avatars/avatar.png'

              },
              {
                userName: 'Roselinda',
                badges: 5,
                creations: 15,
                checkIns: 7,
                archieved: 0,
                reposts: 10,
                img: '/assets/avatars/avatar.png'

              },
              {
                userName: 'Roselinda',
                badges: 5,
                creations: 15,
                checkIns: 7,
                archieved: 0,
                reposts: 10,
                img: '/assets/avatars/avatar.png'

              },
              {
                userName: 'Roselinda',
                badges: 5,
                creations: 15,
                checkIns: 7,
                archieved: 0,
                reposts: 10,
                img: '/assets/avatars/avatar.png'

              },
              {
                userName: 'Roselinda',
                badges: 5,
                creations: 15,
                checkIns: 7,
                archieved: 0,
                reposts: 10,
                img: '/assets/avatars/avatar.png'

              },
            ]} />
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>

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
