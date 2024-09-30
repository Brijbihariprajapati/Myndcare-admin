import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewMessage = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { message } = location.state; 
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'))

  const checkAuth = async () => {
    try {
        const data = await axios.get('http://localhost:7000/api/auth/replyauth',{headers:{'Authorization': `Bearer ${token}`}})
        console.log(data);
        
    } catch (error) {
        localStorage.removeItem('token')
        toast('Session Expired')
        navigate('/')
        
    }
  }

  useEffect(()=>{
    checkAuth()
  },[])

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:7000/api/auth/reply', {
        email: message.email,
        reply,
        Name: message.name
      });

      if (response.status === 200) {
        setSuccess('Reply sent successfully!');
        setReply('')
      }
    } catch (err) {
      setError('Failed to send reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card className="mt-4">
        <Card.Header as="h5">Message Details</Card.Header>
        <Card.Body>
          <p><strong>Name:</strong> {message.name}</p>
          <p><strong>Email:</strong> {message.email}</p>
          <p><strong>Message:</strong> {message.message}</p>
          <p><strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}</p>
          
          {/* Reply Form */}
          <Form onSubmit={handleReplySubmit}>
            <Form.Group controlId="replyMessage">
              <Form.Label>Reply</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
              />
            </Form.Group>
            <Button className='mt-2'variant="primary" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reply'}
            </Button>
          </Form>

          {/* Display success or error messages */}
          {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewMessage;
