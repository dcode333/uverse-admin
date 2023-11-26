import { Grid, Box, Typography, Card, CardContent, Paper } from '@mui/material';
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


function profileinfo() {
    const userDetails = {
        'username': 'halenora12',
        'email': 'halenora12@gmail.com',
        'contact': '0123456789',
        'age': '26',
        'gender': 'Female',
        'bio': 'Lorem ipsum is am latvim jarin ipso facto',
        'socialLinks': ['https://www.facebook.com/', 'https://www.instagram.com/'],
        'interests': ['Travel', 'Food', 'Music', 'History'],
        'followers': '12',
        'following': '12',
        'uploads': '12',
        'checkins': '12',
        'likes': '12',
        'comments': '12',
        'shares': '12',
        'reposts': '12',
        'saves': '12',
    }

    return (
        <Grid container>
            <Grid item
                xs={12}
                md={4}>
                <ProfileCard details={userDetails} />
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
                                    <Typography variant="subtitle1">{userDetails.uploads}</Typography>
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
                                    <Typography variant="subtitle1">{userDetails.followers}</Typography>
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
                                    <Typography variant="subtitle1">{userDetails.following}</Typography>
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
                                    <Typography fontSize='10px' marginX={1}>Likes</Typography>
                                    <Typography variant={'caption'} color={'neutral.4000'}>{userDetails.likes}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Box sx={styles.poststat}>
                                    <SvgIcon fontSize=''>
                                        <CommentIcon />
                                    </SvgIcon>
                                    <Typography fontSize='10px' marginX={1}>Comments</Typography>
                                    <Typography variant={'caption'} color={'neutral.4000'}>{userDetails.comments}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Box sx={styles.poststat}>
                                    <SvgIcon fontSize=''>
                                        <ShareIcon />
                                    </SvgIcon>
                                    <Typography fontSize='10px' marginX={1}>Shares</Typography>
                                    <Typography variant={'caption'} color={'neutral.4000'}>{userDetails.shares}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Box sx={styles.poststat}>
                                    <SvgIcon fontSize=''>
                                        <RepostIcon />
                                    </SvgIcon>
                                    <Typography fontSize='10px' marginX={1}>Reposts</Typography>
                                    <Typography variant={'caption'} color={'neutral.4000'}>{userDetails.reposts}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Box sx={styles.poststat}>
                                    <SvgIcon fontSize=''>
                                        <SavedIcon />
                                    </SvgIcon>
                                    <Typography fontSize='10px' marginX={1}>Saves</Typography>
                                    <Typography variant={'caption'} color={'neutral.4000'}>{userDetails.saves}</Typography>
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', color: 'neutral.4000', p: 1 }}>
                        <Box width={'50%'}>
                            <Typography variant="body2" sx={{ textAlign: 'start' }} component="div" gutterBottom>
                                Upload Review
                            </Typography>
                        </Box>
                        <Box width={'50%'} display={'flex'} justifyContent={'flex-end'}>
                            <Link href={`/userdetail`}>
                                <Typography variant="caption" sx={{ textAlign: 'end', mx: 0.5, color: 'neutral.5000' }} component="div" gutterBottom>
                                    See All
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', my: 2 }}>
                        <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Box sx={styles.review}>
                                    <img src={'/assets/review.png'} alt="img"
                                        style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Box sx={styles.review}>
                                    <img src={'/assets/review.png'} alt="img"
                                        style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Box sx={styles.review}>
                                    <img src={'/assets/review.png'} alt="img"
                                        style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Box sx={styles.review}>
                                    <img src={'/assets/review.png'} alt="img"
                                        style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Box sx={styles.review}>
                                    <img src={'/assets/review.png'} alt="img"
                                        style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', color: 'neutral.4000', p: 1 }}>
                        <Box width={'50%'}>
                            <Typography variant="body2" sx={{ textAlign: 'start' }} component="div" gutterBottom>
                                Check Ins
                            </Typography>
                        </Box>
                        <Box width={'50%'} display={'flex'} justifyContent={'flex-end'}>
                            <Link href={`/userdetail`}>
                                <Typography variant="caption" sx={{ textAlign: 'end', mx: 0.5, color: 'neutral.5000' }} component="div" gutterBottom>
                                    See All
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', my: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container spacing={1} alignItems={'center'} justifyContent={'center'}>
                            <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Box sx={styles.review}>
                                    <img src={'/assets/checkin.png'} alt="img"
                                        style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Box sx={styles.review}>
                                    <img src={'/assets/checkin.png'} alt="img"
                                        style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Box sx={styles.review}>
                                    <img src={'/assets/checkin.png'} alt="img"
                                        style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Box sx={styles.review}>
                                    <img src={'/assets/checkin.png'} alt="img"
                                        style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Box sx={styles.review}>
                                    <img src={'/assets/checkin.png'} alt="img"
                                        style={{ width: '5rem', height: '5rem', borderRadius: 0.1 }} />
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid >
    )
}

export default profileinfo

const styles = {
    statsCard: { padding: '30px', mx: 2, textAlign: 'center', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.4000' },
    poststat: { padding: '10px', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', bgcolor: 'neutral.2000', borderRadius: 0.5, color: 'neutral.5000' },
    review: { display: 'flex', justifyContent: 'space-evenly' }
}