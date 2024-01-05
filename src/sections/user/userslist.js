import { Card, CardContent, Typography, Grid, Box, SvgIcon, CardMedia } from '@mui/material';
import LikeIcon from '@heroicons/react/24/outline/HandThumbUpIcon';
import CommentIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import Link from 'next/link';

const placeholder = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"

const UserList = ({ data }) => {

    return (
        <Grid container
            sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }}>
            {data?.map((item, index) => (
                <Grid item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}
                    key={index}>
                    <Link href={`/users/${item.id}`}
                        style={{ textDecoration: 'none' }}>
                        <Card sx={{ display: 'flex', borderRadius: 1, border: '0.5px solid gray', m: 1, bgcolor: 'transparent' }}>
                            <CardMedia
                                sx={{ height: 80, width: 110, alignSelf: 'center', margin: 1.2, borderRadius: '10px', objectFit: 'cover' }}

                                image={item.profile?.profile_pic || placeholder}
                                title="Check-in"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <CardContent sx={{ color: 'neutral.4000' }}>
                                    <Typography variant="body1">
                                        {item.username ? item.username.length <= 15 ? item.username : (item.username.substr(0, 15) + "...") : 'user'}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <SvgIcon fontSize="1px"
                                                sx={{ m: 1 / 2 }}>
                                                <LikeIcon />
                                            </SvgIcon>
                                            <Typography variant="caption">
                                                {item.likes || 10}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <SvgIcon fontSize="1px"
                                                sx={{ m: 1 / 2 }}>
                                                <CommentIcon />
                                            </SvgIcon>
                                            <Typography variant="caption">
                                                {item.comments || 10}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <SvgIcon fontSize="1px"
                                                sx={{ m: 1 / 2 }}>
                                                <ShareIcon />
                                            </SvgIcon>
                                            <Typography variant="caption">
                                                {item.shares || 10}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Box>

                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default UserList;
