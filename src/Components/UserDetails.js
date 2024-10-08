import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function UserDetails({ open, handleClose, user }) {
  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
      className='modal'
    >
      <Box className='user-details-container'>
        <h2 id="user-modal-title">{user.name}'s Details</h2>
        <div style={{display:'flex', flexDirection:'column'}}>
        <p><strong className='user-details'>Email:</strong> {user.email}</p>
        <p><strong className='user-details'>Phone:</strong> {user.phone}</p>
        <p><strong className='user-details'>Website:</strong> {user.website}</p>
        <p><strong className='user-details'>Company:</strong> {user.company.name}</p>
        <p><strong className='user-details'>Address:</strong> {user.address.street}, {user.address.city}</p>
        </div>
        <button className='close-btn' onClick={handleClose}>Close</button>
      </Box>
    </Modal>
  );
}

export default UserDetails;
