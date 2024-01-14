import { Grid, Box, Typography, Skeleton, CardMedia } from '@mui/material';
import React from 'react'
import { SvgIcon } from '@mui/material';
import LikeIcon from '@heroicons/react/24/outline/HandThumbUpIcon';
import CommentIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import RepostIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import SavedIcon from '@heroicons/react/24/outline/BookmarkIcon';
import QRcode from 'react-qr-code';
import { useCheckindetail } from 'src/api/checkin/useCheckin';
import { useAuth } from 'src/hooks/use-auth';
import FailedToFetch from 'src/components/fetchfail';



const placeholder = '/assets/avatars/avatarmed.png'
function Profileinfo({ checkinId }) {
    const { authToken } = useAuth();
    const { data, isLoading, isError } = useCheckindetail({ token: authToken, checkinId });

    if (isError) return <FailedToFetch />

    return (
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

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }} >
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} >
                                        <CardMedia
                                            component="img"
                                            sx={{ height: 100, width: 100, borderRadius: '10%', mx: 1 }}
                                            image={data?.media || placeholder}
                                            alt="green iguana"
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
                                            Additional Information
                                        </Typography>
                                    </Box >
                                    <Box sx={{ width: '50%', color: 'neutral.4000' }}>
                                        <Typography
                                            gutterBottom
                                            fontSize={'11px'}
                                            component="div">
                                            {data?.additional_information || 'N/A'}
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
                                            Hashtag
                                        </Typography>
                                    </Box >
                                    <Box sx={{ width: '50%', color: 'neutral.4000' }}>
                                        <Typography
                                            gutterBottom
                                            fontSize={'11px'}
                                            component="div">
                                            {data?.hashtag || 'N/A'}
                                        </Typography>
                                    </Box >
                                </Box>

                                <Box sx={{ display: 'flex', p: 1 }}>
                                    <Box sx={{ width: '50%', color: 'neutral.5000' }}>
                                        <Typography
                                            gutterBottom
                                            fontSize={'12px'}
                                            component="div">
                                            Giveaway Type
                                        </Typography>
                                    </Box >
                                    <Box sx={{ width: '50%', color: 'neutral.4000' }}>
                                        <Typography
                                            gutterBottom
                                            fontSize={'11px'}
                                            component="div">
                                            {data?.giveaways_type || 'N/A'}
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
                                my: 2, p: 10,
                                bgcolor: 'neutral.2000',
                                borderRadius: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <QRcode value={data ? data.id : 'Dummy QR'} />
                            </Box>
                        </>}
                </Box>
            </Grid>
        </Grid >
    )
}

export default Profileinfo

const styles = {
    statsCard: { padding: '30px', mx: 2, textAlign: 'center', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.4000' },
    poststat: { padding: '10px', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.5000' },
    review: { display: 'flex', justifyContent: 'space-evenly' }
}