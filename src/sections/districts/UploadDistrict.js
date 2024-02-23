import {
    Unstable_Grid2 as Grid,
    Typography,
    TextField,
    Snackbar,
    Alert,
    CircularProgress,
    Autocomplete,
    Chip,
    Box,
    InputAdornment,
    Button
} from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import LoadingButton from '@mui/lab/LoadingButton';

import { useDistrictBrand } from 'src/api/brand/usegetBrand';
import { useUploadDistrict } from 'src/api/districts/useCreateDistrict';
import { uploadDistrictSchema } from 'src/schemas/districts/district';



//Media placeholder overlapped by border -pending

function UploadLibrary(props) {

    const queryClient = useQueryClient();
    const { authToken, handleTabChange } = props;
    const { data, isLoading } = useDistrictBrand({ token: authToken });
    const { mutateAsync, isPending } = useUploadDistrict();
    const [postSuccess, setPostSuccess] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setPostSuccess(false);
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            brands: '',
            media: '',
            submit: null
        },
        validationSchema: uploadDistrictSchema,
        onSubmit: async (values, helpers) => {


            try {

                await mutateAsync({
                    token: authToken,
                    title: values.title,
                    description: values.description,
                    brands: values.brands,
                    media: values.media
                });

                queryClient.removeQueries({ queryKey: ['districts'], exact: true });
                // // helpers.resetForm();
                setPostSuccess(true)
                handleTabChange('1')

            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
            } finally {
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <>
            <form
                noValidate
                onSubmit={formik.handleSubmit}>
                <Grid container
                    spacing={3}>
                    <Grid item
                        xs={12}
                        sm={6}
                        lg={4}
                    >
                        <TextField
                            label="Description"
                            value={formik.values.description}
                            name="description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.description && formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            type="text"
                            multiline
                            rows={6}
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
                        />


                    </Grid>
                    <Grid item
                        xs={12}
                        sm={6}
                        lg={4}>

                        <TextField
                            label="Title"
                            value={formik.values.title}
                            name="title"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.title && formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            type="text"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            id="title-input"
                            error={!!(formik.touched.media && formik.errors.media)}
                            helperText={formik.touched.media && formik.errors.media}
                            name="media"
                            onBlur={formik.handleBlur}
                            onChange={(event) => {

                                const existingImages = formik.values.media || []
                                const newimgs = Object.values(event.target.files)
                                formik.setFieldValue('media', [...existingImages, ...newimgs])

                            }}
                            type="file"
                            label="Media"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{
                                style: { color: 'white' }, accept: 'image/*', multiple: true,

                            }}

                            InputProps={{
                                endAdornment: <InputAdornment position='end' >
                                    <Button
                                        onClick={() => formik.setFieldValue('media', '')}
                                        sx={{ color: 'neutral.5000' }}>
                                        Clear
                                    </Button>
                                </InputAdornment>,
                                startAdornment: <InputAdornment position='start' >
                                    <Typography variant='body2'
                                        mr={2}>
                                        {formik.values.media?.length || 0} Images
                                    </Typography>
                                </InputAdornment>

                            }}
                            InputLabelProps={{ shrink: true, }}
                        />

                    </Grid>

                    <Grid item
                        xs={12}
                        sm={6}
                        lg={4}>


                        <Autocomplete
                            multiple
                            id='selectfield'
                            options={data || []}
                            disabled={isLoading}
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
                        <Typography
                            color="error"
                            variant="caption"
                        >
                            {formik.touched.brands && formik.errors.brands}
                        </Typography>
                        <Box sx={{ mb: 6 }} />


                    </Grid>

                </Grid>
                {formik.errors.submit && (
                    <Typography
                        color="error"
                        sx={{ my: 3 }}
                        variant="body2"
                    >
                        {formik.errors.submit}
                    </Typography>
                )}
                <LoadingButton
                    type="submit"
                    sx={{ color: 'white', bgcolor: 'neutral.2000', px: 4 }}
                    variant="contained"
                    loadingIndicator={
                        <CircularProgress
                            sx={{ color: 'neutral.1000' }}
                            size={30} />
                    }
                    loading={isPending || isLoading}
                >
                    CREATE
                </LoadingButton>
            </form >
            <Snackbar open={postSuccess}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}>
                    Posted Successfully
                </Alert>
            </Snackbar>
        </>
    )
}

export default UploadLibrary
