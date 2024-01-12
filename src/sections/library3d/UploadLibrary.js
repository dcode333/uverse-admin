import {
    Unstable_Grid2 as Grid,
    Typography,
    TextField,
    Snackbar,
    Alert,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBadgeTitle } from 'src/api/badge/useBadge';
import { useUploadLibrary } from 'src/api/library3d/useLibrary';
import { useState } from 'react';
import { uploadlibraryschema } from 'src/schemas/library';
import { getImageDimensions } from 'src/utils/get-image-dimensions';
import { useQueryClient } from '@tanstack/react-query';



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
            title: '',
            description: '',
            media: null,
            threeD_file: null,
            hashtag: '',
            subtype: '',
            category: '',
            is_locked: false,
            locked_content: '',
            submit: null
        },
        validationSchema: uploadlibraryschema,
        onSubmit: async (values, helpers) => {

            try {

                const { width, height } = await getImageDimensions(values.media);

                await mutateAsync({
                    title: values.title,
                    description: values.description,
                    media: values.media,
                    locked_content: values.locked_content,
                    hashtag: values.hashtag,
                    is_locked: values.is_locked,
                    subtype: values.subtype,
                    category: values.category,
                    token: authToken,
                    threeD_file: values.threeD_file,
                    width: width,
                    length: height
                });


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
                            id="media-input"
                            error={!!(formik.touched.media && formik.errors.media)}
                            helperText={formik.touched.media && formik.errors.media}
                            name="media"
                            onBlur={formik.handleBlur}
                            onChange={async (event) => formik.setFieldValue('media', event.currentTarget.files[0])}
                            type="file"
                            label="Media"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' }, accept: 'image/*' }}
                            InputLabelProps={{ shrink: true, }}
                        />

                        <TextField
                            id="3dfile-input"
                            error={!!(formik.touched.threeD_file && formik.errors.threeD_file)}
                            helperText={formik.touched.threeD_file && formik.errors.threeD_file}
                            name="threeD_file"
                            onBlur={formik.handleBlur}
                            onChange={(event) => formik.setFieldValue('threeD_file', event.currentTarget.files[0])}
                            type="file"
                            label="3D File"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{
                                style: { color: 'white' },
                                accept: '.obj, .stl, .fbx, .glb, .gltf'
                            }}
                            InputLabelProps={{ shrink: true, }}
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
                            label="hashtags"
                            value={formik.values.hashtag}
                            type="text"
                            name="hashtag"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.hashtag && formik.errors.hashtag)}
                            helperText={formik.touched.hashtag && formik.errors.hashtag}
                            variant="filled"
                            fullWidth
                            sx={{ mb: 6 }}
                            inputProps={{ style: { color: 'white' } }}
                        />

                        <TextField
                            fullWidth
                            select
                            variant='filled'
                            name='is_locked'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.is_locked && formik.errors.is_locked)}
                            helperText={formik.touched.is_locked && formik.errors.is_locked}
                            value={formik.values.is_locked}
                            label="Content Lock"
                            id='selectfield'
                            sx={{ mb: 6 }}
                        >
                            <MenuItem value={true} >Content Locked</MenuItem>
                            <MenuItem value={false}>Content Unlocked</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item
                        xs={12}
                        sm={6}
                        lg={4}>

                        <TextField
                            fullWidth
                            select
                            variant='filled'
                            name='locked_content'
                            disabled={isLoading || formik.values.is_locked}
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
                            label="Category"
                            id='selectfield'
                            sx={{ mb: 6 }}
                        >
                            <MenuItem value={'3D_ASSET'} >3D_ASSET</MenuItem>
                            <MenuItem value={'FACE_FILTER'}>FACE_FILTER</MenuItem>
                        </TextField>

                        <TextField
                            fullWidth
                            select
                            variant='filled'
                            name='subtype'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.subtype && formik.errors.subtype)}
                            helperText={formik.touched.subtype && formik.errors.subtype}
                            value={formik.values.subtype}
                            label="Subtype"
                            id='selectfield'
                            sx={{ mb: 6 }}
                        >
                            <MenuItem value={'3D'} >3D</MenuItem>
                            <MenuItem value={'AR'}>AR</MenuItem>
                        </TextField>


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
