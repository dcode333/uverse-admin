import { Typography, Box, Grid } from '@mui/material';
import React from 'react'
import ClaimBadgeCard from './components/claimBadgeCard';

function badges() {
    return (
        <>
            <Box sx={{ display: 'flex', color: 'neutral.4000', p: 1, }}>
                <Box width={'50%'}>
                    <Typography variant="body2" sx={{ textAlign: 'start' }} component="div" gutterBottom>
                        Claimed Badges
                    </Typography>
                </Box>
                <Box width={'50%'} display={'flex'} justifyContent={'flex-end'}>
                    <Typography variant="caption" sx={{ textAlign: 'end', mx: 0.5 }} component="div" gutterBottom>
                        Total
                    </Typography>

                    <Typography variant="body2" sx={{ textAlign: 'end', mx: 0.5 }} component="div" gutterBottom>
                        {24}
                    </Typography>
                </Box>
            </Box>

            {/* Chips Remaining  */}
            <Grid container spacing={2} >
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={12 / 5}>
                        <ClaimBadgeCard claimedBadge={{
                            title: 'Darkhouse Malton',
                            description: 'Lizards are a widespread group of squamate reptiles',
                            linkCreation: ['https://www.google.com'],
                            hashtags: ['hashtag1', 'hashtag2'],
                            quantity: 10,
                        }} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ height: 10, my: 3, bgcolor: 'neutral.2000', borderRadius: 5 }} />
            <Box sx={{ display: 'flex', color: 'neutral.4000', p: 1, }}>
                <Box width={'50%'}>
                    <Typography variant="body2" sx={{ textAlign: 'start' }} component="div" gutterBottom>
                        Badges To Claim
                    </Typography>
                </Box>
            </Box>
            {/* Chips Remaining  */}
            <Grid container spacing={2} >
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={12 / 5}>
                        <ClaimBadgeCard claimedBadge={{
                            title: 'Darkhouse Malton',
                            description: 'Lizards are a widespread group of squamate reptiles',
                            linkCreation: ['https://www.google.com'],
                            hashtags: ['hashtag1', 'hashtag2'],
                            requiredAchievements: 'Info',
                            requiredTokens: 500
                        }} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ height: 10, my: 3, bgcolor: 'neutral.2000', borderRadius: 5 }} />

        </>
    )
}

export default badges