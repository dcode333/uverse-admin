import { Card, CardContent, Typography, Grid, Box, SvgIcon, CardMedia } from '@mui/material';
import Link from 'next/link';


const placeholder = "https://i.pinimg.com/originals/9d/ce/a0/9dcea054669b6e112699288b54321f57.jpg"

const BrandList = ({ data }) => {


    return (
        <Grid container
            sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }}>
            {data?.map((item, index) => (
                <Grid item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    key={index}>
                    {/* <Link href={`/brands/${item.id}`}
                        style={{ textDecoration: 'none' }}> */}
                    <Card sx={{ display: 'flex', borderRadius: 1, border: '0.5px solid gray', m: 1, bgcolor: 'transparent' }}>
                        <CardMedia
                            sx={{ height: 80, width: 130, alignSelf: 'center', margin: 1.2, borderRadius: '10px', objectFit: 'cover' }}

                            image={item?.cover_pic || placeholder}
                            title="brand"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <CardContent sx={{ color: 'neutral.4000' }}>
                                <Typography variant="body1">
                                    {item ? item.title.length <= 8 ? item.title : (item.title.substr(0, 8) + "...") : 'Brand'}
                                </Typography>
                                <Typography variant='caption'
                                    color={'neutral.1000'}>
                                    User
                                </Typography>
                                <Typography variant="body2">
                                    {item.username ? item.username.length <= 8 ? item.username : (item.username.substr(0, 8) + "...") : 'user'}
                                </Typography>
                            </CardContent>
                        </Box>

                    </Card>
                    {/* </Link> */}
                </Grid>
            ))}
        </Grid>
    );
};

export default BrandList;
