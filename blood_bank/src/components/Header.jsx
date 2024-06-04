import React, { useState, useEffect } from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navihate=useNavigate();
  useEffect(() => {
    const loginStatus = localStorage.getItem('login');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem('login', 'false');
    setIsLoggedIn(false);
    navihate('/');
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
          <li><Link to="/hospitals">Connected_Hospitals</Link></li>
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
