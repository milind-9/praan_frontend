import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
function SignUp() {
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
        email: email,
        password: password,
      };
      setLoading(true);
      // Perform the signup API request
      axios.post('https://praan-task.onrender.com/api/auth/signup', newUser)
        .then(response => {
          setLoading(false);
          if (response.data.status === true) {
            console.log('Signup successful');
            // Redirect to the login page
            toast.success('Logged in successfully');
            navigate('/');
          } else {
            console.error('Signup failed:', response.data.message);
            toast.error(`${response.data.message}`);
          }
        })
        .catch(error => {
          setLoading(false);
            toast.error(`${error.message}`);
        });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <label style={styles.inputLabel} htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            style={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>
        <button style={styles.signupButton} type="submit">
        {loading ? <Loader /> : 'Sign up'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

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
  signupButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default SignUp;
