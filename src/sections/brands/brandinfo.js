import { Grid, Box, Typography, Skeleton, CardMedia, Snackbar, Alert, Modal, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query';

import { useBrandDetail } from 'src/api/brand/usegetBrand';
import { useApproveBrand } from 'src/api/brand/useupdateBrand';
import { useAuth } from 'src/hooks/use-auth';
import FailedToFetch from 'src/components/fetchfail';
import { formatDate } from 'src/utils/format-date';


const placeholder = '/assets/avatars/avatarmed.png'

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

function BadgeInfo({ brandId }) {
    const { authToken } = useAuth();
    const router = useRouter()
    const queryClient = useQueryClient();
    const [openModal, setOpenModal] = useState(false);
    const [brandApprovalError, setBrandApprovalError] = useState(false);
    const [approvalConfirmation, setApprovelConfirmation] = useState('')
    const { mutateAsync, isPending } = useApproveBrand();
    const { data, isLoading, isError } = useBrandDetail({ token: authToken, brandId });
    
    const handleModalClose = () => setOpenModal(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleApprovalConfirmation = (status) => {
        setApprovelConfirmation(status)
        handleModalOpen()
    }

    const handleBrandApprovalRequest = useMemo(() => async () => {
        try {
            setOpenModal(false)
            await mutateAsync({
                token: authToken,
                brandId: data.brand_profile.id,
                status: approvalConfirmation
            })

            queryClient.resetQueries('pendingbrands');
            router.replace('/brands')

        } catch (err) {
            setBrandApprovalError(true)

        }
    }, [mutateAsync,
        authToken,
        data?.brand_profile.id,
        approvalConfirmation,
        queryClient,
        router])

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
                                        User Profile
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', p: 2 }} >
                                        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start' }} >
                                            <CardMedia
                                                component="img"
                                                sx={{ height: 100, width: 100, borderRadius: '10%', mx: 1 }}
                                                image={data?.media || placeholder}
                                                alt="green iguana"
                                            />
                                        </Box>
                                    </Box>
                                    <Info field={'Username'}
                                        value={data?.username} />
                                    <Info field={'Email'}
                                        value={data?.email} />
                                    <Info field={'Phone'}
                                        value={data?.number} />
                                    <Info field={'Status'}
                                        value={data?.is_active ? 'Active' : 'InActive'} />
                                    <Info field={'Joined In'}
                                        value={formatDate(data?.created_at)} />
                                    <Info field={'Last Login'}
                                        value={formatDate(data?.last_login)} />
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
                                <Box sx={{ my: 2, p: 1, bgcolor: 'neutral.2000', borderRadius: 1, minHeight: 400 }}>

                                    <Typography variant='h6'
                                        m={1}
                                        color={'neutral.1000'}
                                    >
                                        Brand Profile
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'space-between', p: 2 }} >
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'start' }} >
                                            <CardMedia
                                                component="img"
                                                sx={{ height: 100, width: 100, borderRadius: '10%', mx: 1 }}
                                                image={data?.brand_profile?.cover_pic || placeholder}
                                                alt="green iguana"
                                            />
                                        </Box>

                                        {data?.brand_profile?.status === 'Pending' && <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'end', flexDirection: 'column' }} >
                                            <LoadingButton
                                                variant="contained"
                                                size='small'
                                                sx={{ borderRadius: 1, my: 1, bgcolor: 'green', width: 90 }}
                                                onClick={() => handleApprovalConfirmation('Approve')}
                                                loading={isPending}
                                                loadingIndicator={
                                                    <CircularProgress
                                                        sx={{ color: 'neutral.1000' }}
                                                        size={20} />
                                                }
                                            >
                                                Approve
                                            </LoadingButton>
                                            <LoadingButton
                                                variant="contained"
                                                size='small'
                                                loading={isPending}
                                                sx={{ borderRadius: 1, my: 1, bgcolor: 'red', width: 90 }}
                                                onClick={() => handleApprovalConfirmation('Decline')}
                                                loadingIndicator={
                                                    <CircularProgress
                                                        sx={{ color: 'neutral.1000' }}
                                                        size={20} />
                                                }
                                            >
                                                Decline
                                            </LoadingButton>
                                        </Box>}

                                    </Box>
                                    <Info field={'Title'}
                                        value={data?.brand_profile?.title}
                                    />
                                    <Info field={'Email'}
                                        value={data?.brand_profile?.email}
                                    />
                                    <Info field={'Bio'}
                                        value={data?.brand_profile?.bio}
                                    />
                                    <Info field={'Category'}
                                        value={data?.brand_profile?.category}
                                    />
                                    <Info field={'Phone'}
                                        value={data?.brand_profile?.contact_number}
                                    />
                                    <Info field={'Marketing Goals'}
                                        value={data?.brand_profile?.marketing_goals}
                                    />
                                    <Info field={'Content Type'}
                                        value={data?.brand_profile?.content_type}
                                    />
                                    <Info field={'Targeted Audience'}
                                        value={data?.brand_profile?.target_audience}
                                    />
                                    <Info field={'Badge & Checkin Plan'}
                                        value={data?.brand_profile?.badge_and_checkin_plans}
                                    />
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

            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'neutral.3000',
                    color: 'neutral.4000',
                    width: 400,
                    boxShadow: 24,
                    borderRadius: 1,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title"
                        variant="h6"
                        component="h2">
                        {` Do you want this brand to be "${approvalConfirmation}" ?`}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <LoadingButton
                            variant="contained"
                            size='small'
                            sx={{ borderRadius: 1, mr: 2, my: 3 }}
                            color={approvalConfirmation === 'approve' ? 'success' : 'error'}
                            onClick={handleBrandApprovalRequest}
                        >
                            {approvalConfirmation === 'approve' ? 'Approve' : 'Decline'}
                        </LoadingButton>
                        <LoadingButton
                            variant="contained"
                            size='small'
                            sx={{ borderRadius: 1, my: 3, bgcolor: 'gray' }}
                            onClick={handleModalClose}
                        >
                            Cancel
                        </LoadingButton>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default BadgeInfo

const styles = {
    statsCard: { padding: '30px', mx: 2, textAlign: 'center', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.4000' },
    poststat: { padding: '10px', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.5000' },
    review: { display: 'flex', justifyContent: 'space-evenly' }
}   