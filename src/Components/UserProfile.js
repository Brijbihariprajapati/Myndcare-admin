import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:7000/api/auth/userdatabyid/${id}`);
        setUserData(response.data);
        setImageSrc(`http://localhost:7000/public/image/${response.data.image}`);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data.');
        console.error('Error fetching profile data', err);
        setLoading(false);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          toast("Session expired or invalid token.");
          navigate('/');
        }
      }
    };

    fetchProfileData();
  }, [id, navigate]);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4" >
      <Card>
        <Card.Img
          variant="top"
          src={imageSrc || 'default-image-url.jpg'}
          alt="Profile Image"
          style={{ height: '200px', width: '200px', borderRadius: '50%', objectFit: 'cover', margin: '20px auto', cursor: 'pointer' }}
          onClick={handleImageClick}
        />
        <Card.Body style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
          <Card.Title>{userData.name}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {userData.email} <br />
            <strong>Status:</strong> {userData.status === 0 ? 'Active' : 'Deactive'} <br />
            <a style={{color:'blue',cursor:'pointer'}} onClick={()=>navigate(-1)}>Back</a>
          </Card.Text>
          {/* Add more user details or buttons here if needed */}
        </Card.Body>
      </Card>

      {/* Modal for Viewing Image */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={imageSrc || 'default-image-url.jpg'}
            alt="Profile Image"
            style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
