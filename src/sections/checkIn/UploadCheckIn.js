import {
    Unstable_Grid2 as Grid,
    Typography,
    TextField,
    Snackbar,
    Alert,
    MenuItem,
    CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useQueryClient } from '@tanstack/react-query';

import { useBadgeTitle } from 'src/api/badge/useBadge';
import { useUploadCheckin } from 'src/api/checkin/useCheckin';
import { useCategories } from 'src/api/shared/usegetCategory';
import { uploadcheckinschema } from 'src/schemas/checkin';
import { extractHashtags } from 'src/utils/extractHashtags';


//Reset media/badgeId -pending
//Media placeholder overlapped by border -pending

function UploadCheckIn(props) {

    const { authToken, handleTabChange } = props;
    const { data, isLoading } = useBadgeTitle({ token: authToken, type: 'CheckInRewardedBadge' });
    const { data: categories, isLoading: categoriesLoading } = useCategories({ token: authToken });
    const queryClient = useQueryClient();
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
            giveaways_type: '',
            required_tokens: '',
            category: '',
            expires_date: '',
            badgeId: '',
            media: null,
            submit: null
        },
        validationSchema: uploadcheckinschema,
        onSubmit: async (values, helpers) => {

            try {
                const hashtags = extractHashtags(values.description);

                await mutateAsync({
                    title: values.title,
                    description: values.description,
                    longitude: values.longitude,
                    latitude: values.latitude,
                    hashtags: hashtags,
                    media: values.media,
                    category: values.category,
                    badgeId: values.badgeId ? values.badgeId : '',
                    giveaways_type: values.giveaways_type,
                    required_tokens: values.required_tokens,
                    expires_date: values.expires_date,
                    token: authToken
                });

                queryClient.removeQueries('checkins');
                setPostSuccess(true)
                // helpers.resetForm();
                handleTabChange('1');

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
                            fullWidth
                            select
                            variant='filled'
                            name='badgeId'
                            disabled={isLoading}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.badgeId && formik.errors.badgeId)}
                            helperText={formik.touched.badgeId && formik.errors.badgeId}
                            value={formik.values.badgeId}
                            label="Badge ID"
                            id='selectfield'
                            sx={{ mb: 6 }}
                        >
                            <MenuItem value={''} >
                                None
                            </MenuItem>
                            {data?.map((item, i) => (
                                <MenuItem
                                    value={item.id}
                                    key={i}>
                                    {item.label}
                                </MenuItem>
                            ))}

                        </TextField>
                    </Grid>
                    <Grid item
                        xs={12}
                        sm={6}
                        lg={4}>

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
                        <TextField
                            fullWidth
                            select
                            variant='filled'
                            name='giveaways_type'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.giveaways_type && formik.errors.giveaways_type)}
                            helperText={formik.touched.giveaways_type && formik.errors.giveaways_type}
                            value={formik.values.giveaways_type}
                            label="Giveaways Type"
                            id='selectfield'
                            sx={{ mb: 6 }}
                        >
                            <MenuItem value={"Misc"} >Misc</MenuItem>
                            <MenuItem value={"Free"}>Free</MenuItem>
                            <MenuItem value={"BadgeRewardedCheckIn"}>BadgeRewardedCheckIn</MenuItem>
                        </TextField>
                        <TextField
                            label="Required tokens"
                            value={formik.values.required_tokens}
                            type="number"
                            name="required_tokens"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.required_tokens && formik.errors.required_tokens)}
                            helperText={formik.touched.required_tokens && formik.errors.required_tokens}
                            variant="filled"
                            disabled={formik.values.giveaways_type !== 'Misc'}
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            fullWidth
                            select
                            variant='filled'
                            name='category'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.category && formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                            value={formik.values.category}
                            disabled={categoriesLoading}
                            label="Category"
                            id='selectfield'
                            sx={{ mb: 6 }}
                        >
                            <MenuItem value={''} >
                                None
                            </MenuItem>
                            {categories?.map((item, i) => (
                                <MenuItem
                                    value={item.id}
                                    key={i}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </TextField>


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
                            rows={5}
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
                        />

                        <TextField
                            label="Expiry Date"
                            value={formik.values.expires_date}
                            name="expires_date"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.expires_date && formik.errors.expires_date)}
                            helperText={formik.touched.expires_date && formik.errors.expires_date}
                            type="date"
                            variant="filled"
                            fullWidth
                            sx={{
                                '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                    backgroundColor: '#ffffff',
                                    borderRadius: '2px',
                                },
                                mb: 6
                            }}
                            inputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{
                                shrink: true
                            }}
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
                    loadingIndicator={
                        <CircularProgress
                            sx={{ color: 'neutral.1000' }}
                            size={30} />
                    }
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

export default UploadCheckIn
