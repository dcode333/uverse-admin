import { Grid, Box, Typography, Skeleton, Snackbar, Alert, CircularProgress, TextField, Chip, Autocomplete } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDistrict } from 'src/api/districts/usegetDistricts';
import { useAddBrandToDistrict } from 'src/api/districts/useCreateDistrict';
import { useAuth } from 'src/hooks/use-auth';
import FailedToFetch from 'src/components/fetchfail';
import { useDistrictBrand } from 'src/api/brand/usegetBrand';
import { filterExistingDistrictBrands } from 'src/utils/array-manipulation';
import DistrictBrands from './components/districtBrandCard'


const Info = ({ field, value }) => {
    return (<Box sx={{ display: 'flex', p: 1 }}>
        <Box sx={{ width: '50%', color: 'neutral.5000' }}>
            <Typography
                gutterBottom
                fontSize={'12px'}
                component="div">
                {field}
            </Typography>
        </Box >
        <Box sx={{ width: '50%', color: 'neutral.4000' }}>
            <Typography
                gutterBottom
                fontSize={'11px'}
                component="div">
                {value || 'N/A'}
            </Typography>
        </Box >
    </Box>)
}

function BadgeInfo({ districtId }) {
    const { authToken } = useAuth();
    const queryClient = useQueryClient();
    const [brandApprovalError, setBrandApprovalError] = useState(false);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const { mutateAsync, isPending } = useAddBrandToDistrict();
    const { data, isLoading, isError, refetch: refetchDistrict } = useDistrict({ token: authToken, districtId });
    const { data: districtBrands, isLoading: districtBrandsLoading, isSuccess: districtBrandsFetched } = useDistrictBrand({ token: authToken });

    const formik = useFormik({
        initialValues: {
            brands: '',
            submit: null
        },
        validationSchema: Yup.object({
            brands: Yup.array().min(1, 'Select at least one Brand').required('Select at least one Brand'),
        }),
        onSubmit: async (values, helpers) => {


            try {

                await mutateAsync({
                    token: authToken,
                    districtId,
                    brands: values.brands,
                });

                refetchDistrict()
                helpers.resetForm()

            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
            } finally {
                helpers.setSubmitting(false);
            }
        }
    });


    useEffect(() => {
        if (districtBrandsFetched)
            setFilteredBrands(filterExistingDistrictBrands(
                districtBrands,
                data?.brands?.map(item => item.id),
            ))
    }, [data?.brands, districtBrands, districtBrandsFetched])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setBrandApprovalError(false)
    };


    if (isError) return <FailedToFetch />

    return (
        <>
            <Grid container>

                <Grid item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
                        {isLoading ?
                            <Skeleton
                                variant="rectangular"
                                width={'100%'}
                                height={300}
                                sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                            <>
                                <Box sx={{ my: 2, p: 1, bgcolor: 'neutral.2000', borderRadius: 1 }}>

                                    <Typography variant='h6'
                                        m={1}
                                        color={'neutral.1000'}
                                    >
                                        District Information
                                    </Typography>
                                    <Info field={'Title'}
                                        value={data?.title} />
                                    <Info field={'Description'}
                                        value={data?.description} />
                                    <Info field={'Total Brands'}
                                        value={data?.brands?.length} />


                                    <Typography variant='h6'
                                        mx={1}
                                        my={3}
                                        color={'neutral.4000'}
                                    >
                                        Add Brands
                                    </Typography>
                                    <form
                                        noValidate
                                        onSubmit={formik.handleSubmit}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                                            <Autocomplete
                                                sx={{ flex: 0.9 }}
                                                multiple
                                                id='selectfield'
                                                options={filteredBrands || []}
                                                disabled={districtBrandsLoading}
                                                onBlur={formik.handleBlur}
                                                onChange={
                                                    (e, value) => {
                                                        formik.setFieldValue('brands', value.map(item => item.id))
                                                    }
                                                }
                                                getOptionLabel={(option) => option.label}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                // defaultValue={[{}]}
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props}
                                                        key={option.id}>
                                                        {option.label}
                                                    </li>
                                                )}
                                                filterSelectedOptions
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <Chip
                                                            key={index}
                                                            variant="outlined"
                                                            label={option.label}
                                                            sx={{ color: 'white', m: 0.5 }}
                                                        />
                                                    ))
                                                }

                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Brands"
                                                        placeholder=""
                                                        error={!!(formik.touched.brands && formik.errors.brands)}
                                                        helpertext={formik.touched.brands && formik.errors.brands}
                                                        name='brands'
                                                        inputProps={
                                                            { ...params.inputProps, style: { color: 'white' } }
                                                        }
                                                    />
                                                )}
                                            />
                                            <LoadingButton
                                                variant="contained"
                                                type='submit'
                                                loading={isPending || isLoading}
                                                size='medium'
                                                sx={{ borderRadius: 1, flex: 0.1, mx: 2 }}
                                                color="primary"
                                                loadingIndicator={
                                                    <CircularProgress
                                                        sx={{ color: 'neutral.1000' }}
                                                        size={30} />
                                                }
                                            // startIcon={<PlusCircleIcon height={24} />}

                                            >Add</LoadingButton>
                                        </Box>
                                    </form>
                                    <Typography
                                        color="error"
                                        variant="caption"
                                    >
                                        {formik.touched.brands && formik.errors.brands}
                                    </Typography>
                                    <Box sx={{ mb: 6 }} />
                                </Box>

                            </>}
                    </Box>
                </Grid>

                <Grid item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
                        {isLoading ?
                            <Skeleton
                                variant="rectangular"
                                width={'100%'}
                                height={300}
                                sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                            <>
                                <Box sx={{ my: 2, p: 1, bgcolor: 'neutral.2000', borderRadius: 1 }}>

                                    <Typography variant='h6'
                                        m={1}
                                        color={'neutral.1000'}
                                    >
                                        Brands Included
                                    </Typography>
                                    <DistrictBrands data={data?.brands} />
                                </Box>
                            </>}
                    </Box>
                </Grid>
            </Grid >
            <Snackbar open={brandApprovalError}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%' }}>
                    Something went wrong !
                </Alert>
            </Snackbar>
        </>
    )
}

export default BadgeInfo

const styles = {
    statsCard: { padding: '30px', mx: 2, textAlign: 'center', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.4000' },
    poststat: { padding: '10px', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.5000' },
    review: { display: 'flex', justifyContent: 'space-evenly' }
}   