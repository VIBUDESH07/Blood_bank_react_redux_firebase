import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Data from './components/Data';
import AddData from './components/AddData';
import FetchData from './components/FetchData';
import Bbdash from './components/Bbdash';
import ProtectedRoute from './components/ProtectedRoute';
import AddHospital from './components/AddHospital';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('login') === 'true';
    const storedUserType = localStorage.getItem('userType');
    console.log(storedUserType);
    setIsLoggedIn(loggedInStatus);
    setUserType(storedUserType);
  }, [location.pathname]); // Re-run the effect whenever the path changes

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
           isLoggedIn && userType === 'blood bank' 
           ? <Bbdash /> 
           : <Layout />
        } />
        <Route path="/home" element={
          isLoggedIn && userType === 'blood bank' 
            ? <Bbdash /> 
            : <Layout />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/data" element={
          <ProtectedRoute 
            element={Data} 
            publicRoute={true} // Publicly accessible, but user-specific data may show when logged in
          />} 
        />
        <Route path="/add-data" element={
          <ProtectedRoute 
            element={AddData} 
            requiredType="blood bank"
          />} 
        />
        <Route path="/bb-dash" element={
          <ProtectedRoute 
            element={Bbdash} 
            requiredType="blood bank"
          />} 
        />
        <Route path="/add-hospital" element={
          <ProtectedRoute 
            element={AddHospital} 
            requiredType="blood bank"
          />} 
        />
        <Route path="/hos-data" element={
          <ProtectedRoute 
            element={FetchData} 
            requiredType="hospital" 
          />} 
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
