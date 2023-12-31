import React from 'react';
import { Box, Skeleton } from '@mui/material';

const PageSkeleton = () => {
    // Customize the number of lines and height as needed
    const lines = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <Box
            sx={{
                bgcolor: 'neutral.3000',
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            {lines.map((line) => (
                <Skeleton
                    key={line}
                    animation="pulse"
                    sx={{ m: 1, bgcolor: 'neutral.5000' }}
                    height={60}
                    width={'85%'} />
            ))}
        </Box>
    );
};

export default PageSkeleton;
