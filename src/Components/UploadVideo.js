import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import './UploadVideo.css'; // Custom CSS file

function UploadVideo() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [scores, setScores] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [token, settoken] = useState(localStorage.getItem('token'))
  const checkauth = async ()=>{
    try {
      const data = await axios.get('http://localhost:7000/api/auth/uploadvideoauth',{headers:{Authorization: `Bearer ${token}`}})
      console.log(data);
      
    } catch (error) {
      toast('sesion expired or envalid token')
      localStorage.removeItem('token')

      navigate('/')
      
    }
  }
useEffect(()=>{
  checkauth()
},[token])
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleScoresChange = (e) => {
    setScores(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !title || !scores) {
      setUploadStatus('Please fill in all fields.');
      return;
    }

    const formData = { video: selectedFile, title, scores };

    setIsLoading(true);
    try {
      await axios.post('http://localhost:7000/api/auth/video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      toast.success('Video uploaded successfully!');
      navigate('/video');
    } catch (error) {
      toast.error('Failed to upload video.');
      console.error('Error uploading video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-video-container">
      <div className="upload-form">
        <h4 className="form-title">Upload a New Video</h4>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter video title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="scores">Scores</label>
          <input
            type="text"
            className="form-control"
            id="scores"
            placeholder="Enter scores (comma-separated)"
            value={scores}
            onChange={handleScoresChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="video">Upload Video</label>
          <input
            type="file"
            className="form-control-file"
            id="video"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>

       <div>
       <button
          className="btn btn-primary mt-3 upload-btn"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload Video'}
        </button>
        <button onClick={()=>navigate(-1)} className="btn btn-danger mt-3 upload-btn"> Back</button>

       </div>
        {uploadStatus && <p className="status-message mt-2">{uploadStatus}</p>}
      </div>
    </div>
  );
}

export default UploadVideo;
