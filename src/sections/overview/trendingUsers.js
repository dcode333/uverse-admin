import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Avatar } from '@mui/material';
import ArchiIcon from '@heroicons/react/24/outline/BookmarkIcon';
import RepostIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import { SvgIcon } from '@mui/material';

const YourTableComponent = ({ data }) => {
    return (
        <TableContainer component={Paper} sx={{ bgcolor: 'neutral.2000' }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead  >
                    <TableRow >
                        <TableCell>USER NAME</TableCell>
                        <TableCell>Badges</TableCell>
                        <TableCell>Creations</TableCell>
                        <TableCell>CheckIns</TableCell>
                        <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                Archieved
                                <SvgIcon fontSize="small" sx={{ ml: 1 / 2 }}>
                                    <ArchiIcon />
                                </SvgIcon>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                Reposts
                                <SvgIcon fontSize="small" sx={{ ml: 1 / 2 }}>
                                    <RepostIcon />
                                </SvgIcon>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} >
                            <TableCell sx={{ color: 'neutral.5000', borderBottom: '0.5px solid #000000', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar src={row.img} sx={{ width: 25, height: 25 }} /> {/* Replace with actual image source */}
                                    <span style={{ marginLeft: '12px' }}>{row.userName}</span>
                                </div>
                            </TableCell>
                            <TableCell sx={{ color: 'neutral.5000', borderBottom: '0.5px solid #000000' }}>{row.badges}</TableCell>
                            <TableCell sx={{ color: 'neutral.5000', borderBottom: '0.5px solid #000000' }}>{row.creations}</TableCell>
                            <TableCell sx={{ color: 'neutral.5000', borderBottom: '0.5px solid #000000' }}>{row.checkIns}</TableCell>
                            {/* Add logic to display logos */}
                            <TableCell sx={{ color: 'neutral.5000', borderBottom: '0.5px solid #000000' }}>
                                {row.archieved}
                            </TableCell>
                            <TableCell sx={{ color: 'neutral.5000', borderBottom: '0.5px solid #000000' }}>
                                {row.reposts}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default YourTableComponent;
