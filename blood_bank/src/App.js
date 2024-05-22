import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Layout from './components/Layout';


function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Layout />} />
          </Routes>
      
    </>
  );
}

export default App;
