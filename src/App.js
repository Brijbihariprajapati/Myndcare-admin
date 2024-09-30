import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navbaar from "./Components/Navbaar";
import Login from "./Components/Login";

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = async () => {
    const token = await localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (!token) {
      navigate('/');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleLoginSuccess = () => {
    checkToken();  
  };

  return (
    <div>
      <Routes>
        {isLoggedIn ? (
          <Route path="/*" element={<Navbaar onlogout={handleLoginSuccess} />} />
        ) : (
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        )}
      </Routes>
    </div>
  );
};
const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default Root;
