import { Typography, Box, Grid, Skeleton } from '@mui/material';
import React from 'react'
import ClaimBadgeCard from './components/claimBadgeCard';
import { useUserBadge } from 'src/api/badge/useUserBadge';
import { useAuth } from 'src/hooks/use-auth';
import FailedToFetch from 'src/components/fetchfail'

function Badges({ userId }) {

    const { authToken } = useAuth();
    const { data, isLoading, isError } = useUserBadge({ userId, token: authToken });


    if (isError) return <FailedToFetch />

    return (
        <>
            <Box sx={{ display: 'flex', color: 'neutral.4000', p: 1, }}>
                <Box width={'50%'}>
                    <Typography variant="body2"
                        sx={{ textAlign: 'start' }}
                        component="div"
                        gutterBottom>
                        Claimed Badges
                    </Typography>
                </Box>
                <Box width={'50%'}
                    display={'flex'}
                    justifyContent={'flex-end'}>
                    <Typography variant="caption"
                        sx={{ textAlign: 'end', mx: 0.5 }}
                        component="div"
                        gutterBottom>
                        Total
                    </Typography>

                    <Typography variant="body2"
                        sx={{ textAlign: 'end', mx: 0.5 }}
                        component="div"
                        gutterBottom>
                        {data?.count}
                    </Typography>
                </Box>
            </Box>

            {/* Chips Remaining  */}
            {isLoading ?
                <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={200}
                    sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                <Grid container
                    spacing={2} >
                    {data?.results.map((item, index) => (
                        <Grid
                            item
                            key={index}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={12 / 5}>
                            <ClaimBadgeCard claimedBadge={{
                                title: item.title,
                                description: 'Lizards are a widespread group of squamate reptiles',
                                linkCreation: ['https://www.google.com'],
                                hashtags: ['hashtag1', 'hashtag2'],
                                quantity: 10,
                                media: item.media
                            }} />
                        </Grid>
                    ))}
                </Grid>}

            <Box sx={{ height: 10, my: 3, bgcolor: 'neutral.2000', borderRadius: 5 }} />
            <Box sx={{ display: 'flex', color: 'neutral.4000', p: 1, }}>
                <Box width={'50%'}>
                    <Typography variant="body2"
                        sx={{ textAlign: 'start' }}
                        component="div"
                        gutterBottom>
                        Badges To Claim
                    </Typography>
                </Box>
            </Box>
            {/* Chips Remaining  */}
            {isLoading ?
                <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={200}
                    sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }} /> :
                <Grid container
                    spacing={2} >
                    {data?.results.map((item, index) => (
                        <Grid
                            item
                            key={index}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={12 / 5}>
                            <ClaimBadgeCard claimedBadge={{
                                title: item.title,
                                description: 'Lizards are a widespread group of squamate reptiles',
                                linkCreation: ['https://www.google.com'],
                                hashtags: ['hashtag1', 'hashtag2'],
                                quantity: 10,
                                media: item.media
                            }} />
                        </Grid>
                    ))}
                </Grid>}

            <Box sx={{ height: 10, my: 3, bgcolor: 'neutral.2000', borderRadius: 5 }} />

        </>
    )
}

export default Badges