import Head from 'next/head';
import { Box, Container, Tab, Tabs, Unstable_Grid2 as Grid } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import UserList from '../sections/user/userslist'
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
        Users | UVERSE
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
              <Tab label="Users" value="1" />
              <Tab label="Profile Information" value="2" />
              <Tab label="Badges" value="3" />
              <Tab label="Anylatics" value="4" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <UserList data={[
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,
              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,
              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,
              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,
              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,
              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,
              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,
              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,
              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,
              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,


              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10,


              },
              {
                userName: 'Hellanora',
                img: '/assets/avatars/avatarmed.png',
                likes: 10,
                comments: 10,
                shares: 10
              },
              // Add more objects as needed
            ]} />
          </TabPanel>
          <TabPanel value="2">
          </TabPanel>
          <TabPanel value="3">
          </TabPanel>
          <TabPanel value="4">
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
