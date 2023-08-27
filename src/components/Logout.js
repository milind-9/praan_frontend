import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Logout() {
    const navigate = useNavigate();
    useEffect(()=>{
      axios.get('http://localhost:4000/api/v1/logout')
    .then(response => {
      // console.log(response.data)
    if(response.data.success == false){
      toast.error(response.data.message);
    }
    else{
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      console.log(localStorage)
      navigate('/login');
      toast.success('Logout');
    }
    })
    .catch(error => { console.log(error)});
    },[])
    
  return (
    <div>Logout</div>
  )
}
