import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      const data = { email, password };

      const response = await axios.post('http://localhost:7000/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { token } = response.data;
      console.log('Login successful!', token);
      toast('Login successful!');

      localStorage.setItem('token', token);

      // Notify the parent component (App) that login is successful
      onLoginSuccess();

      // navigate('/');  // Navigate to the home page after login
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  {error && !email && (
                    <small className="text-danger">Email is required.</small>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  {error && !password && (
                    <small className="text-danger">Password is required.</small>
                  )}
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
               <div style={{display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'space-around'}}>
               <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
               <a href='#' type="submit" >
                  Change Password
                </a>
               </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
