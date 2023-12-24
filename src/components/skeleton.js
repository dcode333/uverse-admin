import React from 'react';
import { Skeleton } from '@mui/material';

const PageSkeleton = () => {
    // Customize the number of lines and height as needed
    const lines = Array.from({ length: 10 }, (_, index) => index + 1);

    return (
        <div>
            {lines.map((line) => (
                <Skeleton
                    key={line}
                    animation="wave"
                    height={20}
                    style={{ marginBottom: 8 }} />
            ))}
        </div>
    );
};

export default PageSkeleton;
