import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';

function AddUser({addUser}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      resetForm(); // Reset form and errors when closing
     }

    const[fname, setFname] = useState('')
    const[email, setEmail] = useState('')
    const[tel, setTel] = useState('')
    const[username, setUsername] = useState('')
    const[address, setAddress] = useState('')
    const[cname, setCname] = useState('')
    const[website, setWebsite] = useState('')

    const [errors, setErrors] = useState({})

    useEffect(() => {
      setUsername(`USER-${fname}`);
    }, [fname]);
  
    const resetForm = () => {
      setFname('');
      setEmail('');
      setTel('');
      setUsername('');
      setAddress('');
      setCname('');
      setWebsite('');
      setErrors({});
  };

    const validate = () => {
      let formErrors = {};

      // Name validation
      if (!fname || fname.length < 3) {
          formErrors.fname = "Name must be at least 3 characters.";
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
          formErrors.email = "Please enter a valid email.";
      }

      // Phone validation (10-digit validation)
      const phoneRegex = /^[0-9]{10}$/;
      if (!tel || !phoneRegex.test(tel)) {
          formErrors.tel = "Please enter a valid 10-digit phone number.";
      }

      // Address validation
      if (!address) {
          formErrors.address = "Address (Street, City) is required.";
      }

      // Company validation (optional)
      if (cname && cname.length < 3) {
          formErrors.cname = "Company name must be at least 3 characters if provided.";
      }

      if (website && website.trim().length > 0) {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
        if (!urlRegex.test(website)) {
            formErrors.website = "Please enter a valid URL.";
        }
    }

      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
          return; // Stop the form submission if validation fails
      }
        
        const newUser = {
          id: Date.now(),
          name: fname,
          email,
          phone: tel,
          username,
          address,
          company: { name: cname },
          website,
        };

        try {
          // Perform POST request
          const response = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
          addUser(response.data);
          handleClose()
      } catch (error) {
          console.error("Error creating user:", error);
      }
    
        setFname('');
        setEmail('');
        setTel('');
        setUsername('')
        setAddress('');
        setCname('')
        setWebsite('')
      };

  return (
    <div>
         <Button variant="contained" onClick={handleOpen}>Create New User</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modal'
      >
        <Box className='add-user-container'>
        <span onClick={handleClose} class="material-symbols-outlined" id='close'>close</span>
            <h2 className='add-edit-user'>Add a new user</h2>
        <form onSubmit={handleSubmit} className='add-service-form'>
        <div className='form-input'>
        <label for="serviceName">Name <span style={{ color: 'red' }}>*</span></label>
        <input
          type="text"
          placeholder="Enter Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          id="serviceName"
          className='input-styling'
        />
        {errors.fname && <span className="error">{errors.fname}</span>}
        </div>
         
         <div className='form-input'>
         <label for="serviceDescription">Email <span style={{ color: 'red' }}>*</span></label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id='serviceDescription'
          className='input-styling'
        />
        {errors.email && <span className="error">{errors.email}</span>}
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
        {errors.tel && <span className="error">{errors.tel}</span>}
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
        {errors.address && <span className="error">{errors.address}</span>}
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
        {errors.cname && <span className="error">{errors.cname}</span>}
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
        {errors.website && <span className="error">{errors.website}</span>}

       </div>

        <button className='btn' type="submit">Add User</button>
      </form>
        </Box>
      </Modal>
    </div>
  )
}

export default AddUser