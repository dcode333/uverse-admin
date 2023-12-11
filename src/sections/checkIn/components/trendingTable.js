import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Avatar, Button } from '@mui/material';


const TrendingUsers = ({ data }) => {
    return (
        <TableContainer component={Paper}
            sx={{ bgcolor: 'neutral.2000' }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead  >
                    <TableRow sx={{ borderBottom: '0.5px solid gray' }} >
                        <TableCell>Check-In</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>User Engagement</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row, index) => (
                        <TableRow key={index} >
                            <TableCell sx={{ color: 'neutral.5000', borderBottom: '0.5px solid #000000', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar src={row.img}
                                        sx={{ width: 25, height: 25 }} />
                                    <span style={{
                                        marginLeft: '12px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        width: '120px',
                                    }}>{row.title}</span>
                                </div>
                            </TableCell>
                            <TableCell sx={{ color: 'neutral.5000', borderBottom: '0.5px solid #000000' }}>{row.type}</TableCell>
                            <TableCell sx={{ color: 'neutral.5000', borderBottom: '0.5px solid #000000' }}>{row.userEngagement}</TableCell>
                            <TableCell sx={{ color: 'neutral.5000', borderBottom: '0.5px solid #000000' }}>
                                <Button variant="outlined"
                                    size='small'
                                    color='info'>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TrendingUsers;
