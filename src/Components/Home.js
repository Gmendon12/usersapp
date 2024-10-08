import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddUser from './AddUser';
import EditUser from './EditUser';
import UserDetails from './UserDetails';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteUser from './DeleteUser';

const AlertSnackbar = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 1300, // Ensure the modal is on top
  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
};

function Home() {

  const[users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false)
  const [searchName,setSearchName] = useState('')
  const [searchEmail,setSearchEmail] = useState('')
  const [searchTel,setSearchTel] = useState('')
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [deleteModal, setDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleSnackbarOpen = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(()=>{
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setError(null); // Reset error on success
        handleSnackbarOpen('Users details fetched successfully!', 'success')
      } catch (error) {
        console.error("Error fetching users details:", error);
        setError("Failed to fetch users. Please try again later.");
        handleSnackbarOpen('Failed to fetch users.', 'error'); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  },[])

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (updatedUser) => {
    if (updatedUser.id >= 10000) {
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUser(null);
      handleSnackbarOpen('User updated successfully!', 'success');
    } else {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
        setUsers(users.map(user => (user.id === updatedUser.id ? response.data : user)));
        setEditingUser(null);
        handleSnackbarOpen('User updated successfully!', 'success'); 
    } catch (error) {
        console.error("Error updating user:", error);
        handleSnackbarOpen('Failed to update user.', 'error');
    }
    }  
};

const handleDelete = async (userId) => {
  if (userId >= 10000) {
    // setDeleteModal(false)
    setUsers(users.filter(user => user.id !== userId));
    handleSnackbarOpen('User deleted successfully!', 'success')
  } else {
      try {
          await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
          setDeleteModal(false)
          setUsers(users.filter(user => user.id !== userId));
          handleSnackbarOpen('User deleted successfully!', 'success');
      } catch (error) {
          console.error("Error deleting user:", error);
          handleSnackbarOpen('Failed to delete user.', 'error');
      }
  }
  setDeleteModal(false);
  setUserToDelete(null)
};

  const filteredData = users.filter(item =>
    item.name?.toLowerCase().includes(searchName.toLowerCase()) &&
    item.email?.toLowerCase().includes(searchEmail.toLowerCase()) &&
    item.phone?.toLowerCase().includes(searchTel.toLowerCase())
  )

  const addUser = (newUser) => {
    const userWithId = { ...newUser, id: Date.now() };
    setUsers((prevUsers) => [...prevUsers, userWithId]);
    handleSnackbarOpen('User added successfully!', 'success');
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleOpenDeleteModal = (userId) => {
    setUserToDelete(userId);
    setDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
    setUserToDelete(null);
  }

  return (
    <div className='home-container'>
        <h2 className='head'>User Management Application</h2>
        <AddUser addUser={addUser}/>
        {
          loading ? (
            <Box sx={{ display: 'flex' }} className='spinner'>
            <CircularProgress />
          </Box>  
          ) : (
            <div className='table-responsive'> 
             <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th className='email-column'>Email</th>
                    <th className='phone-column'>Phone Numer</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> <input className='search-input' placeholder='Search Name' value={searchName} onChange={(e) => setSearchName(e.target.value)} /> </td>
                    <td className='search-input-email'> <input className='search-input' placeholder='Search Email' value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} /></td>
                    <td className='search-input-phone'> <input className='search-input' placeholder='Search Phone Number' value={searchTel} onChange={(e) => setSearchTel(e.target.value)} /></td>
                    <td></td>
                </tr>

            {
              filteredData.length > 0 ? (
                filteredData.map(user => (
                  <>
                    <tr key={user.id}>
                    <td>{user.name}</td>
                    <td className='email-column'>{user.email}</td>
                    <td className='phone-column'>{user.phone}</td>
                    <td>
                    <div>
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" id='view-btn' size="small" sx={{fontSize: '0.55rem', minWidth: '30px', backgroundColor: 'green', color: 'white' }} onClick={() => handleOpenModal(user)} >View</Button>
                      <Button variant="contained" size="small" sx={{fontSize: '0.55rem', minWidth: '25px', color: 'white' }} onClick={() => handleEdit(user)}>Edit</Button>
                      <Button variant="contained" size="small" sx={{fontSize: '0.55rem', minWidth: '25px', backgroundColor: 'red', color: 'white' }} onClick={()=>handleOpenDeleteModal(user.id)}>Delete</Button>
                    </Stack>
                    </div>  
                    </td>
                  </tr>
                  </>
                )
                )
              ) : (
                <tr>
                <td colSpan="4">No results found</td>
              </tr>
              )
            }
            </tbody>
            </table>  
            </div>
          )
        }


        {editingUser && <EditUser user={editingUser} onUpdateUser={handleUpdateUser} onClose={() => setEditingUser(null)} />}
        <UserDetails open={open} handleClose={handleCloseModal} user={selectedUser} />
        <DeleteUser deleteModal={deleteModal} handleCloseDeleteModal={handleCloseDeleteModal} handleDelete={handleDelete} userid={userToDelete} />

        <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <AlertSnackbar onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </AlertSnackbar>
      </Snackbar>
    </div>
  )
}

export default Home