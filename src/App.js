import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskManagement from "./Componets/TaskManagement";
import Register from "./Componets/Registration";
import Login from "./Componets/Login";
import ForgotPassword from "./Componets/Forgot";
import GoogleLogin from "./Componets/Google";
const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/taskmanagement" element={<TaskManagement />} />

      </Routes>
    </Router>
  );
};

export default App;
