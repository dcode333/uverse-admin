import Head from 'next/head';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';

const Page = () => (
  <>
    <Head>
      <title>
        Nothing to show | UVRSE
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '80%',
        bgcolor:'neutral.3000'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            <img
              alt="Under development"
              src="/assets/errors/error-404.png"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 300
              }}
            />
          </Box>
          <Typography
            align="center"
            sx={{ mb: 3,color:'neutral.5000' }}
            variant="h5"
          >
            Nothing to show right now. Try again later !
          </Typography>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
