import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip } from '@mui/material';
import { Box } from '@mui/system';

function claimBadgeCard(props) {
    const { claimedBadge } = props
    return (
        <Card sx={{ borderRadius: 0.3 }}>
            <CardActionArea>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1 }}>
                    <Typography fontSize={'0.5rem'} fontWeight={'800'} component="div" gutterBottom>
                        {claimedBadge.title}
                    </Typography>

                    <CardMedia
                        component="img"
                        height="150"
                        width="180"
                        image="/assets/badges.png"
                        alt="green iguana"
                    />
                    {/* <Box sx={{ display: 'inline-block', position: 'absolute', bottom: '110px', right: '15px' }}>
                        <Chip label="Claim" color="success" size="small"
                            sx={{ fontSize: '8px', borderRadius: 0.5 }}
                        />
                    </Box> */}
                </Box>
                <CardContent>
                    <Box sx={{ display: 'flex' }}>
                        <Typography gutterBottom fontSize={'7px'} fontWeight={'800'} component="div">
                            Description:
                        </Typography>
                        <Typography gutterBottom fontSize={'7px'} ml={0.5} component="div">
                            {claimedBadge.description}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Typography gutterBottom fontSize={'7px'} fontWeight={'800'} component="div">
                            Linked Creation:
                        </Typography>
                        {claimedBadge.linkCreation.map((link, index) => (
                            <Typography key={index} gutterBottom fontSize={'7px'} ml={0.5} component="div">
                                {link}
                            </Typography>
                        ))}

                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Typography gutterBottom fontSize={'7px'} fontWeight={'800'} component="div">
                            Hashtags:
                        </Typography>
                        {claimedBadge.hashtags.map((link, index) => (
                            <Typography key={index} gutterBottom fontSize={'7px'} ml={0.5} component="div">
                                #{link}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Typography gutterBottom fontSize={'7px'} fontWeight={'800'} component="div">
                            Quantity:
                        </Typography>
                        <Typography gutterBottom fontSize={'7px'} ml={0.5} component="div">
                            {claimedBadge.quantity ? claimedBadge.quantity : 'N/A'}
                        </Typography>
                    </Box>
                    {claimedBadge.requiredAchievements ? (<Box sx={{ display: 'flex' }}>
                        <Typography gutterBottom fontSize={'7px'} fontWeight={'800'} component="div">
                            Achievements Required:
                        </Typography>

                        <Typography gutterBottom fontSize={'7px'} ml={0.5} component="div">
                            {claimedBadge.requiredAchievements}
                        </Typography>
                    </Box>) : null}

                    {claimedBadge.requiredTokens ? (<Box sx={{ display: 'flex' }}>
                        <Typography gutterBottom fontSize={'7px'} fontWeight={'800'} component="div">
                            Tokens Required:
                        </Typography>

                        <Typography gutterBottom fontSize={'7px'} ml={0.5} component="div">
                            {claimedBadge.requiredTokens}
                        </Typography>
                    </Box>) : null}

                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default claimBadgeCard