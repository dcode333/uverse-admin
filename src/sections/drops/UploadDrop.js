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

import { useBadgeTitle } from 'src/api/badge/useBadge';
import { useUploadLibrary } from 'src/api/library3d/useLibrary';
import { uploadDropSchema } from 'src/schemas/drop';
import { extractHashtags } from 'src/utils/extractHashtags';



//Media placeholder overlapped by border -pending

function UploadLibrary(props) {

    const { authToken, handleTabChange } = props;
    const { data, isLoading } = useBadgeTitle(authToken);
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useUploadLibrary();
    const [postSuccess, setPostSuccess] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setPostSuccess(false);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            submit: null
        },
        validationSchema: uploadDropSchema,
        onSubmit: async (values, helpers) => {

            try {

                const hashtags = extractHashtags(values.description);

                // await mutateAsync({
                //     name: values.name,
                //     description: values.description,
                // });

                queryClient.resetQueries('libraries');
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
                            fullWidth
                            select
                            variant='filled'
                            name='locked_content'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.locked_content && formik.errors.locked_content)}
                            helperText={formik.touched.locked_content && formik.errors.locked_content}
                            value={formik.values.locked_content}
                            label="Locked Content"
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
