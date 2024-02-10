import { Card, CardContent, Typography, Grid, Box, SvgIcon, CardMedia } from '@mui/material';
import Link from 'next/link';

import Skeleton from '../../components/skeleton'
import FailedToFetch from '../../components/fetchfail'
import Emptyresponse from '../../components/emptyresponse'
import { useDeclinedBrand } from 'src/api/brand/usegetBrand';


const placeholder = "https://i.pinimg.com/originals/9d/ce/a0/9dcea054669b6e112699288b54321f57.jpg"

const BrandList = ({ authToken }) => {

    const { data, isLoading, isError } = useDeclinedBrand({ token: authToken });

    if (isLoading) return <Skeleton />
    if (isError) return <FailedToFetch />
    if (data?.results.length < 1) return <Emptyresponse />

    return (
        <Grid container
            sx={{ bgcolor: 'neutral.2000', borderRadius: 1 }}>
            {data?.results.map((item, index) => (
                <Grid item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}
                    key={index}>
                    <Link href={`/brands/${item.id}`}
                        style={{ textDecoration: 'none' }}>
                        <Card sx={{ display: 'flex', borderRadius: 1, border: '0.5px solid gray', m: 1, bgcolor: 'transparent' }}>
                            <CardMedia
                                sx={{ height: 90, width: 120, alignSelf: 'center', margin: 1.2, borderRadius: '10px', objectFit: 'cover' }}

                                image={item.brand_profile?.cover_pic || placeholder}
                                title="brand"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <CardContent sx={{ color: 'neutral.4000' }}>
                                    <Typography variant="body1">
                                        {item.brand_profile ? item.brand_profile.title.length <= 15 ? item.brand_profile.title : (item.brand_profile.title.substr(0, 15) + "...") : 'Brand'}
                                    </Typography>
                                    <Typography variant='caption'
                                        color={'neutral.1000'}>
                                        User
                                    </Typography>
                                    <Typography variant="body2">
                                        {item.username ? item.username.length <= 15 ? item.username : (item.username.substr(0, 15) + "...") : 'user'}
                                    </Typography>
                                </CardContent>
                            </Box>

                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default BrandList;
