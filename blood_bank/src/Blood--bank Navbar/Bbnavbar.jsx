import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import '../Blood--bank Navbar/Bbdash.css';

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
    // Clear all relevant session data
    localStorage.removeItem('login');
    localStorage.removeItem('userType'); // Assuming isAdmin was also stored

    // Update state and navigate to the login page
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bbdash-container">
      <div className="logo" onClick={toggleSidebar}>
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
          <button onClick={handleLogout} className='log-out-btn'>
            Logout
          </button>
        ) : (
          <Link to="/login" className='btn'>
            Login
          </Link>
        )}
      </div>
      {isSidebarOpen && <Sidebar />} 
    </div>
  );
};

export default Bbnavbar;
