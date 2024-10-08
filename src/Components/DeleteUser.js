import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';


function DeleteUser({deleteModal, handleCloseDeleteModal, handleDelete, userid}) {
  return (
    <div>
    <Modal
     open={deleteModal}
     onClose={handleCloseDeleteModal}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
    >
    <Box className='user-delete-container'>
    <div>Are you sure you want to delete the user?</div>
    <Stack spacing={2} direction="row">
    <Button  onClick={() => handleDelete(userid)} variant="contained" size="small" sx={{fontSize: '0.55rem', minWidth: '25px', backgroundColor: 'red', color: 'white' }} >Delete</Button>
    <Button onClick={handleCloseDeleteModal} variant="contained" size="small" sx={{fontSize: '0.55rem', minWidth: '25px', color: 'white' }}>Close</Button>
    </Stack>
        </Box>
    </Modal>
    </div>
  )
}

export default DeleteUser