import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '../../components/skeleton'
import FailedToFetch from '../../components/fetchfail'
import EmptyResponse from '../../components/emptyresponse'
import { useCheckin } from 'src/api/checkin/useCheckin';
import Link from 'next/link';

function CheckIn(props) {

    const { authToken } = props;
    const { data: items, isError, isLoading } = useCheckin(authToken)


    if (isLoading) return <Skeleton />
    if (isError) return <FailedToFetch />


    return (
        <Grid
            container
            bgcolor={'neutral.2000'}
            borderRadius={0.5}>
            {items?.results.length === 0 ?
                <EmptyResponse /> :
                items?.results.map((item, index) => (
                    <Grid
                        item
                        key={index}
                        xs={12}
                        sm={6}
                        md={3}>
                        <Link href={`/checkins/${item.id}`}
                            style={{ textDecoration: 'none' }}>

                            <Card sx={{ backgroundColor: 'neutral.3000', m: 1, borderRadius: 1 }}>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image={item.media ? item.media : "/assets/errors/error-404.png"}
                                    title="Check-in"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="body1"
                                        color={'neutral.4000'}
                                        component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary">
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
        </Grid>
    );
}

export default CheckIn;
