import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    
    const credentials = {
      email: email,
      password: password,
    };

    // Perform the API request
    axios.post('https://praan-task.onrender.com/api/auth/login', credentials)
      .then(response => {
        console.log(response)
        if(response.data.status == true){
          toast.success('Logged in successfully');
          sessionStorage.setItem('authToken', response.data.token);
          navigate(`/dashboard`);

          
        }else{
          toast.error(`${response.data.message}`);
        }
        // Handle successful login response
        console.log(`${response.data.message}`);
      })
      .catch(error => {
        // Handle login error
        console.error('Login failed:');
      });
  };
  const handleSignup = () => {
    navigate('/signup'); // Redirect to the signup page
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      <div style={styles.inputContainer}>
        <label style={styles.inputLabel} htmlFor="email">
          email:
        </label>
        <input
          type="email"
          id="email"
          style={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.inputLabel} htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          style={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button style={styles.loginButton} onClick={handleLogin}>
        Login
      </button>
      <button style={styles.signupButton} onClick={handleSignup} >
        Signup
      </button>
      <h5>if not registered click on SignUp</h5>
      <ToastContainer />
    </div>
   
  );
};

const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  inputLabel: {
    display: 'block',
    fontWeight: 'bold',
  },
  inputField: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  loginButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  signupButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  loginButtonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Login;
