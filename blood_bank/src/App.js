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


function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/home" element={<Layout />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/data" element={<Data/>}/>
        <Route path="/add-data" element={<AddData/>}/>
        <Route path="/bb-dash" element={<Bbdash/>}/>
        <Route path="/hos-data" element={<FetchData/>}/>
          </Routes>
      
    </>
  );
}

export default App;
