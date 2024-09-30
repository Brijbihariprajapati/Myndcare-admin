import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const VideoManager = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState([]);
  const [token, settoken] = useState(localStorage.getItem('token'))
  const checkauth = async ()=>{
    try {
      const data = await axios.get(`http://localhost:7000/api/auth/videomanagerauth`,{headers:{Authorization: `Bearer ${token}`}})
      console.log(data);
      
    } catch (error) {
      toast("Session expired or invalid token.");
      localStorage.removeItem('token')
      navigate('/')
    }
  }
useEffect(()=>{
  checkauth()
},[token])
  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/auth/findvideo"
      );
      setVideoUrl(response.data.response);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const handleView = (video) => {
    console.log("View video: ", video);
    navigate("/videoplayer", { state: { video } });
  };

  const handleEdit = (video) => {
    navigate('/updatevideo', { state: { video } });
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/auth/deletevideo/${id}`);
      fetchVideo();
      toast("Video Delete Succesfully");
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };
  const handleActive = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/api/auth/activedeactive/${id}`
      );
      fetchVideo();
      toast(response.data.msg);
    } catch (error) {
      console.error("Error updating status:", error);
      toast("Failed to change status");
    }
  };

  return (
    <div className="container mt-2">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Video Management</h2>
        <div
          style={{
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          {" "}
          <div style={{ marginTop: "5px" }}>Upload Video:</div>{" "}
          <FaCloudUploadAlt
            size={40}
            color="blue"
            onClick={() => navigate("/uploadvideo")}
            style={{ marginRight: "150px" }}
          />
        </div>
      </div>

      {videoUrl.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Scores</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videoUrl.map((v, index) => (
              <tr key={index}>
                <td style={{ width: "23.3%" }}>{v.title}</td>
                <td style={{ width: "23.3%" }}>{v.scores || "N/A"}</td>
                <td
                  onClick={() => handleActive(v._id)}
                  style={{
                    width: "23.3%",
                    cursor: "pointer",
                    color: v.status === 0 ? "green" : "red",
                  }}
                >
                  {v.status === 0 ? "Active" : "Deactive"}
                </td>
                <td
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <GrFormView
                    size={25}
                    color="green"
                    onClick={() => handleView(v)}
                  />
                  <BiEdit
                    size={25}
                    color="yellow"
                    onClick={() => handleEdit(v)}
                  />
                  <MdDeleteSweep
                    size={25}
                    color="red"
                    onClick={() => handleDelete(v._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default VideoManager;
