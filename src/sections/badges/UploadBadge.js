import {
    Unstable_Grid2 as Grid,
    Typography,
    TextField,
    Snackbar,
    Alert,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';

import LoadingButton from '@mui/lab/LoadingButton';
import { useCheckinTitle } from 'src/api/checkin/useCheckin';
import { useUploadBadge } from 'src/api/badge/useBadge';
import { uploadbadgeschema } from 'src/schemas/badge';
import { extractHashtags } from 'src/utils/extractHashtags';


//Reset media/badgeId -pending
//Media placeholder overlapped by border -pending
//Refactor unique checkinTitles Api -pending

function UploadBadge(props) {

    const { authToken, handleTabChange } = props;
    const { data, isLoading } = useCheckinTitle(authToken);
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useUploadBadge();
    const [postSuccess, setPostSuccess] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setPostSuccess(false);
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            media: null,
            giveaways_type: '',
            quantity: '',
            constraint_number: '',
            additional_information: '',
            age_restricted: false,
            required_tokens: '',
            checkin: '',
            expires_date: '',
            submit: null
        },
        validationSchema: uploadbadgeschema,
        onSubmit: async (values, helpers) => {

            try {

                const hashtags = extractHashtags(values.description);

                await mutateAsync({
                    title: values.title,
                    description: values.description,
                    media: values.media,
                    checkin: values.checkin,
                    giveaways_type: values.giveaways_type,
                    hashtag: hashtags,
                    age_restricted: values.age_restricted,
                    additional_information: values.additional_information,
                    quantity: values.quantity,
                    constraint_number: values.constraint_number,
                    required_tokens: values.required_tokens,
                    expires_date: values.expires_date,
                    token: authToken,
                });

                queryClient.resetQueries('badges');
                // helpers.resetForm();
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
                            variant="filled"
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
                        />
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
                            label="Additional Information"
                            value={formik.values.additional_information}
                            name="additional_information"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.additional_information && formik.errors.additional_information)}
                            helperText={formik.touched.additional_information && formik.errors.additional_information}
                            type="text"
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
                            label="Givaways Type"
                            id='selectfield'
                            sx={{ mb: 6 }}
                        >
                            <MenuItem value={''} >
                                None
                            </MenuItem>
                            <MenuItem value={'SignUp'}>SignUp</MenuItem>
                            <MenuItem value={'Follower'}>Follower</MenuItem>
                            <MenuItem value={'Followings'}>Followings</MenuItem>
                            <MenuItem value={'Creations'}>Creations</MenuItem>
                            <MenuItem value={'CheckInRewardedBadge'}>CheckInRewardedBadge</MenuItem>
                            <MenuItem value={'Misc'}>Misc</MenuItem>
                            <MenuItem value={'Free'}>Free</MenuItem>
                        </TextField>

                        <TextField
                            fullWidth
                            select
                            variant='filled'
                            name='age_restricted'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.age_restricted && formik.errors.age_restricted)}
                            helperText={formik.touched.age_restricted && formik.errors.age_restricted}
                            value={formik.values.age_restricted}
                            label="Age Restriction"
                            id='selectfield'
                            sx={{ mb: 6 }}
                        >
                            <MenuItem value={true} >Age Restricted</MenuItem>
                            <MenuItem value={false}>Not Age Restricted</MenuItem>
                        </TextField>
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
                                }, mb: 6
                            }}
                            inputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item
                        xs={12}
                        sm={6}
                        lg={4}>
                        <TextField
                            fullWidth
                            select
                            variant='filled'
                            name='checkin'
                            disabled={isLoading}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.checkin && formik.errors.checkin)}
                            helperText={formik.touched.checkin && formik.errors.checkin}
                            value={formik.values.checkin}
                            label="Checkin ID"
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

                        <TextField
                            label="Quantity"
                            value={formik.values.quantity}
                            type="number"
                            name="quantity"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.quantity && formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                            variant="filled"
                            disabled={formik.values.giveaways_type !== 'Misc'}
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
                        />
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
                            label="Constraint number"
                            value={formik.values.constraint_number}
                            type="number"
                            name="constraint_number"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.constraint_number && formik.errors.constraint_number)}
                            helperText={formik.touched.constraint_number && formik.errors.constraint_number}
                            variant="filled"
                            disabled={formik.values.giveaways_type !== 'Follower' && formik.values.giveaways_type !== 'Followings' && formik.values.giveaways_type !== 'Creations'}
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
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

export default UploadBadge
