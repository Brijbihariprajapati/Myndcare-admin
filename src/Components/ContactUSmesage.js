import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ContactUSmesage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [token, settoken] = useState(localStorage.getItem("token"));

  const checkAuth = async () => {
    if (!token) {
      navigate("/");
    }
    try {
      const data = await axios.get("http://localhost:7000/api/auth/contactus", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
    } catch (error) {
      localStorage.removeItem("token");
      toast.error("You are not authorized or session expired!");
      navigate("/");
    }
  };

  // useEffect(()=>{

  // },[token])
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/auth/findcontactus"
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
    checkAuth();
  }, []);

  return (
    <div className="container mt-4">
      <h2>User Contact Messages</h2>
      {messages.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={msg._id}>
                <td>{index + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td style={{ fontWeight: 600, color: 'green', cursor: 'pointer' }}
                 onClick={() => navigate('/viewmessage', { state: { message: msg } })}>
                  View Message
                </td>

                <td>{new Date(msg.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No messages to display.</p>
      )}
    </div>
  );
};

export default ContactUSmesage;
