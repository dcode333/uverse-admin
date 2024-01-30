import Head from 'next/head';
import { Box, Container, Tab, Unstable_Grid2 as Grid, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import Link from 'next/link';


const Page = () => {

  return <>
    <Head>
      <title>
        Home | UVRSE
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        backgroundImage: 'url(/assets/uvrsecover.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        // width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

      }}
    >
      <Grid
        container
        spacing={3}
        sx={{ width: '100%', height: '100%', justifyContent: 'center' }}
      >
        <Grid
          xs={12}
          sm={6}
          lg={5}
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        // backgroundColor="gray"
        >
          <Box sx={{
            pt: 4,
            px: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>

            <img
              alt=""
              src="/assets/uvrse.png"
              width="200"
              height="40"
              style={{ marginTop: '10px' }}
            />
            <Typography
              color="neutral.4000"
              variant="h6"
              letterSpacing={3}
              my={2}
            >
              Join Our Discord
            </Typography>
            <Typography
              color="neutral.4000"
              textAlign="center"
              fontSize={'12px'}
              px={8}
              letterSpacing={1}
            >
              Join our Discord community for exclusive
              insights and a chance to be a beta tester!
            </Typography>
            <img
              alt=""
              src="/assets/discord.png"
              width="70"
              height="70"
              style={{ marginTop: '10px' }}
            />
            <Typography
              color="neutral.4000"
              variant="h6"
              letterSpacing={1}
              my={2}
            >
              Join Our Newsletter
            </Typography>
            <TextField
              // value={formik.values.name}
              name="name"
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              // error={!!(formik.touched.name && formik.errors.name)}
              // helperText={formik.touched.name && formik.errors.name}
              type="text"
              placeholder='Enter your email'
              variant="outlined"
              fullWidth
              inputProps={{ style: { color: 'gray' } }}
              sx={{
                width: '60%',
                // height: '40px',
                borderRadius: '5px',
                backgroundColor: 'neutral.4000',

              }}
            >

            </TextField>
            <Button
              variant='contained'
              sx={{ borderRadius: 1, mt: 2, width: '60%' }}
              onClick={() => {
                //send mail to info@uvrse.io
                window.open('mailto:info@uvrse.io')
              }}
            >
              <Typography
                variant='caption'
              >
                Join Uvrse Newsletter
              </Typography>
            </Button>
            <Typography
              color="neutral.4000"
              variant="h5"
              letterSpacing={1}
              my={2}
            >
              Follow us
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Link href={'https://www.instagram.com/_uvrse'}
                target={'_blank'}
              >
                <img
                  alt=""
                  src="/assets/logos/insta.png"
                  width="50"
                  height="50"
                  style={{ margin: '4px', }}
                />
              </Link>
              <Link href={'https://www.facebook.com/uvrse.io'}
                target={'_blank'}>
                <img
                  alt=""
                  src="/assets/logos/fb.png"
                  width="50"
                  height="50"
                  style={{ margin: '4px', }}
                />
              </Link>
              <Link href={'https://www.youtube.com/channel/UCs1XAF1zpzlyC9RjA2zSEyA'}
                target={'_blank'}>
                <img
                  alt=""
                  src="/assets/logos/yt.png"
                  width="35"
                  height="35"
                  style={{ margin: '4px', }}
                />
              </Link>
              <Link href={'https://www.tiktok.com/@_uvrse'}
                target={'_blank'}>
                <img
                  alt=""
                  src="/assets/logos/tiktok.png"
                  width="50"
                  height="50"
                  style={{ margin: '4px', }}
                />
              </Link>
              <Link href={'https://twitter.com/_uvrse'}
                target={'_blank'}>
                <img
                  alt=""
                  src="/assets/logos/twitter.png"
                  width="35"
                  height="35"
                  style={{ margin: '4px', }}
                />
              </Link>
              <Link href={'https://www.threads.net/@_uvrse'}
                target={'_blank'}>
                <img
                  alt=""
                  src="/assets/logos/thread.png"
                  width="36"
                  height="36"
                  style={{ margin: '4px', }}
                />
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          lg={3.5}
        >
        </Grid>
        <Grid
          xs={12}
          sm={6}
          lg={3.5}
        >
        </Grid>


      </Grid>
    </Box>
  </>
};


export default Page;
