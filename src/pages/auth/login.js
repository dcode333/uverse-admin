import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import {
  Box,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';
import { useAuthContext } from 'src/contexts/auth-context';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useLogin } from 'src/api/auth/useLogin';
import { useRefresh } from 'src/api/auth/useRefresh';


const Page = () => {
  const router = useRouter();
  const { isPending, mutateAsync, isSuccess, reset } = useLogin();
  const { isPending: refreshPending } = useRefresh();
  const [method, setMethod] = useState('email');
  const auth = useAuth();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) router.replace('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = await mutateAsync({ email: values.email, password: values.password });
        values.submit = null;
        await auth.signIn(data);
        router.replace('/');
      } catch (err) {
        reset();
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
      } finally {
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );


  return (
    <>
      <Head>
        <title>
          Login | UVRSE
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paoer',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '50px',
            width: '100%'
          }}
        >
          <div>
            <Box
              spacing={1}
              sx={{ mb: 3, textAlign: 'center' }}
            >
              <Box sx={{ p: 2, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <img
                  alt=""
                  src="/assets/logos/sublogoblack.png"
                  height={'40px'}

                />
                {/* <img
              alt=""
              src="/assets/logos/sublogo.png"
              width="200"
              height="30"
              style={{ marginTop: '10px' }}
            /> */}

              </Box>

              <Typography variant="h4" >
                Join the testing Community Today !
              </Typography>
              {/* <Typography
                color="textSecondary"
                variant="body2"
              >
                Sign in to your account to continue
              </Typography> */}
            </Box>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Login with Email"
                value="email"
              />
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <LoadingButton
                  fullWidth
                  size="large"
                  sx={{ mt: 3, bgcolor: 'neutral.1000', borderRadius: 1 / 2 }}
                  type="submit"
                  variant="contained"
                  loading={isPending || refreshPending || isSuccess}

                >
                  Sign In
                </LoadingButton>
              </form>
            )}

          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
