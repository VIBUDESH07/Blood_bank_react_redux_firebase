import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/home" element={
          <ProtectedRoute 
            element={Layout} 
            public={true} 
          />} 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/data" element={
          <ProtectedRoute 
            element={Data} 
            public={true} 
          />} 
        />
        <Route path="/add-data" element={
          <ProtectedRoute 
            element={AddData} 
            requiredType="blood bank"
            isAdmin={true} 
          />} 
        />
        <Route path="/bb-dash" element={<Bbdash/>}
        />
         <Route path="/add-hospital" element={
          <ProtectedRoute 
            element={AddHospital} 
            requiredType="blood bank"
            isAdmin={true} 
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
