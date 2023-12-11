import { Grid, Box, Typography, CardMedia } from '@mui/material';
import React from 'react'
import VideoCard from './components/videoCard'



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

    const activity = [
        { username: 'halenora12', action: 'liked the video', time: '3s' },
        { username: 'JohnDoe', action: 'commented on the video: Nice picture', time: '12s' },
        { username: 'halenora12', action: 'liked the video', time: '3s' },
        { username: 'JohnDoe', action: 'commented on the video: Nice picture', time: '12s' },
        { username: 'halenora12', action: 'liked the video', time: '3s' },
        { username: 'JohnDoe', action: 'commented on the video: Nice picture', time: '12s' },
        { username: 'halenora12', action: 'liked the video', time: '3s' },
        { username: 'JohnDoe', action: 'commented on the video: Nice picture', time: '12s' },
        { username: 'halenora12', action: 'liked the video', time: '3s' },
        { username: 'JohnDoe', action: 'commented on the video: Nice picture', time: '12s' },
        { username: 'halenora12', action: 'liked the video', time: '3s' },
        { username: 'JohnDoe', action: 'commented on the video: Nice picture', time: '12s' },
    ]

    return (
        <>
            <Typography variant="subtitle1"
                sx={{ color: 'neutral.4000', fontWeight: 'bold', mb: 2 }}>
                Latest Video
            </Typography>
            <Grid container>
                <Grid item
                    xs={12}
                    md={4}
                >
                    <VideoCard details={userDetails} />
                </Grid>
                <Grid item
                    xs={12}
                    md={8}
                    sx={{
                        bgcolor: 'neutral.2000',
                        overflow: "hidden",
                        overflowY: "scroll",
                        height: '500px',
                        borderRadius: 0.5,
                    }}>
                    {activity.map((item, index) => {
                        return (
                            <Box key={index}
                                sx={{ display: 'flex', m: 2, alignItems: 'center' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 40, width: 40, borderRadius: '50%' }}
                                    image="/assets/avatars/avatarmed.png"
                                    alt="green iguana"
                                />
                                <Box
                                    ml={3}
                                    color={'neutral.4000'}>
                                    <Typography variant="caption">
                                        {item.username}
                                    </Typography>
                                </Box>
                                <Box
                                    ml={1}
                                    color={'neutral.5000'}>
                                    <Typography variant="caption">
                                        {item.action}
                                    </Typography>
                                </Box>
                                <Box
                                    ml={1}
                                    color={'neutral.5000'}>
                                    <Typography variant="caption"
                                        fontWeight={'300'}>
                                        {item.time}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    })}
                </Grid>
            </Grid >
        </>
    )
}

export default profileinfo
