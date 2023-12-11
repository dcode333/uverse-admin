import { Box, Typography } from '@mui/material'
import React from 'react'
import { SvgIcon } from '@mui/material';
import ArrowDownIcon from '@heroicons/react/24/outline/HandThumbUpIcon';
import BubbleChatLeft from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import Bookmark from '@heroicons/react/24/outline/BookmarkIcon';
import Send from '@heroicons/react/24/outline/PaperAirplaneIcon';

function videoCard(props) {
    const { details } = props
    return (
        <Box
            sx={{
                backgroundImage: "url(" + "/assets/carbg.jpg" + ")",
                // Replace 'your-image-url.jpg' with your image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '500px', // Set height or adjust as needed
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: 1,
                mx: 1.5,
                mb: 2,
                color: 'neutral.4000',
                borderRadius: 0.5,
            }}
        >
            <Box m={2}>
                <Box
                    sx={styles.iconsStyle}
                >
                    <SvgIcon fontSize='medium'>
                        <ArrowDownIcon />
                    </SvgIcon>
                    <Typography variant='caption'>
                        {details.likes}
                    </Typography>
                </Box>
                <Box
                    sx={styles.iconsStyle} >
                    <SvgIcon fontSize='medium'>
                        <BubbleChatLeft />
                    </SvgIcon>
                    <Typography variant='caption'>
                        {details.comments}
                    </Typography>
                </Box>
                <Box
                    sx={styles.iconsStyle} >
                    <SvgIcon fontSize='medium'>
                        <Bookmark />
                    </SvgIcon>
                    <Typography variant='caption'>
                        {details.saves}
                    </Typography>
                </Box>
                <Box
                    sx={styles.iconsStyle}>
                    <SvgIcon fontSize='medium'>
                        <Send />
                    </SvgIcon>
                    <Typography variant='caption'>
                        {details.shares}
                    </Typography>
                </Box>


            </Box>
            <Box sx={{ px: 3 }}>
                <Typography variant='caption'>
                    3 hours ago
                </Typography>
            </Box>

        </Box>
    )
}


const styles = {
    iconsStyle: { display: 'flex', flexDirection: 'column', alignItems: 'center', my: 1.5 }
}

export default videoCard