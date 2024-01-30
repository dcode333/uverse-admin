import Head from 'next/head';
import { Box, Container, Tab, Unstable_Grid2 as Grid } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Library from 'src/sections/library3d/Library'
import TrendingUsers from '../sections/overview/trendingUsers'
import Analytics from '../sections/user/Anylatics'
import { useAuth } from 'src/hooks/use-auth';
import React from 'react';


const Page = () => {

  const [value, setValue] = React.useState('1');
  const { authToken } = useAuth();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <>
    <Head>
      <title>
        UVRSE
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
              <Tab label="Featured 3D Asset"
                value="1" />
              <Tab label="Trending Users"
                value="2" />
              <Tab label="Recent Activity"
                value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">

            <Library
              authToken={authToken}
            />

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
          <TabPanel value="3">
            <Analytics />
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
