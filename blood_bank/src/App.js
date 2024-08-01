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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/home" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/data" element={<Data />} />
        <Route path="/add-data" element={
          <ProtectedRoute 
            element={AddData} 
            requiredType="blood_bank" // Only blood bank users can access AddData
          />} 
        />
        <Route path="/bb-dash" element={
          <ProtectedRoute 
            element={Bbdash} 
            requiredType="blood_bank" // Only blood bank users can access Bbdash
          />} 
        />
        <Route path="/hos-data" element={
          <ProtectedRoute 
            element={FetchData} 
            requiredType="hospital" // Only hospital users can access FetchData
          />} 
        />
      </Routes>
    </>
  );
}

export default App;
