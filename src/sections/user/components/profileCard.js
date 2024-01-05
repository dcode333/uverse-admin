import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Chip } from '@mui/material';
import Link from 'next/link';
import { formatDate } from 'src/utils/format-date';


const placeholder = '/assets/avatars/avatarmed.png'
function ProfileCard(props) {
    const { data } = props;
    return (
        <Card sx={{ maxWidth: 345, minHeight: 550, borderRadius: 1, color: 'neutral.5000', bgcolor: 'neutral.2000' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }} >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} >
                    <CardMedia
                        component="img"
                        sx={{ height: 80, width: 80, borderRadius: '50%', mx: 1 }}
                        image={data?.profile?.profile_pic || placeholder}
                        alt="green iguana"
                    />
                    <CardMedia
                        component="img"
                        sx={{ height: 40, width: 40, borderRadius: '50%' }}
                        image={data?.profile?.profile_pic || placeholder}
                        alt="green iguana"
                    />
                </Box>
                <Typography gutterBottom
                    fontSize={'10px'}
                    marginTop={2}
                    component="div">
                    Joined In {formatDate(data.created_at)}
                </Typography>
            </Box>
            <CardContent>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography
                            gutterBottom
                            fontSize={'10px'}
                            component="div">
                            Username*
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        <Typography
                            gutterBottom
                            fontSize={'11px'}
                            component="div">
                            {data.username || 'N/A'}
                        </Typography>
                    </Box >
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography
                            gutterBottom
                            fontSize={'10px'}
                            component="div">
                            Email Address*
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        <Typography
                            gutterBottom
                            fontSize={'11px'}
                            component="div">
                            {data.email}
                        </Typography>
                    </Box >
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography
                            gutterBottom
                            fontSize={'10px'}
                            component="div">
                            Phone Number*
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        <Typography
                            gutterBottom
                            fontSize={'11px'}
                            component="div">
                            {data.number || 'N/A'}
                        </Typography>
                    </Box >
                </Box>
                {data.age &&
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: '40%', my: 1 }}>
                            <Typography
                                gutterBottom
                                fontSize={'10px'}
                                component="div">
                                Age*
                            </Typography>
                        </Box >

                        <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                            <Typography
                                gutterBottom
                                fontSize={'11px'}
                                component="div">
                                {data.age}
                            </Typography>
                        </Box >
                    </Box>}
                {data.gender &&
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: '40%', my: 1 }}>
                            <Typography
                                gutterBottom
                                fontSize={'10px'}
                                component="div">
                                Gender*
                            </Typography>
                        </Box >

                        <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                            <Typography
                                gutterBottom
                                fontSize={'11px'}
                                component="div">
                                {data.gender}
                            </Typography>
                        </Box >
                    </Box>}
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography
                            gutterBottom
                            fontSize={'10px'}
                            component="div">
                            Bio
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        <Typography
                            gutterBottom
                            fontSize={'11px'}
                            component="div">
                            {data?.profile?.bio || 'N/A'}
                        </Typography>
                    </Box >
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography
                            gutterBottom
                            fontSize={'10px'}
                            component="div">
                            Social Links
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        {data?.profile?.user_links.map((item, index) => (
                            <Link
                                target='_blank'
                                href={item.url}
                                key={index}
                                replace={false}
                            >
                                <Chip variant="outlined"
                                    size="small"
                                    label={item.link_type}
                                    sx={{
                                        borderRadius: 0.5, color: 'neutral.4000', fontSize: '8px', m: 0.5, '&:hover': {
                                            borderColor: 'neutral.1000',
                                            color: 'neutral.1000'
                                        },
                                    }} />
                            </Link>
                        ))}
                    </Box >
                </Box>
                {data?.profile?.interest &&
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: '40%', my: 1 }}>
                            <Typography
                                gutterBottom
                                fontSize={'10px'}
                                component="div">
                                Interests
                            </Typography>
                        </Box >

                        <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                            {data?.profile?.interest?.map((item, index) => (
                                <Chip variant="outlined"
                                    size="small"
                                    key={index}
                                    label={item.name}
                                    sx={{ borderRadius: 0.5, color: 'neutral.4000', fontSize: '8px', m: 0.5 }} />
                            ))}
                        </Box >
                    </Box>}
            </CardContent>

        </Card>
    )
}

export default ProfileCard