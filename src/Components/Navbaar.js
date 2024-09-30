import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import "../App.css";
import { NavLink , Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserManagement from "./UserManagement";
import Setting from "./Setting";
import UserProfile from "./UserProfile";
import CreateQuestion from "./CreateQuestion";
import AdminQuestion from "./AdminQuestion";
import ContactUSmesage from "./ContactUSmesage";
import ViewMessage from "./ViewMessage";
import EditQuestion from "./EditQuestion";
import VideoManager from "./VideoManager";
import VideoPlayer from "./VideoPlayer";
import UploadVideo from "./UploadVideo";
import UpdateVideo from "./UpdateVideo";

const Navbaar = ({onlogout}) => {
 const Token = localStorage
  .getItem('token')
  const handlelogin = ()=>{
    localStorage.removeItem('token')
    onlogout()
  }
  console.log('token',Token);
  

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
          <Nav >
  

  <NavLink
    // to={!Token ? '/login' : '/home'}  
    onClick={() => handlelogin()}     
    style={({ isActive }) => ({
      textDecoration: 'none',
      padding: '10px 0',
      color: isActive ? '#007bff' : 'white',
    })}
  >
    {!Token ? 'Login' : 'Logout'}       {/* Conditionally render Login/Logout */}
  </NavLink>
</Nav>

        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={3} className="bg-light p-3">
      <h4>Navigation</h4>
      <Nav className="flex-column">
        <NavLink
          to=""
          style={({ isActive }) => ({
            textDecoration: 'none',
            padding: '10px 0',
            color: isActive ? '#007bff' : 'inherit',
          })}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/usermanagement"
          style={({ isActive }) => ({
            textDecoration: 'none',
            padding: '10px 0',
            color: isActive ? '#007bff' : 'inherit', 
          })}
        >
          User Management
        </NavLink>
        <NavLink
          to="/questions"
          style={({ isActive }) => ({
            textDecoration: 'none',
            padding: '10px 0',
            color: isActive ? '#007bff' : 'inherit', 
          })}
        >
          All Questions
        </NavLink>
        <NavLink
          to="/contactusadmin"
          style={({ isActive }) => ({
            textDecoration: 'none',
            padding: '10px 0',
            color: isActive ? '#007bff' : 'inherit', 
          })}
        >
          Contact US
        </NavLink>
        <NavLink
          to="/video"
          style={({ isActive }) => ({
            textDecoration: 'none',
            padding: '10px 0',
            color: isActive ? '#007bff' : 'inherit', 
          })}
        >
          VideoManager
        </NavLink>
        <NavLink
          to="/setting"
          style={({ isActive }) => ({
            textDecoration: 'none',
            padding: '10px 0',
            color: isActive ? '#007bff' : 'inherit', 
          })}
        >
          Settings
        </NavLink>
      </Nav>
    </Col>
  

          {/* Main Content */}
          <Col md={9} className="p-3">
            <Routes>
              {/* <Route path="/" element={<Login />} /> */}

              <Route path="" element={<Dashboard />} />
              <Route path="usermanagement" element={<UserManagement />} />
              <Route path="setting" element={<Setting />} />
              <Route path="usermanagement/profile/:id" element={<UserProfile />} />
              <Route path="createquestion" element={<CreateQuestion />} />
              <Route path="questions" element={<AdminQuestion/>}/>
              <Route path="contactusadmin" element={<ContactUSmesage/>}/>
              <Route path="viewmessage" element={<ViewMessage/>}/> 
              <Route path="editquestion" element={<EditQuestion/>}/> 
              <Route path="video" element={<VideoManager/>}/> 
              <Route path="videoplayer" element={<VideoPlayer/>}/> 
              <Route path="uploadvideo" element={<UploadVideo/>}/> 
              <Route path="updatevideo" element={<UpdateVideo/>}/>         
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbaar;
