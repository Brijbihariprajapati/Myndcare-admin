import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateVideo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, settoken] = useState(localStorage.getItem('token'))
  const checkauth = async()=>{
try {
 const data = await axios.get(`http://localhost:7000/api/auth/updatevideoauth`,{headers:{Authorization: `Bearer ${token}`}})
 console.log(data);
 

} catch (error) {
  toast("Session expired or invalid token.");
  localStorage.removeItem('token')
  navigate('/')

}  }

useEffect(()=>{
  checkauth()
},[token])
  const { video } = location.state || {};
  
  const [title, setTitle] = useState('');
  const [scores, setScores] = useState('');
  const [status, setStatus] = useState(0); 

  useEffect(() => {
    if (video) {
      setTitle(video.title || '');
      setScores(video.scores || '');
      setStatus(video.status || 0);
    }
  }, [video]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const updatedVideo = {
        title,
        scores,
        status,
      };
      
     const res= await axios.put(`http://localhost:7000/api/auth/updatevideo/${video._id}`, updatedVideo);
      toast(res.data.msg);
      navigate('/video')
    } catch (error) {
      console.error('Error updating video:', error);
      toast('Failed to update video');
    }
  };

  return (
    <div className="container mt-3">
      <h2>Update Video</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label>Scores</label>
          <input
            type="text"
            className="form-control"
            value={scores}
            onChange={(e) => setScores(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option value={0}>Active</option>
            <option value={1}>Deactive</option>
          </select>
        </div>

       <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
       <button type="submit" className="btn btn-primary mt-3">
          Update Video
        </button>
        <button onClick={()=>navigate(-1)} className="btn btn-danger mt-3" style={{width:'120px'}}>
          Back
        </button>
       </div>
      </form>
    </div>
  );
};

export default UpdateVideo;
