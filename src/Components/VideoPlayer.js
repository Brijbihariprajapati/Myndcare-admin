import React from 'react';
import { useLocation } from 'react-router-dom';

const VideoPlayer = () => {
  const { state } = useLocation();
  const { video } = state;

  return (
    <div className="container mt-5">
      <h2>{video.title}</h2>
      <video width="600" controls>
        <source src={`http://localhost:7000/public/video/${video.video}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
