import {
    Unstable_Grid2 as Grid,
    Typography,
    TextField,
    Snackbar,
    Alert,
    CircularProgress,
    Autocomplete,
    Chip,
    Box
} from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import LoadingButton from '@mui/lab/LoadingButton';

import { useBadgeTitle } from 'src/api/badge/useBadge';
import { useInterests } from 'src/api/drops/usegetDrops';
import { useUsersTitle } from 'src/api/users/useUsers';
import { useUploadDrop } from 'src/api/drops/usecreateDrops';
import { uploadDropSchema } from 'src/schemas/drop';



//Media placeholder overlapped by border -pending

function UploadLibrary(props) {

    const queryClient = useQueryClient();
    const { authToken, handleTabChange } = props;
    const { data, isLoading } = useBadgeTitle({ token: authToken, type: 'Misc' });
    const { data: interests, isLoading: interestsLoading } = useInterests({ token: authToken });
    const { data: users, isLoading: usersLoading } = useUsersTitle({ token: authToken });
    const { mutateAsync, isPending } = useUploadDrop();
    const [postSuccess, setPostSuccess] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setPostSuccess(false);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            badges_to_be_assigned: '',
            badges_filter: '',
            interests_filter: '',
            users_ids: '',
            submit: null
        },
        validationSchema: uploadDropSchema,
        onSubmit: async (values, helpers) => {

            try {

                await mutateAsync({
                    token: authToken,
                    name: values.name,
                    description: values.description,
                    badges_to_be_assigned: values.badges_to_be_assigned,
                    badges_filter: values.badges_filter,
                    interests_filter: values.interests_filter,
                    users_ids: values.users_ids,
                });

                queryClient.resetQueries('drops');
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


                        <Autocomplete
                            multiple
                            id='selectfield'
                            options={users || []}
                            disabled={usersLoading}
                            onBlur={formik.handleBlur}
                            onChange={
                                (e, value) => {
                                    formik.setFieldValue('users_ids', value.map(item => item.id))
                                }
                            }
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            // defaultValue={[{}]}
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
                                    label="Users"
                                    placeholder=""
                                    error={!!(formik.touched.users_ids && formik.errors.users_ids)}
                                    helpertext={formik.touched.users_ids && formik.errors.users_ids}
                                    name='users_ids'
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
                            {formik.touched.users_ids && formik.errors.users_ids}
                        </Typography>
                        <Box sx={{ mb: 6 }} />


                    </Grid>
                    <Grid item
                        xs={12}
                        sm={6}
                        lg={4}>

                        <TextField
                            label="Name"
                            value={formik.values.name}
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            type="text"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
                        />
                        <Autocomplete
                            multiple
                            id='selectfield'
                            options={data || []}
                            disabled={isLoading}
                            onBlur={formik.handleBlur}
                            onChange={
                                (e, value) => {
                                    formik.setFieldValue('badges_to_be_assigned', value.map(item => item.id))
                                }
                            }
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            // defaultValue={[{}]}
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
                                    label="Badges to assign"
                                    placeholder=""
                                    error={!!(formik.touched.badges_to_be_assigned && formik.errors.badges_to_be_assigned)}
                                    helpertext={formik.touched.badges_to_be_assigned && formik.errors.badges_to_be_assigned}
                                    name='badges_to_be_assigned'
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
                            {formik.touched.badges_to_be_assigned && formik.errors.badges_to_be_assigned}
                        </Typography>
                        <Box sx={{ mb: 6 }} />

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
                                    formik.setFieldValue('badges_filter', value.map(item => item.id))
                                }
                            }
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            // defaultValue={[{}]}
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
                                    label="Badges filter"
                                    placeholder=""
                                    error={!!(formik.touched.badges_filter && formik.errors.badges_filter)}
                                    helpertext={formik.touched.badges_filter && formik.errors.badges_filter}
                                    name='badges_filter'
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
                            {formik.touched.badges_filter && formik.errors.badges_filter}
                        </Typography>
                        <Box sx={{ mb: 6 }} />

                        <Autocomplete
                            multiple
                            id='selectfield'
                            options={interests || []}
                            disabled={interestsLoading}
                            onBlur={formik.handleBlur}
                            onChange={
                                (e, value) => {
                                    formik.setFieldValue('interests_filter', value.map(item => item.id))
                                }
                            }
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            // defaultValue={[{}]}
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
                                    label="Interests"
                                    placeholder=""
                                    error={!!(formik.touched.interests_filter && formik.errors.interests_filter)}
                                    helpertext={formik.touched.interests_filter && formik.errors.interests_filter}
                                    name='interests_filter'
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
                            {formik.touched.interests_filter && formik.errors.interests_filter}
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
                    loading={isPending || isLoading || interestsLoading || usersLoading}
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
