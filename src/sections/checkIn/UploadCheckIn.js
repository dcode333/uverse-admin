import {
    Unstable_Grid2 as Grid,
    Typography,
    Paper,
    Button,
    TextField,
    Autocomplete,
    Snackbar,
    Alert
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import UserPlusIcon from '@heroicons/react/24/outline/PaperClipIcon';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBadgeTitle } from 'src/api/badge/useBadge';
import { useUploadCheckin } from 'src/api/checkin/useCheckin';
import { useAuth } from 'src/hooks/use-auth';
import { useState } from 'react';

//Invalidate Checkin cache -pending
//Reset media/badgeId -pending

function UploadCheckIn() {

    const { authToken } = useAuth();
    const { data, isLoading } = useBadgeTitle(authToken);
    const { mutateAsync, isPending } = useUploadCheckin();
    const [postSuccess, setPostSuccess] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setPostSuccess(false);
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            longitude: '',
            latitude: '',
            media: null,
            badgeId: '',
            submit: null
        },
        validationSchema: Yup.object({
            description: Yup
                .string()
                .max(255)
                .required('Description is required'),
            title: Yup
                .string()
                .max(255)
                .required('Title is required'),
            longitude: Yup
                .number()
                .required('Longitude is required'),
            latitude: Yup
                .number()
                .required('Latitude is required'),
            media: Yup
                .mixed()
                .required('Media is required'),
            badgeId: Yup
                .string()
                .required('Badge ID is required'),
        }),
        onSubmit: async (values, helpers) => {

            try {
                await mutateAsync({
                    title: values.title,
                    description: values.description,
                    longitude: values.longitude,
                    latitude: values.latitude,
                    media: values.media,
                    badgeId: values.badgeId,
                    token: authToken
                });

                helpers.resetForm({
                    values: {
                        title: '',
                        description: '',
                        longitude: '',
                        latitude: '',
                        media: null,
                        badgeId: '',
                    },
                });
                setPostSuccess(true)

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
                        mb={2}
                    >
                        <Typography variant="subtitle1"
                            sx={{ textAlign: 'start' }}
                            color="neutral.4000">
                            Upload
                        </Typography>
                        <Paper sx={{ height: 250, backgroundColor: 'neutral.2000', my: 2 }} />
                        <Button
                            variant="contained"
                            color='warning'
                            fullWidth  >
                            <UserPlusIcon style={{ width: '20px', marginRight: '5px' }} />
                            Attach Badge or 3D Asset
                        </Button>
                    </Grid>
                    <Grid item
                        xs={12}
                        sm={6}
                        lg={4}>
                        <TextField
                            id="title-input"
                            error={!!(formik.touched.media && formik.errors.media)}
                            helperText={formik.touched.media && formik.errors.media}
                            name="media"
                            onBlur={formik.handleBlur}
                            onChange={(event) => formik.setFieldValue('media', event.currentTarget.files[0])}
                            type="file"
                            label="Media"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' }, accept: 'image/*' }}
                            InputLabelProps={{ shrink: true, }}
                        />
                        <TextField
                            label="Title"
                            value={formik.values.title}
                            name="title"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.title && formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            type="text"
                            autoComplete="current-password"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            label="Longitude"
                            value={formik.values.longitude}
                            type="number"
                            name="longitude"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.longitude && formik.errors.longitude)}
                            helperText={formik.touched.longitude && formik.errors.longitude}
                            autoComplete="current-password"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            label="Latitude"
                            value={formik.values.latitude}
                            name="latitude"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.latitude && formik.errors.latitude)}
                            helperText={formik.touched.latitude && formik.errors.latitude}
                            type="number"
                            variant="filled"
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
                        <Autocomplete
                            options={data ? data : [{ label: '', id: '' }]}
                            disabled={isLoading}
                            sx={{ mb: 6, color: 'red' }}
                            onChange={(e, val) => formik.setFieldValue('badgeId', val ? val.id : '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Badge ID"
                                    error={!!(formik.touched.badgeId && formik.errors.badgeId)}
                                    helperText={formik.touched.badgeId && formik.errors.badgeId}
                                    variant='filled'
                                    inputProps={{
                                        ...params.inputProps,
                                        style: { color: 'red' },
                                    }}
                                />
                            )}
                        />
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
                    loading={isPending || isLoading}
                >
                    Save
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

export default UploadCheckIn
