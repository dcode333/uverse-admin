import Head from 'next/head';
import { Box, Container, Tab, Tabs, Unstable_Grid2 as Grid } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
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
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Featured 3D Asset" value="1" />
              <Tab label="Trending Users" value="2" />
              <Tab label="Recent Activity" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <h4>Featured 3D Asset</h4>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
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
