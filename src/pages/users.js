import Head from 'next/head';
import { Box, Container } from '@mui/material';
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
        users | UVERSE
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
