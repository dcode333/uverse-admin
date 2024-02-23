import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Modal, Snackbar } from '@mui/material';
import Link from 'next/link';

import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import Skeleton from '../../components/skeleton'
import FailedToFetch from '../../components/fetchfail'
import EmptyResponse from '../../components/emptyresponse'
import { useLibraries, useDeleteLibraryItem } from 'src/api/library3d/useLibrary';



function Library(props) {

    const { authToken } = props;
    const { data: items, isError, isLoading, refetch, isRefetching } = useLibraries(authToken)
    const { mutateAsync, isPending } = useDeleteLibraryItem()

    const [deleteConfirmationItem, setDeleteConfirmationItem] = useState({});
    const [itemsIntiatedToDelete, setItemsIntiatedToDelete] = useState([]);
    const [deletionFailed, setDeletionFailed] = useState(false)
    const [openModal, setOpenModal] = useState(false);

    const handleModalOpen = ({ id, title }) => { setDeleteConfirmationItem({ id, title }); setOpenModal(true) };
    const handleModalClose = () => setOpenModal(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setDeletionFailed(false)
    };

    const handleDelete = async () => {
        try {
            setOpenModal(false)
            setItemsIntiatedToDelete([...itemsIntiatedToDelete, deleteConfirmationItem.id])
            await mutateAsync({ token: authToken, libraryId: deleteConfirmationItem.id })
            refetch()
        } catch (err) { setDeletionFailed(true) }
    }

    if (isLoading) return <Skeleton />
    if (isError) return <FailedToFetch />


    return (
        <>
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
                            <Card sx={{ backgroundColor: 'neutral.3000', m: 1, borderRadius: 1, position: 'relative' }}>
                                <LoadingButton
                                    variant="contained"
                                    loading={
                                        itemsIntiatedToDelete.includes(item.id) ? isPending || isRefetching : false
                                    }
                                    size='small'
                                    sx={{ borderRadius: 1, position: 'absolute', top: 5, left: 10, zIndex: 10 }}
                                    color="error"
                                    startIcon={<TrashIcon height={18} />}
                                    onClick={() => handleModalOpen({ id: item.id, title: item.title })}
                                >
                                    Delete
                                </LoadingButton>
                                <Link href={`/libraries/${item.id}`}
                                    style={{ textDecoration: 'none' }}>
                                    <CardMedia
                                        sx={{ height: 200 }}
                                        image={item.media ? item.media[0]?.media : "/assets/errors/error-404.png"}
                                        title="library"
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
                                </Link>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            <Snackbar open={deletionFailed}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%' }}>
                    Deletion Failed
                </Alert>
            </Snackbar>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'neutral.3000',
                    color: 'neutral.4000',
                    width: 400,
                    boxShadow: 24,
                    borderRadius: 1,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title"
                        variant="h6"
                        component="h2">
                        {` Do you want to delete "${deleteConfirmationItem.title}" Library ?`}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <LoadingButton
                            variant="contained"
                            size='small'
                            sx={{ borderRadius: 1, mr: 2, my: 3 }}
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete
                        </LoadingButton>
                        <LoadingButton
                            variant="contained"
                            size='small'
                            sx={{ borderRadius: 1, my: 3, bgcolor: 'gray' }}
                            onClick={handleModalClose}
                        >
                            Cancel
                        </LoadingButton>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default Library;
