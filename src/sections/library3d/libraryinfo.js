import { Grid, Box, Typography, Skeleton, CardMedia } from '@mui/material';
import React, { useState } from 'react'
import { SvgIcon } from '@mui/material';
import LikeIcon from '@heroicons/react/24/outline/HandThumbUpIcon';
import CommentIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import RepostIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import SavedIcon from '@heroicons/react/24/outline/BookmarkIcon';

import { useLibrary } from 'src/api/library3d/useLibrary';
import { useAuth } from 'src/hooks/use-auth';
import FailedToFetch from 'src/components/fetchfail';
import { formatDate } from 'src/utils/format-date';
import { LoadingButton } from '@mui/lab';
import UpdateLibraryModal from './components/updateLibraryModel';


const placeholder = '/assets/avatars/avatarmed.png'
function LibraryInfo({ libraryId }) {
    const { authToken } = useAuth();
    const { data, isLoading, isError, refetch } = useLibrary({ token: authToken, libraryId });
    const [openEditModal, setOpenEditModal] = useState(false)
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);
    const handleRefetch = () => refetch();

    if (isError) return <FailedToFetch />

    return (
        <>
            <Grid container>
                <Grid item
                    xs={12}
                    md={12}
                    lg={12}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
                        {isLoading || !data ?
                            <Skeleton
                                variant="rectangular"
                                width={'100%'}
                                height={200}
                                sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                            <>
                                <Box sx={{ display: 'flex', my: 2 }}>
                                    <Grid container
                                        spacing={2}
                                        alignItems={'center'}
                                        justifyContent={'center'}>
                                        <Grid item
                                            xs={6}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            xl={2}>
                                            <Box sx={styles.poststat}>
                                                <SvgIcon fontSize=''>
                                                    <LikeIcon />
                                                </SvgIcon>
                                                <Typography fontSize='10px'
                                                    marginX={1}>Likes</Typography>
                                                <Typography variant={'caption'}
                                                    color={'neutral.4000'}>{data?.like_count}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item
                                            xs={6}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            xl={2}>
                                            <Box sx={styles.poststat}>
                                                <SvgIcon fontSize=''>
                                                    <CommentIcon />
                                                </SvgIcon>
                                                <Typography fontSize='10px'
                                                    marginX={1}>Comments</Typography>
                                                <Typography variant={'caption'}
                                                    color={'neutral.4000'}>{data?.comment_count}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item
                                            xs={6}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            xl={2}>
                                            <Box sx={styles.poststat}>
                                                <SvgIcon fontSize=''>
                                                    <RepostIcon />
                                                </SvgIcon>
                                                <Typography fontSize='10px'
                                                    marginX={1}>Reposts</Typography>
                                                <Typography variant={'caption'}
                                                    color={'neutral.4000'}>{data?.repost_count}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item
                                            xs={6}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            xl={2}>
                                            <Box sx={styles.poststat}>
                                                <SvgIcon fontSize=''>
                                                    <SavedIcon />
                                                </SvgIcon>
                                                <Typography fontSize='10px'
                                                    marginX={1}>Saves</Typography>
                                                <Typography variant={'caption'}
                                                    color={'neutral.4000'}>{data?.saved_count}</Typography>
                                            </Box>
                                        </Grid>

                                    </Grid>
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
                        {isLoading || !data ?
                            <Skeleton
                                variant="rectangular"
                                width={'100%'}
                                height={200}
                                sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                            <>
                                <Box sx={{ my: 2, p: 1, bgcolor: 'neutral.2000', borderRadius: 1 }}>
                                    <LoadingButton
                                        sx={{ px: 2, border: 0.5 }}
                                        onClick={handleOpenEditModal}
                                    >
                                        Edit
                                    </LoadingButton>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }} >
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} >
                                            <CardMedia
                                                component="img"
                                                sx={{ height: 100, width: 100, borderRadius: '10%', mx: 1 }}
                                                image={data?.media[0].media || placeholder}
                                                alt="library media"
                                            />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', p: 1 }}>
                                        <Box sx={{ width: '50%', color: 'neutral.5000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'12px'}
                                                component="div">
                                                Title
                                            </Typography>
                                        </Box >

                                        <Box sx={{ width: '50%', color: 'neutral.4000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'11px'}
                                                component="div">
                                                {data?.title || 'N/A'}
                                            </Typography>
                                        </Box >
                                    </Box>

                                    <Box sx={{ display: 'flex', p: 1 }}>
                                        <Box sx={{ width: '50%', color: 'neutral.5000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'12px'}
                                                component="div">
                                                Description
                                            </Typography>
                                        </Box >

                                        <Box sx={{ width: '50%', color: 'neutral.4000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'11px'}
                                                component="div">
                                                {data?.description || 'N/A'}
                                            </Typography>
                                        </Box >
                                    </Box>

                                    <Box sx={{ display: 'flex', p: 1 }}>
                                        <Box sx={{ width: '50%', color: 'neutral.5000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'12px'}
                                                component="div">
                                                Created At
                                            </Typography>
                                        </Box >
                                        <Box sx={{ width: '50%', color: 'neutral.4000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'11px'}
                                                component="div">
                                                {data?.created_at ? formatDate(data?.created_at) : 'N/A'}
                                            </Typography>
                                        </Box >
                                    </Box>

                                    <Box sx={{ display: 'flex', p: 1 }}>
                                        <Box sx={{ width: '50%', color: 'neutral.5000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'12px'}
                                                component="div">
                                                Type
                                            </Typography>
                                        </Box >
                                        <Box sx={{ width: '50%', color: 'neutral.4000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'11px'}
                                                component="div">
                                                {data?.type || 'N/A'}
                                            </Typography>
                                        </Box >
                                    </Box>

                                    <Box sx={{ display: 'flex', p: 1 }}>
                                        <Box sx={{ width: '50%', color: 'neutral.5000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'12px'}
                                                component="div">
                                                Subtype
                                            </Typography>
                                        </Box >
                                        <Box sx={{ width: '50%', color: 'neutral.4000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'11px'}
                                                component="div">
                                                {data?.subtype || 'N/A'}
                                            </Typography>
                                        </Box >
                                    </Box>

                                    <Box sx={{ display: 'flex', p: 1 }}>
                                        <Box sx={{ width: '50%', color: 'neutral.5000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'12px'}
                                                component="div">
                                                Category
                                            </Typography>
                                        </Box >
                                        <Box sx={{ width: '50%', color: 'neutral.4000' }}>
                                            <Typography
                                                gutterBottom
                                                fontSize={'11px'}
                                                component="div">
                                                {data?.category || 'N/A'}
                                            </Typography>
                                        </Box >
                                    </Box>
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
                        {isLoading || !data ?
                            <Skeleton
                                variant="rectangular"
                                width={'100%'}
                                height={200}
                                sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                            <>
                                <Box sx={{
                                    display: 'flex',
                                    my: 2,
                                    py: 10,
                                    px: 1,
                                    bgcolor: 'neutral.2000',
                                    borderRadius: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <img src={`data:image/png;base64,${data?.qr_code}`}
                                        alt="QR code"
                                        width="300"
                                        height="300"
                                    />
                                </Box>
                            </>}
                    </Box>
                </Grid>
            </Grid >

            {data ?
                <UpdateLibraryModal
                    openEditModal={openEditModal}
                    handleCloseEditModal={handleCloseEditModal}
                    handleOpenEditModal={handleOpenEditModal}
                    handleRefetch={handleRefetch}
                    data={data ? data : {}}
                    libraryId={libraryId}
                /> :
                <></>
            }
        </>
    )
}

export default LibraryInfo

const styles = {
    statsCard: { padding: '30px', mx: 2, textAlign: 'center', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.4000' },
    poststat: { padding: '10px', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.5000' },
    review: { display: 'flex', justifyContent: 'space-evenly' }
}