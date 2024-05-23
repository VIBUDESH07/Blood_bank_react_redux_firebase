import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Layout from './components/Layout';
import Login from './components/Login';


function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login/>}/>
          </Routes>
      
    </>
  );
}

export default App;
