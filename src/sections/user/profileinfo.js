import { Grid, Box, Typography, Skeleton } from '@mui/material';
import React from 'react'
import ProfileCard from './components/profileCard'
import { SvgIcon } from '@mui/material';
import ArrowDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import LikeIcon from '@heroicons/react/24/outline/HandThumbUpIcon';
import CommentIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import RepostIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import SavedIcon from '@heroicons/react/24/outline/BookmarkIcon';
import Link from 'next/link';
import { useUserProfile } from 'src/api/users/useUsers';
import { useUserCheckin } from 'src/api/checkin/useUserCheckin';
import { useAuth } from 'src/hooks/use-auth';

function Profileinfo({ userId }) {
    const { authToken } = useAuth();
    const { data, isLoading } = useUserProfile({ token: authToken, userId });
    const { data: checkin, isLoading: checkinLoading } = useUserCheckin({ token: authToken, userId });


    return (
        <>
            <Grid container>
                <Grid item
                    xs={12}
                    md={4}>
                    {isLoading || !data ?
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={600}
                            animation={'pulse'}
                            sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                        <ProfileCard data={data} />}
                </Grid>
                <Grid item
                    xs={12}
                    md={8}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
                        <Box sx={{ display: 'flex', color: 'neutral.4000', p: 1 }}>
                            <Box width={'50%'}>
                                <Typography variant="body2"
                                    sx={{ textAlign: 'start' }}
                                    component="div"
                                    gutterBottom>
                                    Stats
                                </Typography>
                            </Box>
                            <Box width={'50%'}
                                display={'flex'}
                                justifyContent={'flex-end'}>
                                <Typography variant="caption"
                                    sx={{ textAlign: 'end', mx: 0.5 }}
                                    component="div"
                                    gutterBottom>
                                    weekly
                                </Typography>
                                <SvgIcon fontSize='small'>
                                    <ArrowDownIcon />
                                </SvgIcon>
                            </Box>
                        </Box>
                        {isLoading || !data ?
                            <Skeleton
                                variant="rectangular"
                                width={'100%'}
                                height={200}
                                sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                            <>
                                <Box sx={{ display: 'flex' }}>
                                    <Grid container
                                        spacing={2}>
                                        <Grid item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={4}
                                            xl={4} >
                                            <Box sx={styles.statsCard}>
                                                <Typography variant="caption">Upload</Typography>
                                                <Typography variant="subtitle1">{data.post_count}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={4}
                                            xl={4} >
                                            <Box sx={styles.statsCard}>
                                                <Typography variant="caption">Followers</Typography>
                                                <Typography variant="subtitle1">{data.follower_count}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={4}
                                            xl={4} >
                                            <Box sx={styles.statsCard}>
                                                <Typography variant="caption">Following</Typography>
                                                <Typography variant="subtitle1">{data.following_count}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ display: 'flex', my: 2, p: 1 }}>
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
                                                    color={'neutral.4000'}>{data.likes || 10}</Typography>
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
                                                    color={'neutral.4000'}>{data.comments || 10}</Typography>
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
                                                    <ShareIcon />
                                                </SvgIcon>
                                                <Typography fontSize='10px'
                                                    marginX={1}>Shares</Typography>
                                                <Typography variant={'caption'}
                                                    color={'neutral.4000'}>{data.shares || 10}</Typography>
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
                                                    color={'neutral.4000'}>{data.reposts || 10}</Typography>
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
                                                    color={'neutral.4000'}>{data.saves || 10}</Typography>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </Box>
                            </>}
                        <Box sx={{ display: 'flex', color: 'neutral.4000', p: 1 }}>
                            <Box width={'50%'}>
                                <Typography variant="body2"
                                    sx={{ textAlign: 'start' }}
                                    component="div"
                                    gutterBottom>
                                    Upload Review
                                </Typography>
                            </Box>
                            <Box width={'50%'}
                                display={'flex'}
                                justifyContent={'flex-end'}>
                                <Link href={`/users/${userId}`}>
                                    <Typography variant="caption"
                                        sx={{ textAlign: 'end', mx: 0.5, color: 'neutral.5000' }}
                                        component="div"
                                        gutterBottom>
                                        See All
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', my: 2 }}>

                            {checkinLoading || !checkin ?
                                <Skeleton
                                    variant="rectangular"
                                    width={'100%'}
                                    height={100}
                                    sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                                <Grid container
                                    sx={{ justifyContent: 'start', alignItems: 'center' }}>
                                    {[1, 2, 3, 4, 5, 5].map((item, index) => (
                                        <Grid item
                                            xs={6}
                                            sm={6}
                                            md={4}
                                            lg={2}
                                            key={index}
                                            xl={2}>
                                            <Box sx={styles.review}>
                                                <img src={'/assets/review.png'}
                                                    alt="img"
                                                    style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>}
                        </Box>

                        <Box sx={{ display: 'flex', color: 'neutral.4000', p: 1 }}>
                            <Box width={'50%'}>
                                <Typography variant="body2"
                                    sx={{ textAlign: 'start' }}
                                    component="div"
                                    gutterBottom>
                                    Check Ins
                                </Typography>
                            </Box>
                            <Box width={'50%'}
                                display={'flex'}
                                justifyContent={'flex-end'}>
                                <Link href={`/users/${userId}`}>
                                    <Typography variant="caption"
                                        sx={{ textAlign: 'end', mx: 0.5, color: 'neutral.5000' }}
                                        component="div"
                                        gutterBottom>
                                        See All
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', my: 2, justifyContent: 'center', alignItems: 'center' }}>
                            {checkinLoading || !checkin ?
                                <Skeleton
                                    variant="rectangular"
                                    width={'100%'}
                                    height={100}
                                    sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                                <Grid container
                                    spacing={1}
                                    alignItems={'center'}
                                    justifyContent={'start'}>
                                    {checkin?.results.map((item, index) => (
                                        <Grid item
                                            key={index}
                                            xs={6}
                                            sm={6}
                                            md={4}
                                            lg={2}
                                            xl={2}>
                                            <Box sx={styles.review}>
                                                <img src={item.media || '/assets/checkin.png'}
                                                    alt="img"
                                                    style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>}
                        </Box>
                    </Box>
                </Grid>
            </Grid >
        </>

    )
}

export default Profileinfo

const styles = {
    statsCard: { padding: '30px', mx: 2, textAlign: 'center', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.4000' },
    poststat: { padding: '10px', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.5000' },
    review: { display: 'flex', justifyContent: 'space-evenly' }
}