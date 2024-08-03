import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component

const Bbnavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem('login');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem('login', 'false');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      <div className="logo">
        <span>Home</span>
      </div>
      <div className="navbar">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/data">Data</Link></li>
          <li><Link to="/hospitals">Connected Hospitals</Link></li>
          <li><Link to="/add-data">Add Blood Group</Link></li>
          <li><Link to="/add-hospital">Add Hospital</Link></li>
        </ul>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className='log-out-btn'>
              Logout
            </button>
            <button onClick={toggleSidebar} className='sidebar-toggle-btn'>
              {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>
          </>
        ) : (
          <Link to="/login" className='btn'>
            Login
          </Link>
        )}
      </div>
      {isSidebarOpen && <Sidebar />} {/* Render Sidebar conditionally */}
    </div>
  );
};

export default Bbnavbar;
