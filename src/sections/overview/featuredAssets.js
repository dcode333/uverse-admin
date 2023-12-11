import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function FeaturedAssets(props) {
    const { items } = props;

    return (
        <Grid container spacing={1} bgcolor={'neutral.2000'} alignItems={'center'} justifyContent={'center'}>
            {items.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: 'neutral.3000', m: 1, borderRadius: 1 }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image="/assets/featuredAsset.png"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body1" color={'neutral.4000'} component="div">
                                {item.title} {/* Replace with dynamic title */}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description} {/* Replace with dynamic description */}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default FeaturedAssets;
