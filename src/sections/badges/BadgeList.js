import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

function BadgeList(props) {
    const { items } = props;

    return (
        <Grid container
            spacing={1}
            alignItems={'center'}
        // justifyContent={'center'}
        >
            {items.map((item, index) => (
                <Grid item
                    key={index}
                    xs={12}
                    sm={6}
                    md={3}
                    lg={12 / 5}>
                    <Card sx={{ backgroundColor: 'neutral.3000', m: 1, borderRadius: 0.5 }}>
                        <CardMedia
                            sx={{ height: 180 }}
                            image="/assets/checkin.png"
                            title="green iguana"
                        />
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default BadgeList;
