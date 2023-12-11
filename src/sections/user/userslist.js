import { Card, CardContent, Typography, Grid, Box, SvgIcon } from '@mui/material';
import LikeIcon from '@heroicons/react/24/outline/HandThumbUpIcon';
import CommentIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import Link from 'next/link';


const UserList = ({ data }) => {
    return (
        <Grid container
            sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }}>
            {data?.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                    <Link href={`/userdetail`} style={{ textDecoration: 'none' }}>
                        <Card sx={{ display: 'flex', borderRadius: 1, border: '0.5px solid gray', m: 1, bgcolor: 'transparent' }}>
                            <img src={item.img} alt="img"
                                style={{ width: '5rem', height: '5rem', alignSelf: 'center', margin: 10 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <CardContent sx={{ color: 'neutral.4000' }}>
                                    <Typography variant="body1">
                                        {item.userName}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <SvgIcon fontSize="1px" sx={{ m: 1 / 2 }}>
                                                <LikeIcon />
                                            </SvgIcon>
                                            <Typography variant="caption">
                                                {item.likes}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <SvgIcon fontSize="1px" sx={{ m: 1 / 2 }}>
                                                <CommentIcon />
                                            </SvgIcon>
                                            <Typography variant="caption">
                                                {item.comments}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <SvgIcon fontSize="1px" sx={{ m: 1 / 2 }}>
                                                <ShareIcon />
                                            </SvgIcon>
                                            <Typography variant="caption">
                                                {item.shares}
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
