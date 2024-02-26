import { LoadingButton } from '@mui/lab';
import { Box, Button, CircularProgress, Unstable_Grid2 as Grid, MenuItem, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';


import { updatebadgeschema } from 'src/schemas/badges/updatebadge';
import { extractHashtags } from 'src/utils/extractHashtags';
import { useUpdateBadge } from 'src/api/badge/useUpdateBadge';
import { useAuth } from 'src/hooks/use-auth';

const UpdateBadgeModal = (props) => {
    const {
        openEditModal,
        handleCloseEditModal,
        handleRefetch,
        badgeId,
        data,
    } = props;

    const { mutateAsync, isPending } = useUpdateBadge();
    const { authToken } = useAuth();
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            title: data?.title || '',
            description: data?.description || '',
            additional_information: data?.additional_information || '',
            giveaways_type: data?.giveaways_type || '',
            quantity: data?.quantity || '',
            constraint_number: data?.constraint_number || '',
            required_tokens: data?.required_tokens || '',
            expires_date: '',
            media: null,
            submit: null
        },
        validationSchema: updatebadgeschema,
        onSubmit: async (values, helpers) => {

            try {
                const hashtags = extractHashtags(values.description);
                const newTitle = values.title === data.title ? '' : values.title;
                const newDescription = values.description === data.description ? '' : values.description;
                const newAddInfo = values.additional_information === data.additional_information ? '' : values.additional_information;
                const newGiveaway_type = values.giveaways_type === data.giveaways_type ? '' : values.giveaways_type;
                const newQuantity = values.giveaways_type === 'Misc' && values.quantity != data.quantity ? values.quantity : ''
                const newReqTokens = values.giveaways_type === 'Misc' && values.required_tokens != data.required_tokens ? values.required_tokens : ''
                const newExpires_date = values.expires_date === data.expires_date ? '' : values.expires_date;
                const newConstraintNo = (values.giveaways_type === 'Follower' ||
                    values.giveaways_type === 'Followings' ||
                    values.giveaways_type === 'Creations') && values.constraint_number !== data.constraint_number ? values.constraint_number : ''



                await mutateAsync({
                    title: newTitle,
                    description: newDescription,
                    additional_information: newAddInfo,
                    giveaways_type: newGiveaway_type,
                    quantity: newQuantity,
                    constraint_number: newConstraintNo,
                    required_tokens: newReqTokens,
                    expires_date: newExpires_date,
                    media: values.media,
                    hashtags,
                    badgeId,
                    token: authToken,
                })

                values.expires_date = ''
                handleRefetch()
                handleCloseEditModal();
                queryClient.removeQueries({ queryKey: ['badges'], exact: true });

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
                                sx={{ mb: 4 }}
                                inputProps={{ style: { color: 'white' }, accept: 'image/*' }}
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
                                rows={1}
                                fullWidth
                                sx={{ mb: 4 }}
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
                                    }, mb: 2
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
                                sx={{ mb: 4 }}
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
                                sx={{ mb: 4 }}
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
                                sx={{ mb: 2 }}
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
                                sx={{ mb: 4 }}
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
                                sx={{ mb: 4 }}
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

export default UpdateBadgeModal