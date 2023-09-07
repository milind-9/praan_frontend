import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
export default function EditUser() {
  const storedToken = sessionStorage.getItem('authToken')
  const headers = {
    Authorization: storedToken,
  };
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
      h: '',
      w: '',
      p1: '',
      p10:'',
      p25: '',
      // Other fields you want to edit
    });
  
    useEffect(() => { const getUser = axios.get(`https://praan-task-x116.onrender.com/api/devices/${id}`,{headers})
    .then((data)=>{
      console.log(data.data)
      setUser(data.data.device);
      setFormData({
        h: data.data.device.h,
        w: data.data.device.w,
        p1: data.data.device.p1,
        p10: data.data.device.p10,
        p25: data.data.device.p25,

        // Set other form fields based on the fetched data
      });
    })
    .catch((err)=>{
        console.log(err)
    })},[id])

    const handleInputChange = event => {
      const { name, value } = event.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = event => {
      event.preventDefault();
  
      const confirmed = window.confirm('Are you sure you want to update the device details?');

  if (confirmed) {
    // Make API call to update user details
    axios.patch(`https://praan-task-x116.onrender.com/api/devices/${id}`, formData,{headers})
      .then(response => {
        // Handle success, e.g., show a success message
        navigate('/dashboard', { state: { userEdited: true } });
      })
      .catch(error => {
        console.error('Error updating user details:', error);
        // Handle error, e.g., show an error message
      });
  }
    };
   
  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      maxWidth: '400px', // Set the maximum width of the form
      margin: '0 auto', // Center the form horizontally
    }}>
      <div className="mb-3" style={{ width: '100%', textAlign: 'left' }}>
        <label htmlFor="exampleInputEmail1" className="form-label">
        h
        </label>
        <input
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="h"
          value={formData.h}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3" style={{ width: '100%', textAlign: 'left' }}>
        <label htmlFor="exampleInputPassword1" className="form-label">
        w
        </label>
        <input
        
          className="form-control"
          id="exampleInputPassword1"
          name="w"
          value={formData.w}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3" style={{ width: '100%', textAlign: 'left' }}>
        <label htmlFor="exampleInputPassword1" className="form-label">
        p1
        </label>
        <input
        
          className="form-control"
          id="exampleInputPassword1"
          name="p1"
          value={formData.p1}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3" style={{ width: '100%', textAlign: 'left' }}>
        <label htmlFor="exampleInputPassword1" className="form-label">
        p10
        </label>
        <input
        
          className="form-control"
          id="exampleInputPassword1"
          name="p10"
          value={formData.p10}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3" style={{ width: '100%', textAlign: 'left' }}>
        <label htmlFor="exampleInputPassword1" className="form-label">
        p25
        </label>
        <input
         
          className="form-control"
          id="exampleInputPassword1"
          name="p25"
          value={formData.p25}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}
