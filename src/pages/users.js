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
