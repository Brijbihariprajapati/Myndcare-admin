import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from 'sweetalert';


function UserManagement() {
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.get("http://localhost:7000/api/auth/usermanagement", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
    } catch (err) {
      toast("Session expired or invalid token.");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  // Function to fetch user data
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/auth/userdata"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
     toast("Failed to fetch data.");
      console.log("Failed to get data", error);
      setLoading(false);
    }
  };

  // Function to toggle user status
  const toggleStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;
      await axios.put(`http://localhost:7000/api/auth/userstatus/${userId}`, {
        status: newStatus,
      });

      setData((prevData) =>
        prevData.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
      console.log("Status updated successfully");
    } catch (error) {
      toast("Failed to update status.");
      console.log("Failed to update status", error);
    }
  };

  // Function to delete a user
  const handleDelete = async (userId) => {
    // Show confirmation dialog before deletion
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Account file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:7000/api/auth/userdelete/${userId}`);
          
          setData((prevData) => prevData.filter((user) => user._id !== userId));
  
          swal("Success! The user account has been deleted.", {
            icon: "success",
          });
        } catch (error) {
          toast("Failed to delete user.");
          console.log("Failed to delete user", error);
  
          swal("Error! Could not delete the account.", {
            icon: "error",
          });
        }
      } else {
        swal("Your Account is safe!");
      }
    });
  };
  useEffect(() => {
    checkAuth();
    getData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Management</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user._id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{user.name}</td>
              <td className="text-center">{user.email}</td>
              <td className="text-center">
                <p
                  style={{
                    color: user.status === 0 ? 'blue' : 'red',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleStatus(user._id, user.status)}
                >
                  {user.status === 0 ? "Active" : "Deactive"}
                </p>
              </td>
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  variant="info"
                  className="mr-2"
                  style={{ width: '75px' }}
                  onClick={() => navigate(`profile/${user._id}`)}
                >
                  View
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserManagement;
