// import { useState, useEffect } from "react";

// // Custom hook to check if the user is authenticated
// const useAuth = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const checkToken = async () => {
//     const token = await localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   };

//   useEffect(() => {
//     checkToken();
//   }, []);

//   // Return both the login state and the function to re-check the token
//   return { isLoggedIn, checkToken };
// };

// export default useAuth;
// // 