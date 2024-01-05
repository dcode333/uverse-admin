import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import UserList from '../../sections/user/userslist'
import { useAuth } from 'src/hooks/use-auth';
import { useUsers } from 'src/api/users/useUsers';
import Skeleton from '../../components/skeleton'
import FailedToFetch from '../../components/fetchfail'

const Page = () => {

  const { authToken } = useAuth();
  const { data, isLoading, isError } = useUsers(authToken);


  if (isLoading) return <Skeleton />
  if (isError) return <FailedToFetch />


  return <>
    <Head>
      <title>
        users | UVRSE
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
        <UserList data={data?.results} />
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
