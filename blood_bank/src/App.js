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


function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/data" element={<AddData/>}/>
          </Routes>
      
    </>
  );
}

export default App;
