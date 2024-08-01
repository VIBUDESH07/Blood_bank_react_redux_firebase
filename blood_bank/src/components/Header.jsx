import React, { useState, useEffect } from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem('login');
    const userType = localStorage.getItem('userType'); // Assuming userType is saved in localStorage
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
      setUserType(userType || ''); // Default to empty if userType is not set
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem('login', 'false');
    localStorage.setItem('userType', ''); // Clear userType on logout
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleDataLinkClick = () => {
    
      if (userType === 'hospital') {
        navigate('/hos-data');
      } else {
        navigate('/data');
      }
    
  };

  return (
    <div className="container">
      <div className="logo">
        <span>Home</span>
      </div>
      <div className="navbar">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><a href="#" onClick={handleDataLinkClick} className="data-link-btn1" role="button" >Data</a></li>
          <li><Link to="/hospitals">Connected Hospitals</Link></li>
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
    </div>
  );
};

export default Header;
