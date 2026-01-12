// import React,{useEffect} from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// function CheckAuth({children,protectedRoute}) {
//     const navigate = useNavigate()
//     const [loading,setLoading]=useState(true)

//     useEffect(()=>{
//        const token= localStorage.getItem("token")
//        if(protectedRoute){
//         if(!token){
//             navigate("/login")
//         }else{
//             setLoading(false);
//         }
//        }else{
//         if(token){
//             navigate("/")
//         }else{
//             setLoading(false)
//         }
//        }
//     },[navigate,protectedRoute])

//   if(loading){
//     return <div>loading...</div>
//   }
//   return children 
// }
// export default CheckAuth;

import { Navigate } from "react-router-dom";

function CheckAuth({ children, protectedRoute }) {
  const token = localStorage.getItem("token");

  const isAuthenticated =
    token && token !== "undefined" && token !== "null";

  // Protected route but NOT logged in
  if (protectedRoute && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Public route but logged in
  if (!protectedRoute && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default CheckAuth;

