import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Chip } from '@mui/material';

function ProfileCard(props) {
    const { details } = props;
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 1, color: 'neutral.5000', bgcolor: 'neutral.2000' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }} >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} >
                    <CardMedia
                        component="img"
                        sx={{ height: 80, width: 80, borderRadius: '50%', mx: 1 }}
                        image="/assets/avatars/avatarmed.png"
                        alt="green iguana"
                    />
                    <CardMedia
                        component="img"
                        sx={{ height: 40, width: 40, borderRadius: '50%' }}
                        image="/assets/avatars/avatarmed.png"
                        alt="green iguana"
                    />
                </Box>
                <Typography gutterBottom fontSize={'10px'} marginTop={2} component="div">
                    Joined In sep 2023
                </Typography>
            </Box>
            <CardContent>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography gutterBottom fontSize={'10px'} component="div">
                            Username*
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        <Typography gutterBottom fontSize={'11px'} component="div">
                            {details.username}
                        </Typography>
                    </Box >
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography gutterBottom fontSize={'10px'} component="div">
                            Email Address*
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        <Typography gutterBottom fontSize={'11px'} component="div">
                            {details.email}
                        </Typography>
                    </Box >
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography gutterBottom fontSize={'10px'} component="div">
                            Phone Number*
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        <Typography gutterBottom fontSize={'11px'} component="div">
                            {details.contact}
                        </Typography>
                    </Box >
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography gutterBottom fontSize={'10px'} component="div">
                            Age*
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        <Typography gutterBottom fontSize={'11px'} component="div">
                            {details.age}
                        </Typography>
                    </Box >
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography gutterBottom fontSize={'10px'} component="div">
                            Gender*
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        <Typography gutterBottom fontSize={'11px'} component="div">
                            {details.gender}
                        </Typography>
                    </Box >
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography gutterBottom fontSize={'10px'} component="div">
                            Bio
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        <Typography gutterBottom fontSize={'11px'} component="div">
                            {details?.bio}
                        </Typography>
                    </Box >
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography gutterBottom fontSize={'10px'} component="div">
                            Social Links
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        {details?.socialLinks?.map((item, index) => (
                            <Typography key={index} gutterBottom fontSize={'10px'} component="div">
                                {item}
                            </Typography>))
                        }
                    </Box >
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '40%', my: 1 }}>
                        <Typography gutterBottom fontSize={'10px'} component="div">
                            Interests
                        </Typography>
                    </Box >

                    <Box sx={{ width: '60%', color: 'neutral.4000', my: 1 }}>
                        {details?.interests?.map((item, index) => (
                            <Chip variant="outlined" size="small" key={index} label={item} sx={{ borderRadius: 0.5, color: 'neutral.4000', fontSize: '8px', m: 0.5 }} />
                        ))}
                    </Box >
                </Box>
            </CardContent>

        </Card>
    )
}

export default ProfileCard