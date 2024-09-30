import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'
import { toast } from 'react-toastify';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  const [activeUser, setactiveUser] = useState([])
  const [deactiveUser, setDeactiveUser] = useState([])
  const [message, setMessages] = useState([])
  const navigate = useNavigate();


  const checkAuth = async () => {
    const token = localStorage.getItem('token');
        try {
     
     const data= await axios.get('http://localhost:7000/api/auth/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(data);
      
      setLoading(false); 
    } catch (error) {
            localStorage.removeItem('token');
      // toast.error('You are not authorized or session expired!');
      window.location.reload()
            navigate('/');
           
    }
  };

  const Users = () =>{
    axios.get('http://localhost:7000/api/auth/activeuser').then((response)=>setactiveUser(response.data)).catch((error)=>console.error('failed to fetch active user',error))
    axios.get('http://localhost:7000/api/auth/deactivateuser').then((response)=>setDeactiveUser(response.data)).catch((error)=>console.error('failed to fetch deactive users',error))
    axios.get('http://localhost:7000/api/auth/findcontactus').then((response)=>setMessages(response.data)).catch((error)=>console.error('failed to get message'))
  }
  
  useEffect(() => {
    Users()
    checkAuth();
  }, [navigate]);
console.log('message',message);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <div className="user-status-boxes">
    <div className="box active-users" onClick={()=>navigate('/usermanagement')}>
        <h3>Active Users</h3>
        {activeUser.length > 0 ? (
            <ul>
               
                    <li >{activeUser.length}</li>
                
            </ul>
        ) : (
            <p>No active users</p>
        )}
    </div>

    <div className="box deactivated-users"onClick={()=>navigate('/usermanagement')}>
        <h3>Deactivated Users</h3>
        {deactiveUser.length > 0 ? (
            <ul>
                 <li>{deactiveUser.length}</li>
            </ul>
        ) : (
            <p>No deactivated users</p>
        )}
    </div>
</div>
<div className="user-status-boxes mt-3" >
<div className="box contactUs-users"onClick={()=>navigate('/contactusadmin')}>
        <h3>Contact Messages</h3>
        {message.length > 0 ? (
            <ul>
                 <li>{message.length}</li>
            </ul>
        ) : (
            <p>No Messages</p>
        )}
    </div>
</div>

    </div>
  );
}

export default Dashboard;
