import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Data from './components/Data';
import AddData from './components/AddData';
import FetchData from './components/FetchData';
import Bbdash from './components/Bbdash';
import ProtectedRoute from './components/ProtectedRoute'; // Import the new ProtectedRoute component
import AddHospital from './components/AddHospital';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/home" element={
          <ProtectedRoute 
            element={Layout} 
            public={true} // Allow access without login
          />} 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/data" element={
          <ProtectedRoute 
            element={Data} 
            public={true} // Allow access without login
          />} 
        />
        <Route path="/add-data" element={
          <ProtectedRoute 
            element={AddData} 
            requiredType="blood_bank"
            isAdmin={true} // Only blood bank admins can access AddData
          />} 
        />
        <Route path="/bb-dash" element={
          <ProtectedRoute 
            element={Bbdash} 
            requiredType="blood_bank"
            isAdmin={true} // Only blood bank admins can access Bbdash
          />} 
        />
         <Route path="/add-hospital" element={
          <ProtectedRoute 
            element={AddHospital} 
            requiredType="blood_bank"
            isAdmin={true} // Only blood bank admins can access Bbdash
          />} 
        />
        <Route path="/hos-data" element={
          <ProtectedRoute 
            element={FetchData} 
            requiredType="hospital" // Only hospital users can access FetchData
          />} 
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
