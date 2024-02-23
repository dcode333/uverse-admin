import { LoadingButton } from '@mui/lab';
import { Box, Button, CircularProgress, Unstable_Grid2 as Grid, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';


import { updateLibrarySchema } from 'src/schemas/library/updatelibrary';
import { extractHashtags } from 'src/utils/extractHashtags';
import { useUpdateLibrary } from 'src/api/library3d/useupdateLibrary';
import { useAuth } from 'src/hooks/use-auth';
import { getImageDimensions } from 'src/utils/get-image-dimensions';

const UpdateLibraryModal = (props) => {
    const {
        openEditModal,
        handleCloseEditModal,
        handleRefetch,
        libraryId,
        data,
    } = props;

    const { mutateAsync, isPending } = useUpdateLibrary();
    const { authToken } = useAuth();
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            title: data?.title || '',
            description: data?.description || '',
            media: null,
            submit: null
        },
        validationSchema: updateLibrarySchema,
        onSubmit: async (values, helpers) => {

            try {
                const hashtags = extractHashtags(values.description);
                let imgDimensions = null
                if (values.media) imgDimensions = await getImageDimensions(values.media);
                const newTitle = values.title;
                const newDescription = values.description;

                await mutateAsync({
                    title: newTitle === data?.title ? '' : newTitle,
                    description: newDescription === data?.description ? '' : newDescription,
                    media: values.media,
                    width: imgDimensions?.width || '',
                    length: imgDimensions?.height || '',
                    hashtags,
                    libraryId,
                    token: authToken,
                })

                values.media = null;
                handleRefetch()
                handleCloseEditModal();
                queryClient.removeQueries({ queryKey: ['libraries'], exact: true });

            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
            } finally {
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <Modal
            open={openEditModal}
            onClose={handleCloseEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                overflow: "hidden",
                overflowY: "scroll",
                my: 2
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'neutral.2000',
                color: 'neutral.3000',
                width: '80%',
                boxShadow: 24,
                borderRadius: 0.5,
                p: 4,
                my: 4
            }}>
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
                                sx={{ mb: 4 }}
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
                        sx={{ color: 'white', bgcolor: 'neutral.1000', px: 2, mr: 1 }}
                        variant="contained"
                        loadingIndicator={
                            <CircularProgress
                                sx={{ color: 'neutral.1000' }}
                                size={30} />
                        }
                        loading={isPending}
                    >
                        UPDATE
                    </LoadingButton>

                    <Button
                        type="submit"
                        sx={{ color: 'white', bgcolor: 'neutral.2000', px: 2 }}
                        variant="contained"
                        onClick={handleCloseEditModal}
                    >
                        CANCEL
                    </Button>

                </form >
            </Box>
        </Modal>
    )
}

export default UpdateLibraryModal