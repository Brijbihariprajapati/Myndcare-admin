import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Setting() {
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  const navigate = useNavigate();


  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    try {
     
     const data= await axios.get('http://localhost:7000/api/auth/setting', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(data);
      
      setLoading(false); 
    } catch (err) {
      toast('Session expired or invalid token.');
      localStorage.removeItem('token'); 
      navigate('/'); 
    }
  };

  
  useEffect(() => {
    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

    return (
        <div>
          <h2>Settings</h2>
          <p>Adjust the platform settings here.</p>
          {/* {error && <div className="alert alert-danger">{error}</div>} */}

        </div>
      );
}

export default Setting