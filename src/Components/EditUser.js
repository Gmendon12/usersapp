import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

function EditUser({ user, onUpdateUser, onClose }) {
    const [fname, setFname] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [tel, setTel] = useState(user.phone);
    const[username, setUsername] = useState(user.username)
    const[address, setAddress] = useState(`${user.address.street}, ${user.address.city}`)
    const[cname, setCname] = useState(user.company.name)
    const[website, setWebsite] = useState(user.website)

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, name: fname, email, phone: tel };
        onUpdateUser(updatedUser);
    };

    return (
        <Modal open={true}>
            <Box className='add-user-container'>
            <span onClick={onClose} class="material-symbols-outlined" id='close'>close</span>
                <h2 className='add-edit-user'>Edit User</h2>
                <form onSubmit={handleSubmit} className='add-service-form'>

                <div className='form-input'>
                 <label for="Name">Name <span style={{ color: 'red' }}>*</span></label>
                   <input
                     type="text"
                     placeholder="Enter Name"
                     value={fname}
                     onChange={(e) => setFname(e.target.value)}
                     id="Name"
                     className='input-styling'
                     />
                    </div>

                    <div className='form-input'>
                   <label for="Email">Email <span style={{ color: 'red' }}>*</span></label>
                   <input
                     type="text"
                     placeholder="Enter Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     id="Email"
                     className='input-styling'
                     />
                    </div>

                    <div className='form-input'>
       <label for="price">Phone Number <span style={{ color: 'red' }}>*</span></label>
       <input
          type="text"
          placeholder="Enter Phone Number"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          id='price'
          className='input-styling'
        />
       </div>
      
       <div className='form-input'>
       <label for="price">Username <span style={{ color: 'red' }}>*</span></label>
       <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id='price'
          className='input-styling'
        />
       </div>

       <div className='form-input'>
       <label for="price">Address(Street,City) <span style={{ color: 'red' }}>*</span></label>
       <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id='price'
          className='input-styling'
        />
       </div>

       <div className='form-input'>
       <label for="price">Company Name</label>
       <input
          type="text"
          placeholder="Enter Company Name"
          value={cname}
          onChange={(e) => setCname(e.target.value)}
          id='price'
          className='input-styling'
        />
       </div>

       <div className='form-input'>
       <label for="price">Website</label>
       <input
          type="text"
          placeholder="Enter Website"
          value={website}
          onChange={(e) =>setWebsite(e.target.value)}
          id='price'
          className='input-styling'
        />
       </div>
                   
       <button className='btn' type="submit">Update User</button>
                </form>
            </Box>
        </Modal>
    );
}

export default EditUser;
